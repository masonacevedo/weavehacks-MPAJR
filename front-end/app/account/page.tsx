"use client"

import styles from "./page.module.css";

export default function Account() {
  return (
    <div className={styles.page}>
      <div className={styles.appContainer}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.logoSection}>
              <div className={styles.logoText}>BARRACUDA474</div>
            </div>
            <div className={styles.profileMenu}>
              <div className={styles.profileCircle} onClick={() => toggleDropdown()}>
                <div className={styles.menuIcon} id="menuIcon">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className={styles.dropdownMenu} id="dropdownMenu">
                <div className={styles.dropdownItem} onClick={() => selectOption('profile')}>Profile</div>
                <div className={styles.dropdownItem} onClick={() => selectOption('settings')}>Settings</div>
                <div className={styles.dropdownItem} onClick={() => selectOption('analytics')}>Analytics</div>
                <div className={styles.dropdownItem} onClick={() => selectOption('help')}>Help</div>
                <div className={styles.dropdownItem} onClick={() => selectOption('logout')}>Logout</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            <div className={styles.welcomeSection}>
              <h1 className={styles.welcomeTitle}>Welcome to Barracuda474</h1>
              <p className={styles.welcomeSubtitle}>Your powerful dashboard for managing everything in one place</p>
            </div>

            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>📊</div>
                <h3 className={styles.featureTitle}>Analytics</h3>
                <p className={styles.featureDescription}>Track your performance with detailed analytics and insights to help you make better decisions.</p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🔐</div>
                <h3 className={styles.featureTitle}>Security</h3>
                <p className={styles.featureDescription}>Advanced security features to keep your data safe and secure with end-to-end encryption.</p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>⚡</div>
                <h3 className={styles.featureTitle}>Performance</h3>
                <p className={styles.featureDescription}>Lightning-fast performance optimized for both desktop and mobile experiences.</p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🎯</div>
                <h3 className={styles.featureTitle}>Focus</h3>
                <p className={styles.featureDescription}>Streamlined interface designed to help you focus on what matters most.</p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🌐</div>
                <h3 className={styles.featureTitle}>Global</h3>
                <p className={styles.featureDescription}>Access your data from anywhere in the world with our cloud-based platform.</p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🔄</div>
                <h3 className={styles.featureTitle}>Sync</h3>
                <p className={styles.featureDescription}>Real-time synchronization across all your devices for seamless workflow.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
