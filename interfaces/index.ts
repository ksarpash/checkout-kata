export interface ICheckout {
  scan(item: string): void;
  getTotalPrice(): number;
}

export interface ICart {
  addItem(sku: string): void;
  getItems(): Record<string, number>;
}

export interface IPricingService {
  calculateTotalPrice(cart: ICart): number;
}

export interface ISpecialOffer {
  offerType: string;
}

export interface ISpecialOfferPricingStrategy {
  getPrice(quantity: number, unitPrice: number): number;
}

export interface ISpecialOfferPricingStragies
  extends Record<string, ISpecialOfferPricingStrategy> {}

export interface ISpecialOffers extends Record<string, ISpecialOffer> {}

export interface IUnitPrices extends Record<string, number> {}
