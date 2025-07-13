"use client"

import styles from "../page.module.css";
import Link from "next/link";

export default function Menu() {
  return (
    <div className={styles.page}>
      <div className={styles.appContainer}>
        <div className={styles.contentArea}>

          <h2>Contact Us</h2>
          <p>Get in touch with our Lodge leadership and administration. We're here to help with
            any
            questions or concerns you may have.</p>

          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              background: "rgba(137, 100, 0, 0.1)",
              borderRadius: "15px",
              marginBottom: "20px",
            }}
          >
            <h3 style={{color: "#896400", marginBottom: "10px"}}>Lodge Information</h3>
            <p>
              <strong>Lodge Address:</strong>
              <br/>
              123 Masonic Way
              <br/>
              Your City, State 12345
            </p>
            <p>
              <strong>Phone:</strong> (555) 123-4567
            </p>
            <p>
              <strong>Email:</strong> info@yourlodge.org
            </p>
            <p>
              <strong>Meeting Times:</strong> First Thursday of each month, 7:00 PM
            </p>
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              background: "rgba(137, 100, 0, 0.1)",
              borderRadius: "15px",
            }}
          >
            <h3 style={{color: "#896400", marginBottom: "10px"}}>Lodge Officers</h3>
            <p>
              <strong>Worshipful Master:</strong> Brother John Smith
            </p>
            <p>
              <strong>Senior Warden:</strong> Brother Mike Johnson
            </p>
            <p>
              <strong>Junior Warden:</strong> Brother David Brown
            </p>
            <p>
              <strong>Secretary:</strong> Brother Robert Wilson
            </p>
            <p>
              <strong>Treasurer:</strong> Brother James Davis
            </p>
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              background: "rgba(137, 100, 0, 0.1)",
              borderRadius: "15px",
            }}
          >
            <h3 style={{color: "#896400", marginBottom: "10px"}}>Quick Contact Form</h3>
            <p>
              For immediate assistance, please call our Lodge phone number during business
              hours (Monday-Friday, 9 AM - 5 PM) or send us an email. We typically respond
              to all inquiries within 24 hours.
            </p>
          </div>

          <Link className={styles.backBtn} href="/menu">
            Back to Main Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
