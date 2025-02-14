import { Checkout, cart } from "./checkout";

describe("Checkout", () => {
  it("should a total price of zero if nothing is scanned", () => {
    const checkout = new Checkout(new cart());
    expect(checkout.getTotalPrice()).toBe(0);
  });

  it("should return total price of a single item with a unit price if one is scanned", () => {
    const checkout = new Checkout(new cart());
    checkout.scan("A");
    expect(checkout.getTotalPrice()).toBe(50);
  });

  it("should return the total price of multiple items with no special offers", () => {
    const checkout = new Checkout(new cart());
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("B");
    checkout.scan("C");
    checkout.scan("D");
    expect(checkout.getTotalPrice()).toBe(165);
  });

  it("should return the total price of multiple single items with special offers", () => {
    const checkout = new Checkout(new cart());
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");

    expect(checkout.getTotalPrice()).toBe(130);
  });

  it("should return the total price of multiple items with special offers", () => {
    const checkout = new Checkout(new cart());
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
