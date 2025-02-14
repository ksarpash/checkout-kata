import {
  ICart,
  IPricingService,
  ISpecialOffer,
  ISpecialOffers,
  IUnitPrices,
} from "./interfaces";

export interface PricingStrategy {
  getPrice(quantity: number, unitPrice: number): number;
}

export class QuantityOfferStrategy implements PricingStrategy {
  constructor(private offerQty: number, private offerPrice: number) {}

  getPrice(quantity: number, unitPrice: number): number {
    const sets = Math.floor(quantity / this.offerQty);
    const remainder = quantity % this.offerQty;
    return sets * this.offerPrice + remainder * unitPrice;
  }
}

const PricingStrategies: Record<string, PricingStrategy> = {
  multiBuy3: new QuantityOfferStrategy(3, 130),
  multiBuy2: new QuantityOfferStrategy(2, 45),
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
        total += PricingStrategies[offer.offerType].getPrice(count, unitPrice);
      } else {
        total += unitPrice * count;
      }
    }
    return total;
  }
}
