import { ISpecialOfferPricingStrategy } from "../interfaces";

class QuantityOfferStrategy implements ISpecialOfferPricingStrategy {
  constructor(private offerQty: number, private offerPrice: number) {}

  getPrice(quantity: number, unitPrice: number): number {
    const sets = Math.floor(quantity / this.offerQty);
    const remainder = quantity % this.offerQty;
    return sets * this.offerPrice + remainder * unitPrice;
  }
}

export class PercentageDiscountStrategy
  implements ISpecialOfferPricingStrategy
{
  constructor(private discountPercent: number) {}

  getPrice(quantity: number, unitPrice: number): number {
    const subtotal = quantity * unitPrice;
    return subtotal * (1 - this.discountPercent / 100);
  }
}

export const SpecialOfferPricingStrategies: Record<
  string,
  ISpecialOfferPricingStrategy
> = {
  multiBuy3: new QuantityOfferStrategy(3, 130),
  multiBuy2: new QuantityOfferStrategy(2, 45),
  tenPercentOff: new PercentageDiscountStrategy(10),
};
