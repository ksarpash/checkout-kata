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
  private cart: Record<string, number> = {};

  public scan(item: string): void {
    this.cart[item] = (this.cart[item] || 0) + 1;
  }

  public getTotalPrice(): number {
    let total = 0;
    for (const item in this.cart) {
      const count = this.cart[item];
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
