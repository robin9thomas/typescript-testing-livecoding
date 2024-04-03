import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { sendEmail } from "./lib/email";
import { Article } from "./Article";
import { ArticleInOrder } from "./ArticleInOrder";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToMany(() => ArticleInOrder, (articleInOrder) => articleInOrder.order)
  articlesInOrder!: ArticleInOrder[];

  @Column({ default: false })
  submitted!: boolean;

  static async createOrder(
    articlesInOrder: { articleId: string; quantity: number }[]
  ): Promise<Order> {
    const order = new Order();

    for (const { articleId, quantity } of articlesInOrder) {
      const article = await Article.findOne({ where: { id: articleId } });
      if (!article) {
        throw new Error(`Article with ID ${articleId} not found.`);
      }

      const articleInOrder = ArticleInOrder.create();
      articleInOrder.order = order;
      articleInOrder.article = article;
      articleInOrder.quantity = quantity;
      await articleInOrder.save();

      order.articlesInOrder.push(articleInOrder);
    }

    return order;
  }

  submitOrder() {
    this.submitted = true;
    sendEmail();
  }

  private getTotalPrice(): number {
    return this.articlesInOrder.reduce(
      (total, { article, quantity }) => total + article.priceEur * quantity,
      0
    );
  }

  getShippingCost(): number {
    return this.getTotalPrice() >= 100
      ? 0
      : this.articlesInOrder.reduce(
          (total, { article, quantity }) =>
            total +
            (article.specialShippingCost || article.weightKg * 10) * quantity,
          0
        );
  }

  getOrderCost(): {
    totalWithoutShipping: number;
    shipping: number;
    totalWithShipping: number;
  } {
    const totalWithoutShipping = this.getTotalPrice();
    const shipping = this.getShippingCost();

    return {
      totalWithoutShipping,
      shipping,
      totalWithShipping: totalWithoutShipping + shipping,
    };
  }
}
