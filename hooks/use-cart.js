import { useState, createContext, useContext } from "react";
import products from "../products.json";
import { initiateCheckout } from "../lib/payments";

const defaultCart = {
  products: {},
};

export const CartContext = createContext();

export function useCartState() {
  const [cart, updateCart] = useState(defaultCart);
  const cartItems = Object.keys(cart.products).map((key) => {
    const product = products.find(({ id }) => `${id}` === `${key}`);
    return {
      ...cart.products[key],
      pricePerUnit: product.price,
    };
  });

  // prettier-ignore
  const subtotal = cartItems.reduce(
    (accumulator, { pricePerUnit, quantity }) => {
      return accumulator + (pricePerUnit * quantity);
    },
    0
  );

  // prettier-ignore
  const totalItems = cartItems.reduce(
    (accumulator, { quantity }) => {
      return accumulator + quantity;
    },
    0
  );

  function addToCart({ id } = {}) {
    updateCart((prev) => {
      let cart = { ...prev };

      if (cart.products[id]) {
        cart.products[id].quantity = cart.products[id].quantity + 1;
      } else {
        cart.products[id] = {
          id,
          quantity: 1,
        };
      }
      return cart;
    });
  }

  function checkout() {
    initiateCheckout({
      lineItems: cartItems.map((item) => {
        return {
          price: item.id,
          quantity: item.quantity,
        };
      }),
    });
  }

  return { cart, updateCart, subtotal, totalItems, addToCart, checkout };
}

export function useCart() {
  const cart = useContext(CartContext);
  return cart;
}
