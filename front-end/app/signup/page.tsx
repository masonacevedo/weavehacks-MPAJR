"use client"

import styles from "./page.module.css";

export default function SignUp() {
  const handleLogin = () => {
    // Add login logic here
  };

  const handleSignup = () => {
    // Add signup logic here
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.logo}></div>

        <div className={styles.formContainer}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="email">E-MAIL</label>
            <input
              type="email"
              id="email"
              className={styles.inputField}
              placeholder="info@nion.com"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              className={styles.inputField}
              placeholder="••••••••••"
              required
            />
          </div>

          <div className={styles.buttonGroup}>
            <button type="button" className={styles.btnLogin} onClick={handleLogin}>LOG IN</button>
            <button type="button" className={styles.btnSignup} onClick={handleSignup}>SIGN UP</button>
          </div>
        </div>
      </div>
    </div>
  );
}
