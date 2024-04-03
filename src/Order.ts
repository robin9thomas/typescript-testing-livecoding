type Article = {
  id: string;
  name: string;
  priceEur: number;
  weightKg: number;
  specialShippingCost?: number;
};

export type ArticleInOrder = {
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

export class Order {
  id!: string;
  articlesInOrder: ArticleInOrder[] = [];

  submitted: boolean = false;

  static createOrder(
    articlesInOrder: { articleId: string; quantity: number }[]
  ): Order {
    const order = new Order();

    for (const { articleId, quantity } of articlesInOrder) {
      const article = ARTICLES.find((article) => article.id === articleId);
      if (!article) {
        throw new Error(`Article with ID ${articleId} not found.`);
      }
      order.articlesInOrder.push({ article, quantity });
    }

    return order;
  }

  submitOrder() {
    this.submitted = true;
  }
}
