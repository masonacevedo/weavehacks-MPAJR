"use client"

import styles from "./page.module.css";

export default function PostsOpener() {
  return (
    <div className={styles.page}>
      <div className={styles.appContainer}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logoSection}>
            <div className={styles.logoText}>BARRACUDA474</div>
            <div className={styles.profileCircle}>
              <div className={styles.menuIcon} onClick={() => toggleMobileMenu()}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={styles.mobileMenu} id="mobileMenu">
          <div className={styles.mobileMenuItem} onClick={() => selectMenuItem('Dashboard')}>Dashboard</div>
          <div className={styles.mobileMenuItem} onClick={() => selectMenuItem('Profile')}>Profile</div>
          <div className={styles.mobileMenuItem} onClick={() => selectMenuItem('Settings')}>Settings</div>
          <div className={styles.mobileMenuItem} onClick={() => selectMenuItem('Analytics')}>Analytics</div>
          <div className={styles.mobileMenuItem} onClick={() => selectMenuItem('Messages')}>Messages</div>
        </div>

        {/* Overlay */}
        <div className={styles.overlay} id="overlay" onClick={() => toggleMobileMenu()}></div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Sidebar (Desktop) */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarItem} onClick={() => selectMenuItem('Dashboard')}>Dashboard</div>
            <div className={styles.sidebarItem} onClick={() => selectMenuItem('Profile')}>Profile</div>
            <div className={styles.sidebarItem} onClick={() => selectMenuItem('Settings')}>Settings</div>
            <div className={styles.sidebarItem} onClick={() => selectMenuItem('Analytics')}>Analytics</div>
            <div className={styles.sidebarItem} onClick={() => selectMenuItem('Messages')}>Messages</div>
          </div>

          {/* Content Area */}
          <div className={styles.contentArea}>
            <div className={styles.contentPlaceholder} id="contentArea">
              <h2>Welcome to Barracuda474</h2>
              <p>Select an option from the menu to get started.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
