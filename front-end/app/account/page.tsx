import styles from "./page.module.css";

export default function Account() {
  return (
    <div className={styles.page}>
      <div className="app-container">
        <!-- Header -->
        <div className="header">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-text">BARRACUDA474</div>
            </div>
            <div className="profile-menu">
              <div className="profile-circle" onClick="toggleDropdown()">
                <div className="menu-icon" id="menuIcon">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="dropdown-menu" id="dropdownMenu">
                <div className="dropdown-item" onClick="selectOption('profile')">Profile</div>
                <div className="dropdown-item" onClick="selectOption('settings')">Settings</div>
                <div className="dropdown-item" onClick="selectOption('analytics')">Analytics</div>
                <div className="dropdown-item" onClick="selectOption('help')">Help</div>
                <div className="dropdown-item" onClick="selectOption('logout')">Logout</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div className="main-content">
          <div className="content-wrapper">
            <div className="welcome-section">
              <h1 className="welcome-title">Welcome to Barracuda474</h1>
              <p className="welcome-subtitle">Your powerful dashboard for managing everything in one
                place</p>
            </div>

            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3 className="feature-title">Analytics</h3>
                <p className="feature-description">Track your performance with detailed analytics
                  and insights to help you make better decisions.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🔐</div>
                <h3 className="feature-title">Security</h3>
                <p className="feature-description">Advanced security features to keep your data safe
                  and secure with end-to-end encryption.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3 className="feature-title">Performance</h3>
                <p className="feature-description">Lightning-fast performance optimized for both
                  desktop and mobile experiences.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3 className="feature-title">Focus</h3>
                <p className="feature-description">Streamlined interface designed to help you focus
                  on what matters most.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🌐</div>
                <h3 className="feature-title">Global</h3>
                <p className="feature-description">Access your data from anywhere in the world with
                  our cloud-based platform.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🔄</div>
                <h3 className="feature-title">Sync</h3>
                <p className="feature-description">Real-time synchronization across all your devices
                  for seamless workflow.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
