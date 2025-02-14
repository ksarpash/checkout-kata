import { ISpecialOfferPricingStrategy } from "../interfaces";

class QuantityOfferStrategy implements ISpecialOfferPricingStrategy {
  constructor(private offerQty: number, private offerPrice: number) {}

  getPrice(quantity: number, unitPrice: number): number {
    const sets = Math.floor(quantity / this.offerQty);
    const remainder = quantity % this.offerQty;
    return sets * this.offerPrice + remainder * unitPrice;
  }
}

export const SpecialOfferPricingStrategies: Record<
  string,
  ISpecialOfferPricingStrategy
> = {
  multiBuy3: new QuantityOfferStrategy(3, 130),
  multiBuy2: new QuantityOfferStrategy(2, 45),
};
