import { useState, createContext, useContext, useEffect } from "react";
import products from "../products.json";
import { initiateCheckout } from "../lib/payments";

const defaultCart = {
  products: {},
};

export const CartContext = createContext();

export function useCartState() {
  const [cart, updateCart] = useState(defaultCart);

  // cart is not consistent when we refresh page
  useEffect(() => {
    const stateFromStorage = window.localStorage.getItem("shopn_cart");
    const data = stateFromStorage && JSON.parse(stateFromStorage);
    if (data) {
      updateCart(data);
    }
  }, []);

  useEffect(() => {
    const data = JSON.stringify(cart);
    window.localStorage.setItem("shopn_cart", data);
  }, [cart]);

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
