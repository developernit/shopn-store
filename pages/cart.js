import Head from "next/head";
import { FaShoppingCart } from "react-icons/fa";
import styles from "../styles/Cart.module.css";
import { useCart } from "../hooks/use-cart";
import products from "../products.json";
import Table from "../components/Table";

const column = [
  {
    columnId: "title",
    Header: "Product Name",
  },
  {
    columnId: "quantity",
    Header: "Quantity",
  },
  {
    columnId: "pricePerUnit",
    Header: "Price Per Item",
  },
  {
    columnId: "total",
    Header: "Item Total",
  },
];

export default function Cart() {
  const { cartItems, checkout } = useCart();

  const data = cartItems.map((item) => {
    const product = products.find(({ id }) => id === item.id);
    const totalPrice = item.quantity * item.pricePerUnit;
    return {
      ...item,
      total: `$ ${totalPrice}`,
      title: product.title,
    };
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping Cart - Shopn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <FaShoppingCart /> Cart
        </h1>

        <Table className={styles.table} data={data} column={column} />

        <p className={styles.checkout}>
          <button className={styles.button} onClick={checkout}>
            Check Out
          </button>
        </p>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
