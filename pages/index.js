import Head from "next/head";
import styles from "../styles/Home.module.css";
import products from "../products.json";
import { useCart } from "../hooks/use-cart";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const { subtotal, totalItems, addToCart, checkout } = useCart();
  return (
    <div className={styles.container}>
      <Head>
        <title>Shopn</title>
        <meta property="description" content="Shopn" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Shopn" />
        <meta
          property="og:description"
          content="A simple ecom website, Shopn"
        />
        <meta
          property="og:image"
          content="https://github.com/developernit/shopn-store/blob/main/public/logo.png"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>Shopn!</a>
        </h1>
        <Image src="/logo.png" height={200} width={200} />
        <p className={styles.description}>
          A simple e-commerce website built with <em>Next.js</em> and{" "}
          <em>Stripe</em>.
        </p>

        <ul className={styles.grid}>
          {products.map((product) => {
            const { id, title, image, description, price } = product;
            return (
              <li className={styles.card} key={id}>
                <Link href={`/products/${id}`}>
                  <a>
                    <img src={image} alt="Sticker" />
                    <h3 className={styles.h3title}>{title}</h3>
                    <h2 className={styles.price}>$ {price}</h2>
                    <p>{description}</p>
                  </a>
                </Link>
                <p className={styles.pbutton}>
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
