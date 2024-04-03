import { Order } from "./Order";

describe("static createOrder", () => {
  describe("when all article IDs belong to articles in table", () => {
    it("returns new Order with articles", () => {
      const order = Order.createOrder([
        { articleId: "1234", quantity: 4 },
        { articleId: "5678", quantity: 1 },
      ]);

      expect(order.articlesInOrder).toEqual([
        {
          article: {
            id: "1234",
            name: "Câble HDMI",
            priceEur: 20,
            weightKg: 0.1,
          },
          quantity: 4,
        },
        {
          article: {
            id: "5678",
            name: "Cuisse de poulet",
            priceEur: 10,
            weightKg: 0.15,
            specialShippingCost: 4,
          },
          quantity: 1,
        },
      ]);
    });
  });

  describe("when one article ID does not belong to article in table", () => {
    it("throws error", () => {
      expect(() => {
        Order.createOrder([
          { articleId: "1234", quantity: 4 },
          { articleId: "0000", quantity: 1 },
        ]);
      }).toThrow("Article with ID 0000 not found.");
    });
  });
});

describe("submitOrder", () => {
  it("sets `submitted` to true", () => {
    const order = new Order();
    order.submitOrder();
    expect(order.submitted).toEqual(true);
  });
});

describe("getShippingCost", () => {
  describe("if total article price greater than or equal to 100", () => {
    it("returns 0", () => {
      const order = Order.createOrder([
        {
          articleId: "1234",
          quantity: 5,
        },
      ]);

      expect(order.getShippingCost()).toEqual(0);
    });
  });

  describe("if total article price less than 100", () => {
    it("returns 10 euros per kilogram of total weight, excluding articles with special shipping, whose amount is added to total", () => {
      const order = Order.createOrder([
        {
          articleId: "1234",
          quantity: 2,
        },
        {
          articleId: "5678",
          quantity: 3,
        },
      ]);

      expect(order.getShippingCost()).toEqual(2 * 1 + 3 * 4); // 14
    });
  });
});

describe("getOrderCost", () => {
  it("returns total with and without shipping, and shipping", () => {
    const order = Order.createOrder([
      {
        articleId: "1234",
        quantity: 2,
      },
      {
        articleId: "5678",
        quantity: 3,
      },
    ]);

    expect(order.getOrderCost()).toEqual({
      totalWithoutShipping: 70,
      shipping: 14,
      totalWithShipping: 84,
    });
  });
});
