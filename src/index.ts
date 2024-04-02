type Article = {
  id: string;
  priceEur: number;
  weightKg: number;
  quantity: number;
  specialShippingCost?: number;
};

function getShippingCost(articles: Article[]) {
  const totalPrice = articles.reduce(
    (total, article) => total + article.priceEur * article.quantity,
    0
  );
  return totalPrice >= 100
    ? 0
    : articles.reduce(
        (total, article) =>
          total +
          (article.specialShippingCost || article.weightKg * 10) *
            article.quantity,
        0
      );
}

export { getShippingCost };
