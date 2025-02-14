import {
  ICart,
  ICheckout,
  IPricingService,
  ISpecialOffers,
  IUnitPrices,
} from "./interfaces";

export class Checkout implements ICheckout {
  private cart: ICart;
  private pricingService: IPricingService;

  constructor(cart: ICart, pricingService: IPricingService) {
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
