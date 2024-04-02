const articlesExample = [
  {
    id: "1234",
    priceEur: 40,
    weightKg: 0.3,
    quantity: 2,
    specialShippingCost: 8,
  },
  { id: "5678", priceEur: 20, weightKg: 0.1, quantity: 5 },
  { id: "5678", priceEur: 20, weightKg: 0.1, quantity: 1 },
];

function getShippingCost(articles) {
  const totalPrice = articles.reduce(
    (total, article) => total + article.priceEur * article.quantity,
    0
  );
  return totalPrice >= 100
    ? 0
    : articles.reduce(
        (total, article) =>
          article.specialShippingCost
            ? total
            : total + article.weightKg * article.quantity,
        0
      ) *
        10 +
        articles.reduce(
          (total, article) =>
            article.specialShippingCost
              ? total + article.specialShippingCost * article.quantity
              : total,
          0
        );
}

module.exports = { getShippingCost };
