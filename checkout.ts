interface ICheckout {
  scan(item: string): void;
  getTotalPrice(): number;
}

interface SpecialOffer {
  quantity: number;
  price: number;
}

export interface SpecialOffers extends Record<string, SpecialOffer> {}

export interface UnitPrices extends Record<string, number> {}

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

interface IPricingService {
  calculateTotalPrice(cart: ICart): number;
}

export class PricingService implements IPricingService {
  private prices: UnitPrices;
  private offers: SpecialOffers;

  constructor(prices: UnitPrices, offers: SpecialOffers) {
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
interface ICart {
  addItem(sku: string): void;
  getItems(): Record<string, number>;
}

export class cart implements ICart {
  private items: Record<string, number> = {};

  addItem(sku: string) {
    this.items[sku] = (this.items[sku] || 0) + 1;
  }

  getItems() {
    return { ...this.items };
  }
}
