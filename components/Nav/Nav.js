import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../hooks/use-cart";
import styles from "./Nav.module.css";

const Nav = () => {
  const { subtotal, checkout } = useCart();
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <p className={styles.navTitle}>Shopn</p>
      </Link>
      <p className={styles.navCart}>
        <Link href="/cart">
          <a>
            <FaShoppingCart /> $ {subtotal}
          </a>
        </Link>
      </p>
    </nav>
  );
};

export default Nav;
