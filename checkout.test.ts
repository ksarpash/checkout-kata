import { Checkout } from "./checkout";
import { Cart } from "./Cart";
import { PricingService } from "./PricingService";
import { ISpecialOffers, IUnitPrices } from "./interfaces";
import { SpecialOfferPricingStrategies } from "./specialOfferPricingStrategies";

let checkout: Checkout;
let unitPrices: IUnitPrices = { A: 50, B: 30, C: 20, D: 15 };
let specialOffers: ISpecialOffers = {
  A: { offerType: "multiBuy3" },
  B: { offerType: "multiBuy2" },
};

describe("Checkout with offers that exist", () => {
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

describe("Checkout with an non existant special offer", () => {
  beforeEach(() => {
    unitPrices = { A: 50, B: 30, C: 20, D: 15 };
    specialOffers = {
      A: { offerType: "multiBuy3" },
      B: { offerType: "multiBuy8" },
    };
    checkout = new Checkout(
      new Cart(),
      new PricingService(
        unitPrices,
        specialOffers,
        SpecialOfferPricingStrategies
      )
    );
  });

  it("should warn if an unrecognized offer key is provided and default to the unit price", () => {
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
    checkout.scan("B");
    checkout.scan("B");
    checkout.scan("B");
    checkout.scan("B");
    checkout.scan("B");
    checkout.scan("B");
    checkout.scan("B");
    checkout.scan("B");

    expect(checkout.getTotalPrice()).toBe(240);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Unrecognized offer key: "undefined". Defaulting to no offer.'
    );
  });
});
