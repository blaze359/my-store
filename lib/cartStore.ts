import { makeObservable, observable, action } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { CartType, CartItem } from '@/lib/cartTypes';

class CartStore {
  cart: CartType = this.createInitialCart();

  constructor() {
    makeObservable(this, {
      cart: observable,
      addToCart: action,
      setItemQuantity: action,
      updateItemQuantity: action,
      removeFromCart: action,
      clearCart: action,
      resetCart: action,
    });

    // Initialize persistence only on the client
    if (typeof globalThis !== 'undefined' && globalThis.sessionStorage !== undefined) {
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
    const normalizedQuantity = Math.floor(quantity);
    if (normalizedQuantity <= 0) return;

    const existingItem = this.cart.products.find((item) => item.id === product.id);

    if (existingItem) {
      // Update quantity and totals if product exists
      existingItem.quantity += normalizedQuantity;
      existingItem.total = existingItem.price * existingItem.quantity;
      existingItem.discountedTotal =
        existingItem.total - (existingItem.total * existingItem.discountPercentage) / 100;
    } else {
      // Add new product
      const newItem: CartItem = {
        ...product,
        quantity: normalizedQuantity,
        total: product.price * normalizedQuantity,
        discountedTotal:
          product.price * normalizedQuantity -
          (product.price * normalizedQuantity * product.discountPercentage) / 100,
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

  // Set absolute quantity for a specific cart item
  setItemQuantity(productId: number, quantity: number) {
    const item = this.cart.products.find((cartItem) => cartItem.id === productId);
    if (!item) return;

    const normalizedQuantity = Math.max(1, Math.floor(quantity));
    item.quantity = normalizedQuantity;
    item.total = item.price * normalizedQuantity;
    item.discountedTotal = item.total - (item.total * item.discountPercentage) / 100;

    this.updateCartTotals();
  }

  // Update quantity by a positive/negative delta
  updateItemQuantity(productId: number, delta: number) {
    const item = this.cart.products.find((cartItem) => cartItem.id === productId);
    if (!item) return;

    this.setItemQuantity(productId, item.quantity + delta);
  }

  // Clear the entire cart
  clearCart() {
    this.cart.products = [];
    this.updateCartTotals();
  }

  // Reset the full checkout and cart state after order confirmation
  resetCart() {
    this.cart = this.createInitialCart();
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

  private createInitialCart(): CartType {
    return {
      id: 0,
      userId: 0,
      total: 0,
      discountedTotal: 0,
      totalProducts: 0,
      totalQuantity: 0,
      products: [],
      email: '',
      shippingAddress: {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
      },
      shippingMethod: '',
      paymentMethod: '',
      orderPlaced: false,
    };
  }
}

const cartStore = new CartStore();
export default cartStore;
