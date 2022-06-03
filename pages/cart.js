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
  const { cartItems, checkout, updateItem } = useCart();

  const data = cartItems.map((item) => {
    const product = products.find(({ id }) => id === item.id);
    const totalPrice = item.quantity * item.pricePerUnit;

    function handleOnSubmit(e) {
      e.preventDefault();
      const { currentTarget } = e;
      const inputs = Array.from(currentTarget.elements);

      const quantity = inputs.find((input) => input.name === "quantity")?.value;
      updateItem({
        id: item.id,
        quantity: quantity && parseInt(quantity),
      });
    }

    const Quantity = () => {
      return (
        <form onSubmit={handleOnSubmit}>
          <input
            type="number"
            name="quantity"
            min={0}
            defaultValue={item.quantity}
          />
          <button>Update</button>
        </form>
      );
    };

    return {
      ...item,
      quantity: <Quantity />,
      total: `$ ${totalPrice}`,
      title: product.title,
    };
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping Cart - Shopn</title>
        <meta property="description" content="Shopn" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Shopn" />
        <meta
          property="og:description"
          content="A simple ecom website, Shopn"
        />
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
