import styles from "./page.module.css";

export default function SignUp() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className="logo"></div>

        <div className="form-container">
          <div className="input-group">
            <label className="input-label" htmlFor="email">E-MAIL</label>
            <input
              type="email"
              id="email"
              className="input-field"
              placeholder="info@nion.com"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="••••••••••"
              required
            />
          </div>

          <div className="button-group">
            <button type="button" className="btn btn-login" onClick="handleLogin()">LOG IN</button>
            <button type="button" className="btn btn-signup" onClick="handleSignup()">SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
