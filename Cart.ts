import { Icart } from "./interfaces";

export class Cart implements Icart {
  private items: Record<string, number> = {};

  addItem(sku: string) {
    this.items[sku] = (this.items[sku] || 0) + 1;
  }

  getItems() {
    return { ...this.items };
  }
}
