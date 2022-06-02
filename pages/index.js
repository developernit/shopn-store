import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import products from "../products.json";
import useCart from "../hooks/use-cart";

export default function Home() {
  const { subtotal, totalItems, addToCart, checkout } = useCart();

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
