import { Checkout } from "./checkout";

describe("Checkout", () => {
  it("should return 0 if nothing is scanned", () => {
    const checkout = new Checkout();
    expect(checkout.getTotalPrice()).toBe(0);
  });
});
