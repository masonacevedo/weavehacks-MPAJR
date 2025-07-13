"use client"

import styles from "./page.module.css";

export default function PostsOpener() {
  return (
    <div className={styles.page}>
      <div className="app-container">
        {/* Header */}
        <div className="header">
          <div className="logo-section">
            <div className="logo-text">BARRACUDA474</div>
            <div className="profile-circle">
              <div className="menu-icon" onClick={() => toggleMobileMenu()}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="mobile-menu" id="mobileMenu">
          <div className="mobile-menu-item" onClick={() => selectMenuItem('Dashboard')}>Dashboard</div>
          <div className="mobile-menu-item" onClick={() => selectMenuItem('Profile')}>Profile</div>
          <div className="mobile-menu-item" onClick={() => selectMenuItem('Settings')}>Settings</div>
          <div className="mobile-menu-item" onClick={() => selectMenuItem('Analytics')}>Analytics</div>
          <div className="mobile-menu-item" onClick={() => selectMenuItem('Messages')}>Messages</div>
        </div>

        {/* Overlay */}
        <div className="overlay" id="overlay" onClick={() => toggleMobileMenu()}></div>

        {/* Main Content */}
        <div className="main-content">
          {/* Sidebar (Desktop) */}
          <div className="sidebar">
            <div className="sidebar-item" onClick={() => selectMenuItem('Dashboard')}>Dashboard</div>
            <div className="sidebar-item" onClick={() => selectMenuItem('Profile')}>Profile</div>
            <div className="sidebar-item" onClick={() => selectMenuItem('Settings')}>Settings</div>
            <div className="sidebar-item" onClick={() => selectMenuItem('Analytics')}>Analytics</div>
            <div className="sidebar-item" onClick={() => selectMenuItem('Messages')}>Messages</div>
          </div>

          {/* Content Area */}
          <div className="content-area">
            <div className="content-placeholder" id="contentArea">
              <h2>Welcome to Barracuda474</h2>
              <p>Select an option from the menu to get started.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
