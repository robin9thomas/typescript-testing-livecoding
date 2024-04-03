import { getOrderCost, getShippingCost } from "./index";

describe("getShippingCost", () => {
  describe("if total article price greater than or equal to 100", () => {
    it("returns 0", () => {
      expect(
        getShippingCost([
          {
            article: {
              id: "1234",
              name: "Table",
              priceEur: 40,
              weightKg: 0.3,
              specialShippingCost: 8,
            },
            quantity: 2,
          },
          {
            article: {
              id: "5678",
              name: "Chaise",
              priceEur: 20,
              weightKg: 0.1,
            },
            quantity: 5,
          },
          {
            article: { id: "5678", name: "Sac", priceEur: 20, weightKg: 0.1 },
            quantity: 1,
          },
        ])
      ).toEqual(0);
    });
  });

  describe("if total article price less than 100", () => {
    it("returns 10 euros per kilogram of total weight, excluding articles with special shipping, whose amount is added to total", () => {
      expect(
        getShippingCost([
          {
            article: {
              id: "1234",
              name: "Table",
              priceEur: 4,
              weightKg: 0.3,
              specialShippingCost: 8,
            },
            quantity: 2,
          },
          {
            article: {
              id: "5678",
              name: "Chaise",
              priceEur: 2,
              weightKg: 0.1,
            },
            quantity: 5,
          },
          {
            article: { id: "5678", name: "Sac", priceEur: 2, weightKg: 0.1 },
            quantity: 1,
          },
        ])
      ).toEqual(2 * 8 + 6 * 0.1 * 10); // 22
    });
  });
});

describe("getOrderCost", () => {
  it("returns total with and without shipping, and shipping", () => {
    expect(
      getOrderCost([
        {
          article: {
            id: "1234",
            name: "Table",
            priceEur: 4,
            weightKg: 0.3,
            specialShippingCost: 8,
          },
          quantity: 2,
        },
        {
          article: {
            id: "5678",
            name: "Chaise",
            priceEur: 2,
            weightKg: 0.1,
          },
          quantity: 5,
        },
        {
          article: { id: "5678", name: "Sac", priceEur: 2, weightKg: 0.1 },
          quantity: 1,
        },
      ])
    ).toEqual({
      totalWithoutShipping: 20,
      shipping: 22,
      totalWithShipping: 42,
    });
  });
});
