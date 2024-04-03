type Article = {
  id: string;
  priceEur: number;
  weightKg: number;
  quantity: number;
  specialShippingCost?: number;
};

function getTotalPrice(articles: Article[]) {
  return articles.reduce(
    (total, article) => total + article.priceEur * article.quantity,
    0
  );
}

function getShippingCost(articles: Article[]) {
  return getTotalPrice(articles) >= 100
    ? 0
    : articles.reduce(
        (total, article) =>
          total +
          (article.specialShippingCost || article.weightKg * 10) *
            article.quantity,
        0
      );
}

function getOrderCost(articles: Article[]): {
  totalWithoutShipping: number;
  shipping: number;
  totalWithShipping: number;
} {
  const totalWithoutShipping = getTotalPrice(articles);
  const shipping = getShippingCost(articles);

  return {
    totalWithoutShipping,
    shipping,
    totalWithShipping: totalWithoutShipping + shipping,
  };
}

export { getShippingCost, getOrderCost };
