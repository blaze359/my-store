import { makeObservable, observable, action } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { CartType, CartItem } from '@/lib/cartTypes';

class CartStore {
  cart: CartType = {
    id: 0,
    userId: 0,
    total: 0,
    discountedTotal: 0,
    totalProducts: 0,
    totalQuantity: 0,
    products: [],
  };

  constructor() {
    makeObservable(this, {
      cart: observable,
      addToCart: action,
      removeFromCart: action,
      clearCart: action,
    });

    // Initialize persistence only on the client
    if (typeof globalThis !== 'undefined' && typeof globalThis.sessionStorage !== 'undefined') {
      this.initializePersistence();
    }
  }

  private persistenceInitialized = false;

  initializePersistence() {
    if (this.persistenceInitialized) return;
    this.persistenceInitialized = true;

    makePersistable(this, {
      name: 'CartStore',
      properties: ['cart'],
      storage: globalThis.sessionStorage,
    });
  }

  // Add product to cart
  addToCart(
    product: Omit<CartItem, 'quantity' | 'total' | 'discountedTotal'>,
    quantity: number = 1
  ) {
    const existingItem = this.cart.products.find((item) => item.id === product.id);

    if (existingItem) {
      // Update quantity and totals if product exists
      existingItem.quantity += quantity;
      existingItem.total = existingItem.price * existingItem.quantity;
      existingItem.discountedTotal =
        existingItem.total - (existingItem.total * existingItem.discountPercentage) / 100;
    } else {
      // Add new product
      const newItem: CartItem = {
        ...product,
        quantity,
        total: product.price * quantity,
        discountedTotal:
          product.price * quantity - (product.price * quantity * product.discountPercentage) / 100,
      };
      this.cart.products.push(newItem);
    }

    // Update cart-level totals
    this.updateCartTotals();
  }

  // Remove product from cart
  removeFromCart(productId: number) {
    this.cart.products = this.cart.products.filter((item) => item.id !== productId);
    this.updateCartTotals();
  }

  // Clear the entire cart
  clearCart() {
    this.cart.products = [];
    this.updateCartTotals();
  }

  // Private helper to recalculate totals
  private updateCartTotals() {
    this.cart.total = this.cart.products.reduce((sum, item) => sum + item.total, 0);
    this.cart.discountedTotal = this.cart.products.reduce(
      (sum, item) => sum + item.discountedTotal,
      0
    );
    this.cart.totalProducts = this.cart.products.length;
    this.cart.totalQuantity = this.cart.products.reduce((sum, item) => sum + item.quantity, 0);
  }
}

const cartStore = new CartStore();
export default cartStore;
