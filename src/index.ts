import { ArticleInOrder } from "./Order";

function getTotalPrice(articlesInOrder: ArticleInOrder[]): number {
  return articlesInOrder.reduce(
    (total, { article, quantity }) => total + article.priceEur * quantity,
    0
  );
}

function getShippingCost(articlesInOrder: ArticleInOrder[]): number {
  return getTotalPrice(articlesInOrder) >= 100
    ? 0
    : articlesInOrder.reduce(
        (total, { article, quantity }) =>
          total +
          (article.specialShippingCost || article.weightKg * 10) * quantity,
        0
      );
}

function getOrderCost(articlesInOrder: ArticleInOrder[]): {
  totalWithoutShipping: number;
  shipping: number;
  totalWithShipping: number;
} {
  const totalWithoutShipping = getTotalPrice(articlesInOrder);
  const shipping = getShippingCost(articlesInOrder);

  return {
    totalWithoutShipping,
    shipping,
    totalWithShipping: totalWithoutShipping + shipping,
  };
}

export { getShippingCost, getOrderCost };
