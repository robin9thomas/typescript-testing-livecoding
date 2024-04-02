const articlesExample = [
  { id: "1234", priceEur: 40, weightKg: 0.3, quantity: 2 },
  { id: "5678", priceEur: 20, weightKg: 0.1, quantity: 5 },
  { id: "5678", priceEur: 20, weightKg: 0.1, quantity: 1 },
];

function getShippingCost(articles) {
  return (
    articles.reduce(
      (total, article) => total + article.weightKg * article.quantity,
      0
    ) * 10
  );
}

console.log(getShippingCost(articlesExample));
