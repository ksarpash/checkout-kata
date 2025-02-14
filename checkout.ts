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
