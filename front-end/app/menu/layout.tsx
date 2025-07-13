"use client"

import styles from "./page.module.css";
import Link from "next/link";

export default function Menu({children}) {
  return (
    <div className={styles.page}>
      <div className={styles.appContainer}>
        <div className={styles.mainMenu} id="mainMenu">
        </div>

        {children}
      </div>
    </div>
  );
}
