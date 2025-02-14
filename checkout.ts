interface ICheckout {
  scan(item: string): void;
  getTotalPrice(): number;
}

export class Checkout implements ICheckout {
  scan(item: string): void {
    throw new Error("Method not implemented.");
  }

  getTotalPrice(): number {
    return 0;
  }
}
