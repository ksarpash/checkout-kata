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
      if (offer) {
        const specialOfferPricingStrategy =
          this.specialOfferPricingStrategies[offer.offerType];
        if (specialOfferPricingStrategy) {
          total += specialOfferPricingStrategy.getPrice(count, unitPrice);
        } else {
          console.warn(
            `Unrecognized offer key: "${specialOfferPricingStrategy}". Defaulting to no offer.`
          );
          total += unitPrice * count;
        }
      } else {
        total += unitPrice * count;
      }
    }
    return total;
  }
}
