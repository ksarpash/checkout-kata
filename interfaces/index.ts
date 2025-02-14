export interface Icheckout {
  scan(item: string): void;
  getTotalPrice(): number;
}

export interface Icart {
  addItem(sku: string): void;
  getItems(): Record<string, number>;
}

export interface IpricingService {
  calculateTotalPrice(cart: Icart): number;
}

export interface IspecialOffer {
  quantity: number;
  price: number;
}

export interface IspecialOffers extends Record<string, IspecialOffer> {}

export interface IunitPrices extends Record<string, number> {}
