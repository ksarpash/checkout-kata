import {
  IMultibuySpecialOffer,
  IPercentageDiscountSpecialOffer,
  ISpecialOffer,
  ISpecialOfferPricingStrategy,
} from "../interfaces";

class QuantityOfferStrategy implements ISpecialOfferPricingStrategy {
  constructor() {}

  getPrice(
    quantity: number,
    unitPrice: number,
    specialOffer: ISpecialOffer
  ): number {
    const quantitySpeicalOffer = specialOffer as IMultibuySpecialOffer;
    const sets = Math.floor(quantity / quantitySpeicalOffer.quantity);
    const remainder = quantity % quantitySpeicalOffer.quantity;
    return sets * quantitySpeicalOffer.price + remainder * unitPrice;
  }
}

export class PercentageDiscountStrategy
  implements ISpecialOfferPricingStrategy
{
  constructor() {}

  getPrice(
    quantity: number,
    unitPrice: number,
    specialOffer: ISpecialOffer
  ): number {
    const percentageDiscountSpeicalOffer =
      specialOffer as IPercentageDiscountSpecialOffer;
    const subtotal = quantity * unitPrice;
    return (
      subtotal * (1 - percentageDiscountSpeicalOffer.discountPercent / 100)
    );
  }
}

export const SpecialOfferPricingStrategies: Record<
  string,
  ISpecialOfferPricingStrategy
> = {
  ["multiBuy"]: new QuantityOfferStrategy(),
  ["percentageDiscount"]: new PercentageDiscountStrategy(),
};
