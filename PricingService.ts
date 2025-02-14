import {
  Icart,
  IpricingService,
  IspecialOffers,
  IunitPrices,
} from "./interfaces";

export class PricingService implements IpricingService {
  private prices: IunitPrices;
  private offers: IspecialOffers;

  constructor(prices: IunitPrices, offers: IspecialOffers) {
    this.prices = prices;
    this.offers = offers;
  }
  calculateTotalPrice(cart: Icart): number {
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
