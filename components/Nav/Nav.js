import { FaShoppingCart } from "react-icons/fa";

import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <p className={styles.navTitle}>Shopn</p>
      <p className={styles.navCart}>
        <button>
          <FaShoppingCart />
        </button>
      </p>
    </nav>
  );
};

export default Nav;
