type Article = {
  id: string;
  name: string;
  priceEur: number;
  weightKg: number;
  specialShippingCost?: number;
};

type ArticleInOrder = {
  article: Article;
  quantity: number;
};

const ARTICLES = [
  {
    id: "1234",
    name: "Câble HDMI",
    priceEur: 20,
    weightKg: 0.1,
  },
  {
    id: "5678",
    name: "Cuisse de poulet",
    priceEur: 10,
    weightKg: 0.15,
  },
];

class Order {
  id!: string;
  articlesInOrder!: ArticleInOrder[];

  static createOrder(
    articlesInOrder: { articleId: string; quantity: number }[]
  ): Order {
    // retourner un objet Order avec les articles et leur quantité
    // émettre une erreur si l'un des articles n'existe pas dans l'objet ARTICLES
  }
}

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
