import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import products from "../products.json";
import { initiateCheckout } from "../lib/payments";

const defaultCart = {
  products: {},
};

export default function Home() {
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

  return (
    <div className={styles.container}>
      <Head>
        <title>Shopn</title>
        <meta name="description" content="Shopn" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Shopn!</h1>

        <p className={styles.description}>
          A simple e-commerce website built with <em>Next.js</em> and{" "}
          <em>Stripe</em>.
        </p>

        <p className={styles.description}>
          <strong>Items: </strong> {totalItems}
          <br />
          <strong>Total Cost:</strong> ${subtotal}
          <br />
          <button className={styles.button} onClick={checkout}>
            {" "}
            Check Out
          </button>
        </p>

        <ul className={styles.grid}>
          {products.map((product) => {
            const { id, title, image, description, price } = product;
            return (
              <li className={styles.card} key={id}>
                <a href="#">
                  <img src={image} alt="Sticker" />
                  <h3>{title}</h3>
                  <p>$ {price}</p>
                  <p>{description}</p>
                </a>
                <p>
                  <button
                    className={styles.button}
                    onClick={() => {
                      addToCart({
                        id,
                      });
                    }}
                  >
                    Add To Cart
                  </button>
                </p>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
