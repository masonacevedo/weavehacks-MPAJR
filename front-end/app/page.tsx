"use client"

import styles from "./page.module.css";
import Link from "next/link";

import {analyzeTweet} from "./redux/tweetsSlice";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

export default function PostsOpener() {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const messages = useSelector((state) => state.tweets.messages)

  useEffect(() => {
  }, [messages]);

  function submitQueryHandler(e) {
    e?.preventDefault()
    console.log("Submitting query:", query);
    dispatch(analyzeTweet({ username: "bob", text: query }));
  }

  return (
    <div className={styles.page}>
      <div className={styles.appContainer}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logoSection}>
            <div className={styles.logoText}>BARRACUDA474</div>
            <div className={styles.profileCircle}>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={styles.mobileMenu} id="mobileMenu">
          <Link className={styles.mobileMenuItem} href="/menu/account">
            Most Recommended
          </Link>
          <Link className={styles.mobileMenuItem} href="/menu/account">
            Newest
          </Link>
          <Link className={styles.mobileMenuItem} href="/menu/account">
            Trending
          </Link>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Sidebar (Desktop) */}
          <div className={styles.sidebar}>
            <Link className={styles.mobileMenuItem} href="/menu/account">
              Most Recommended
            </Link>
            <Link className={styles.mobileMenuItem} href="/menu/account">
              Newest
            </Link>
            <Link className={styles.mobileMenuItem} href="/menu/account">
              Trending
            </Link>
          </div>

          {/* Content Area */}
          <div className={styles.contentArea}>
            <div className={styles.contentPlaceholder} id="contentArea">
              {messages.map((message, index) => (
                <div key={index} className={`${styles.message} ${styles[message.type]}`}>
                  {message.text}
                </div>
              ))
              }
            </div>

            <div styles={{height: '500px'}}></div>

            {/* Input Area */}
            <div className={styles.message}>
              <input
                name="query"
                style={{border: "none", "width": "100%"}}
                placeholder="Type your query here"
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className={styles.sendButton} onClick={submitQueryHandler}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
