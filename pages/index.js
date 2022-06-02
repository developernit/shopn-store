import { FaShoppingCart } from "react-icons/fa";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import products from "../products.json";
import { useCart } from "../hooks/use-cart";
import Link from "next/link";

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

        <ul className={styles.cart}>
          <li>
            <strong>Items:</strong> {totalItems}
          </li>
          <li>
            <strong>Total:</strong> ${subtotal}
          </li>
          <li>
            <button
              className={`${styles.button} ${styles.cartButton}`}
              onClick={checkout}
            >
              <FaShoppingCart />
              Check Out
            </button>
          </li>
        </ul>

        <ul className={styles.grid}>
          {products.map((product) => {
            const { id, title, image, description, price } = product;
            return (
              <li className={styles.card} key={id}>
                <Link href={`/products/${id}`}>
                  <a>
                    <img src={image} alt="Sticker" />
                    <h3>{title}</h3>
                    <p>$ {price}</p>
                    <p>{description}</p>

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
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
