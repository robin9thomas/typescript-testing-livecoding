"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShippingCost = void 0;
function getShippingCost(articles) {
    const totalPrice = articles.reduce((total, article) => total + article.priceEur * article.quantity, 0);
    return totalPrice >= 10
        ? 0
        : articles.reduce((total, article) => total +
            (article.specialShippingCost || article.weightKg * 10) *
                article.quantity, 0);
}
exports.getShippingCost = getShippingCost;
