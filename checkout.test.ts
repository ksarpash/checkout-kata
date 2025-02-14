import { Checkout } from "./checkout";
import { Cart } from "./Cart";
import { PricingService } from "./PricingService";
import { IspecialOffers, IunitPrices } from "./interfaces";

const unitPrices: IunitPrices = { A: 50, B: 30, C: 20, D: 15 };
const specialOffers: IspecialOffers = {
  A: { quantity: 3, price: 130 },
  B: { quantity: 2, price: 45 },
};

describe("Checkout", () => {
  beforeEach(() => {});
  it("should a total price of zero if nothing is scanned", () => {
    const checkout = new Checkout(
      new Cart(),
      new PricingService(unitPrices, specialOffers)
    );
    expect(checkout.getTotalPrice()).toBe(0);
  });

  it("should return total price of a single item with a unit price if one is scanned", () => {
    const checkout = new Checkout(
      new Cart(),
      new PricingService(unitPrices, specialOffers)
    );
    checkout.scan("A");
    expect(checkout.getTotalPrice()).toBe(50);
  });

  it("should return the total price of multiple items with no special offers", () => {
    const checkout = new Checkout(
      new Cart(),
      new PricingService(unitPrices, specialOffers)
    );
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("B");
    checkout.scan("C");
    checkout.scan("D");
    expect(checkout.getTotalPrice()).toBe(165);
  });

  it("should return the total price of multiple single items with special offers", () => {
    const checkout = new Checkout(
      new Cart(),
      new PricingService(unitPrices, specialOffers)
    );
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");

    expect(checkout.getTotalPrice()).toBe(130);
  });

  it("should return the total price of multiple items with special offers", () => {
    const checkout = new Checkout(
      new Cart(),
      new PricingService(unitPrices, specialOffers)
    );
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
