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
    return Object.entries(cart.getItems()).reduce((total, [sku, count]) => {
      const unitPrice = this.prices[sku] || 0;
      const offer = this.specialOffers[sku];
      const specialOfferPricingStrategy =
        offer && this.specialOfferPricingStrategies[offer.offerType];

      if (!specialOfferPricingStrategy && offer) {
        console.warn(
          `Unrecognized offer key: "${offer.offerType}". Defaulting to no offer.`
        );
      }

      const skuTotal = specialOfferPricingStrategy
        ? specialOfferPricingStrategy.getPrice(count, unitPrice, offer)
        : unitPrice * count;

      return total + skuTotal;
    }, 0);
  }
}
