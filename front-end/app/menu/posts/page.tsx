"use client"

import styles from "../page.module.css";
import Link from "next/link";

export default function Menu() {
  return (
    <div className={styles.page}>
      <div className={styles.appContainer}>
        <div className={styles.contentArea}>

          <h2>Lodge Posts & Announcements</h2>
          <p>Stay updated with the latest news, events, and announcements from our Lodge
            community.</p>

          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              background: "rgba(137, 100, 0, 0.1)",
              borderRadius: "15px",
              marginBottom: "20px",
            }}
          >
            <h3 style={{color: "#896400", marginBottom: "10px"}}>Recent Announcements</h3>
            <p>
              <strong>Monthly Meeting:</strong> Join us for our regular monthly meeting on the first
              Thursday of each month at 7:00 PM.
            </p>
            <p>
              <strong>Community Service:</strong> Upcoming charity drive to support local families
              in need.
            </p>
            <p>
              <strong>Educational Seminar:</strong> "The History of Freemasonry" - Open to all
              members and their families.
            </p>
          </div>

          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              background: "rgba(137, 100, 0, 0.1)",
              borderRadius: "15px",
              marginBottom: "20px",
            }}
          >
            <h3 style={{color: "#896400", marginBottom: "10px"}}>Upcoming Events</h3>
            <p>• Lodge Installation Ceremony - December 15th</p>
            <p>• Annual Charity Gala - January 20th</p>
            <p>• Brothers' Night Out - February 10th</p>
            <p>• Spring Degree Work - March 5th</p>
          </div>

          <Link className={styles.backBtn} href="/menu">
            Back to Main Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
