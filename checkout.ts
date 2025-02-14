import {
  Icart,
  Icheckout,
  IpricingService,
  IspecialOffers,
  IunitPrices,
} from "./interfaces";

export class Checkout implements Icheckout {
  private cart: Icart;
  private pricingService: IpricingService;

  constructor(cart: Icart, pricingService: IpricingService) {
    this.cart = cart;
    this.pricingService = pricingService;
  }

  public scan(item: string): void {
    this.cart.addItem(item);
  }

  public getTotalPrice(): number {
    return this.pricingService.calculateTotalPrice(this.cart);
  }
}

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

export class cart implements Icart {
  private items: Record<string, number> = {};

  addItem(sku: string) {
    this.items[sku] = (this.items[sku] || 0) + 1;
  }

  getItems() {
    return { ...this.items };
  }
}
