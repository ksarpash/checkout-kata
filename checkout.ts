interface ICheckout {
  scan(item: string): void;
  getTotalPrice(): number;
}

interface SpecialOffer {
  quantity: number;
  price: number;
}

export class Checkout implements ICheckout {
  private prices: Record<string, number> = { A: 50, B: 30, C: 20, D: 15 };
  private offers: Record<string, SpecialOffer> = {
    A: { quantity: 3, price: 130 },
    B: { quantity: 2, price: 45 },
  };
  private cart: ICart;

  constructor(cart: ICart) {
    this.cart = cart;
  }

  public scan(item: string): void {
    this.cart.addItem(item);
  }

  public getTotalPrice(): number {
    let total = 0;
    const items = this.cart.getItems();
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
