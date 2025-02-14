import {
  ICart,
  IPricingService,
  ISpecialOfferPricingStragies,
  ISpecialOffers,
  IUnitPrices,
} from "./interfaces";

export class PricingService implements IPricingService {
  private prices: IUnitPrices;
  private specialOffers: ISpecialOffers;
  private specialOfferPricingStrategies: ISpecialOfferPricingStragies;

  constructor(
    prices: IUnitPrices,
    offers: ISpecialOffers,
    specialOfferPricingStrategies: ISpecialOfferPricingStragies
  ) {
    this.prices = prices;
    this.specialOffers = offers;
    this.specialOfferPricingStrategies = specialOfferPricingStrategies;
  }
  calculateTotalPrice(cart: ICart): number {
    let total = 0;
    const items = cart.getItems();
    for (const item in items) {
      const count = items[item];
      const unitPrice = this.prices[item] || 0;
      const offer = this.specialOffers[item];

      if (!offer) {
        total += this.calculateRegularTotalPrice(unitPrice, count);
      } else {
        total += this.calculateSpecialOfferTotalPrice(offer, count, unitPrice);
      }
    }
    return total;
  }

  private calculateRegularTotalPrice(unitPrice: number, count: number): number {
    return unitPrice * count;
  }

  private calculateSpecialOfferTotalPrice(
    offer: { offerType: string },
    count: number,
    unitPrice: number
  ): number {
    const specialOfferPricingStrategy =
      this.specialOfferPricingStrategies[offer.offerType];
    if (specialOfferPricingStrategy) {
      return specialOfferPricingStrategy.getPrice(count, unitPrice);
    } else {
      console.warn(
        `Unrecognized offer key: "${specialOfferPricingStrategy}". Defaulting to no offer.`
      );
      return this.calculateRegularTotalPrice(unitPrice, count);
    }
  }
}
