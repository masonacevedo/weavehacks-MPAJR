import styles from "./page.module.css";

export default function Menu() {
  return (
    <div className={styles.page}>
      <div className="app-container">
        <div className="main-menu" id="mainMenu">
          <div className="logo-container">
            <div className="logo"></div>
          </div>

          <div className="navigation">
            <div className="nav-item" onClick="showContent('account')">
              ACCOUNT
            </div>
            <div className="nav-item" onClick="showContent('posts')">
              POSTS
            </div>
            <div className="nav-item" onClick="showContent('contact')">
              CONTACT US
            </div>
          </div>
        </div>

        <!-- Content Areas -->
        <div className="content-area" id="accountContent">
          <h2>Account Management</h2>
          <p>Welcome to your Lodge account portal. Here you can manage your membership details, view
            your standing, and update your personal information.</p>
          <p><strong>Membership Benefits:</strong></p>
          <p>• Access to all Lodge meetings and events</p>
          <p>• Quarterly newsletter subscription</p>
          <p>• Historical archives and research materials</p>
          <p>• Network with brothers worldwide</p>
          <p>• Continuing education opportunities</p>

          <div
            style="margin-top: 30px; padding: 20px; background: rgba(137, 100, 0, 0.1); border-radius: 15px;">
            <h3 style="color: #896400; margin-bottom: 10px;">Member Services</h3>
            <p>• Update Contact Information</p>
            <p>• View Payment History</p>
            <p>• Download Certificates</p>
            <p>• Schedule Appointments</p>
          </div>

          <button className="back-btn" onClick="showMainMenu()">Back to Main Menu</button>
        </div>

        <div className="content-area" id="postsContent">
          <h2>Lodge Posts & Announcements</h2>
          <p>Stay updated with the latest news, events, and announcements from our Lodge
            community.</p>

          <div
            style="margin-top: 30px; padding: 20px; background: rgba(137, 100, 0, 0.1); border-radius: 15px; margin-bottom: 20px;">
            <h3 style="color: #896400; margin-bottom: 10px;">Recent Announcements</h3>
            <p><strong>Monthly Meeting:</strong> Join us for our regular monthly meeting on the
              first Thursday of each month at 7:00 PM.</p>
            <p><strong>Community Service:</strong> Upcoming charity drive to support local families
              in need.</p>
            <p><strong>Educational Seminar:</strong> "The History of Freemasonry" - Open to all
              members and their families.</p>
          </div>

          <div
            style="margin-top: 20px; padding: 20px; background: rgba(137, 100, 0, 0.1); border-radius: 15px;">
            <h3 style="color: #896400; margin-bottom: 10px;">Upcoming Events</h3>
            <p>• Lodge Installation Ceremony - December 15th</p>
            <p>• Annual Charity Gala - January 20th</p>
            <p>• Brothers' Night Out - February 10th</p>
            <p>• Spring Degree Work - March 5th</p>
          </div>

          <button className="back-btn" onClick="showMainMenu()">Back to Main Menu</button>
        </div>

        <div className="content-area" id="contactContent">
          <h2>Contact Us</h2>
          <p>Get in touch with our Lodge leadership and administration. We're here to help with any
            questions or concerns you may have.</p>

          <div
            style="margin-top: 30px; padding: 20px; background: rgba(137, 100, 0, 0.1); border-radius: 15px; margin-bottom: 20px;">
            <h3 style="color: #896400; margin-bottom: 10px;">Lodge Information</h3>
            <p><strong>Lodge Address:</strong><br/>
              123 Masonic Way<br/>
              Your City, State 12345</p>
            <p><strong>Phone:</strong> (555) 123-4567</p>
            <p><strong>Email:</strong> info@yourlodge.org</p>
            <p><strong>Meeting Times:</strong> First Thursday of each month, 7:00 PM</p>
          </div>

          <div
            style="margin-top: 20px; padding: 20px; background: rgba(137, 100, 0, 0.1); border-radius: 15px;">
            <h3 style="color: #896400; margin-bottom: 10px;">Lodge Officers</h3>
            <p><strong>Worshipful Master:</strong> Brother John Smith</p>
            <p><strong>Senior Warden:</strong> Brother Mike Johnson</p>
            <p><strong>Junior Warden:</strong> Brother David Brown</p>
            <p><strong>Secretary:</strong> Brother Robert Wilson</p>
            <p><strong>Treasurer:</strong> Brother James Davis</p>
          </div>

          <div
            style="margin-top: 20px; padding: 20px; background: rgba(137, 100, 0, 0.1); border-radius: 15px;">
            <h3 style="color: #896400; margin-bottom: 10px;">Quick Contact Form</h3>
            <p>For immediate assistance, please call our Lodge phone number during business hours
              (Monday-Friday, 9 AM - 5 PM) or send us an email. We typically respond to all
              inquiries within 24 hours.</p>
          </div>

          <button className="back-btn" onClick="showMainMenu()">Back to Main Menu</button>
        </div>
      </div>
    </div>
  );
}
