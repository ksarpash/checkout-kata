import {
  ICart,
  IPricingService,
  ISpecialOffer,
  ISpecialOffers,
  IUnitPrices,
} from "./interfaces";

export interface PricingStrategy {
  getPrice(
    quantity: number,
    unitPrice: number,
    specialOffer: ISpecialOffer
  ): number;
}

const PricingStrategies: Record<string, PricingStrategy> = {
  multiBuy3: {
    getPrice: (
      quantity: number,
      unitPrice: number,
      specialOffer: ISpecialOffer
    ): number => {
      let total = 0;
      const sets = Math.floor(quantity / specialOffer.quantity);
      const remainder = quantity % specialOffer.quantity;
      return (total += sets * specialOffer.price + remainder * unitPrice);
    },
  },
};

export class PricingService implements IPricingService {
  private prices: IUnitPrices;
  private offers: ISpecialOffers;

  constructor(prices: IUnitPrices, offers: ISpecialOffers) {
    this.prices = prices;
    this.offers = offers;
  }
  calculateTotalPrice(cart: ICart): number {
    let total = 0;
    const items = cart.getItems();
    for (const item in items) {
      const count = items[item];
      const unitPrice = this.prices[item] || 0;
      const offer = this.offers[item];
      if (offer) {
        total += PricingStrategies[offer.offerType].getPrice(
          count,
          unitPrice,
          offer
        );
      } else {
        total += unitPrice * count;
      }
    }
    return total;
  }
}
