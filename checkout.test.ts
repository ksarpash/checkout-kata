import { Checkout } from "./checkout";
import { Cart } from "./Cart";
import { PricingService } from "./PricingService";
import { ISpecialOffers, IUnitPrices } from "./interfaces";
import { SpecialOfferPricingStrategies } from "./specialOfferPricingStrategies";

let checkout: Checkout;
const unitPrices: IUnitPrices = { A: 50, B: 30, C: 20, D: 15 };
const specialOffers: ISpecialOffers = {
  A: { offerType: "multiBuy3" },
  B: { offerType: "multiBuy2" },
};

describe("Checkout", () => {
  beforeEach(() => {
    checkout = new Checkout(
      new Cart(),
      new PricingService(
        unitPrices,
        specialOffers,
        SpecialOfferPricingStrategies
      )
    );
  });
  it("should calculate a total price of zero if nothing is scanned", () => {
    expect(checkout.getTotalPrice()).toBe(0);
  });

  it("should calculate total price of a single item with a unit price if one is scanned", () => {
    checkout.scan("A");
    expect(checkout.getTotalPrice()).toBe(50);
  });

  it("should calculate the total price of multiple items with no special offers", () => {
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("B");
    checkout.scan("C");
    checkout.scan("D");
    expect(checkout.getTotalPrice()).toBe(165);
  });

  it("should calculate the total price of multiple single items with multibuy3 special offers", () => {
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");

    expect(checkout.getTotalPrice()).toBe(130);
  });

  it("should calculate the total price of multiple items with multibuy3 and multibuy2 special offers", () => {
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("B");
    checkout.scan("C");
    checkout.scan("D");
    checkout.scan("B");

    expect(checkout.getTotalPrice()).toBe(310);
  });
});
