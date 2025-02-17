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

export type IMultibuySpecialOffer = {
  offerType: "multiBuy";
  quantity: number;
  price: number;
};

export type IPercentageDiscountSpecialOffer = {
  offerType: "percentageDiscount";
  discountPercent: number;
};

export type INonExistantSpecialOffer = {
  offerType: string;
};

export type ISpecialOffer =
  | IMultibuySpecialOffer
  | IPercentageDiscountSpecialOffer
  | INonExistantSpecialOffer;

export interface ISpecialOfferPricingStrategy {
  getPrice(
    quantity: number,
    unitPrice: number,
    specialOffer: ISpecialOffer
  ): number;
}

export interface ISpecialOfferPricingStragies
  extends Record<string, ISpecialOfferPricingStrategy> {}

export type ISpecialOffers = Record<string, ISpecialOffer>;

export interface IUnitPrices extends Record<string, number> {}
