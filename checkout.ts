interface ICheckout {
  scan(item: string): void;
  getTotalPrice(): number;
}

export class Checkout implements ICheckout {
  private prices: Record<string, number> = { A: 50, B: 30, C: 20, D: 15 };
  private cart: Record<string, number> = {};

  public scan(item: string): void {
    this.cart[item] = (this.cart[item] || 0) + 1;
  }

  getTotalPrice(): number {
    let total = 0;
    for (const item in this.cart) {
      const count = this.cart[item];
      const price = this.prices[item] || 0;
      total += count * price;
    }
    return total;
  }
}
