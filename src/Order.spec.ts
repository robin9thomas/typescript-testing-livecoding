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
