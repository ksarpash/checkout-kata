import { ICart } from "./interfaces";

export class Cart implements ICart {
  private items: Record<string, number> = {};

  addItem(sku: string) {
    this.items[sku] = (this.items[sku] || 0) + 1;
  }

  getItems() {
    return { ...this.items };
  }
}
