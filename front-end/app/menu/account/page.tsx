"use client"

import styles from "../page.module.css";
import Link from "next/link";

export default function Menu() {
  return (
    <div className={styles.page}>
      <div className={styles.appContainer}>
        <div className={styles.contentArea}>

          <h2>Account Management</h2>
          <p>Welcome to your Lodge account portal. Here you can manage your membership details,
            view
            your standing, and update your personal information.</p>
          <p><strong>Membership Benefits:</strong></p>
          <p>• Access to all Lodge meetings and events</p>
          <p>• Quarterly newsletter subscription</p>
          <p>• Historical archives and research materials</p>
          <p>• Network with brothers worldwide</p>
          <p>• Continuing education opportunities</p>

          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              background: "rgba(137, 100, 0, 0.1)",
              borderRadius: "15px",
              marginBottom: "20px",
            }}
          >
            <h3 style={{color: "#896400", marginBottom: "10px"}}>Member Services</h3>
            <p>• Update Contact Information</p>
            <p>• View Payment History</p>
            <p>• Download Certificates</p>
            <p>• Schedule Appointments</p>
          </div>

          <Link className={styles.backBtn} href="/menu">
            Back to Main Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
