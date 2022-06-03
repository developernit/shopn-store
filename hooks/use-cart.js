import { useState, createContext, useContext, useEffect } from "react";
import products from "../products.json";
import { initiateCheckout } from "../lib/payments";

const defaultCart = {
  products: {},
};

export const CartContext = createContext();

export function useCartState() {
  const [cart, updateCart] = useState(defaultCart);

  useEffect(() => {
    const stateFromStorage = window.localStorage.getItem("shopn_cart");
    const data = stateFromStorage && JSON.parse(stateFromStorage);
    if (data) {
      updateCart(data);
    }
  }, []);

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
  const totalItems =
    cartItems.length > 0 &&
    cartItems.reduce((prev, item) => {
      console.log("type ", typeof item.quantity);
      return prev.quantity + item.quantity
    }, 0);

  console.log("cart Items: ", cartItems);

  function addToCart({ id } = {}) {
    let cartInfo = { ...cart };
    if (cartInfo.products[id]) {
      cartInfo.products[id].quantity = cartInfo.products[id].quantity + 1;
    } else {
      cartInfo.products[id] = {
        id,
        quantity: 1,
      };
    }
    console.log("cartinfo ", cartInfo);
    const data = JSON.stringify(cartInfo);
    window.localStorage.setItem("shopn_cart", data);
    return updateCart(cartInfo);
    // updateCart((prev) => {
    //   let cart = { ...prev };
    //   console.log("carts ", cart);
    //   if (cart.products[id]) {
    //     console.log("check 1");
    //     cart.products[id].quantity = cart.products[id].quantity + 1;
    //   } else {
    //     console.log("check 2");
    //     cart.products[id] = {
    //       id,
    //       quantity: 1,
    //     };
    //   }
    //   return cart;
    // });
  }

  function updateItem({ id, quantity }) {
    updateCart((prev) => {
      let cart = { ...prev };
      if (cart.products[id]) {
        cart.products[id].quantity = quantity;
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
  console.log("totalItems ", totalItems);

  return {
    cart,
    updateCart,
    updateItem,
    subtotal,
    totalItems,
    addToCart,
    checkout,
    cartItems,
  };
}

export function useCart() {
  const cart = useContext(CartContext);
  return cart;
}
