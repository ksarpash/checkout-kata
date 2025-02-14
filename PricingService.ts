import {
  ICart,
  IPricingService,
  ISpecialOfferPricingStragies,
  ISpecialOffers,
  IUnitPrices,
} from "./interfaces";
import { PricingStrategies } from "./specialOfferPricingStrategies";

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
        total += this.specialOfferPricingStrategies[offer.offerType].getPrice(
          count,
          unitPrice
        );
      } else {
        total += unitPrice * count;
      }
    }
    return total;
  }
}
