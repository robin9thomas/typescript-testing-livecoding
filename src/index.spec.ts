import { getShippingCost } from "./index";

describe("getShippingCost", () => {
  describe("if total article price greater than or equal to 100", () => {
    it("returns 0", () => {
      expect(
        getShippingCost([
          {
            id: "1234",
            priceEur: 40,
            weightKg: 0.3,
            quantity: 2,
            specialShippingCost: 8,
          },
          { id: "5678", priceEur: 20, weightKg: 0.1, quantity: 5 },
          { id: "5678", priceEur: 20, weightKg: 0.1, quantity: 1 },
        ])
      ).toEqual(0);
    });
  });

  describe("if total article price less than 100", () => {
    it("returns 10 euros per kilogram of total weight, excluding articles with special shipping, whose amount is added to total", () => {
      expect(
        getShippingCost([
          {
            id: "1234",
            priceEur: 4,
            weightKg: 0.3,
            quantity: 2,
            specialShippingCost: 8,
          },
          { id: "5678", priceEur: 2, weightKg: 0.1, quantity: 5 },
          { id: "5678", priceEur: 2, weightKg: 0.1, quantity: 1 },
        ])
      ).toEqual(2 * 8 + 6 * 0.1 * 10); // 22
    });
  });
});
