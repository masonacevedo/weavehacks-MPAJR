"use client"

import styles from "./page.module.css";
import Link from "next/link";

export default function Menu() {
  return (
    <div className={styles.page}>
      <div className={styles.appContainer}>
        <div className={styles.mainMenu}>
          <div className={styles.logoContainer}>
            <div className={styles.logo}></div>
          </div>

          <div className={styles.navigation}>
            <Link className={styles.navItem} href="/menu/account">
              ACCOUNT
            </Link>
            <Link className={styles.navItem} href="/menu/posts">
              POSTS
            </Link>
            <Link className={styles.navItem} href="/menu/contact">
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
