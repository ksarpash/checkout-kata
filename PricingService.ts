import {
  ICart,
  IPricingService,
  ISpecialOffers,
  IUnitPrices,
} from "./interfaces";

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
        const sets = Math.floor(count / offer.quantity);
        const remainder = count % offer.quantity;
        total += sets * offer.price + remainder * unitPrice;
      } else {
        total += unitPrice * count;
      }
    }
    return total;
  }
}
