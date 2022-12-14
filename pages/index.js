import Head from "next/head";
import Image from "next/image";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ABI, contractAddress } from "../constants";
import styles from "../styles/Home.module.css";
import { chainIdToName, truncateStr } from "../utils";

export default function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <div className={styles.heroSection}>
        <div className={styles.heroText}>
          <h2>Cross Save</h2>
          <p>Save on one chain earn interest from multiple chains.</p>
          <p style={{ color: "#fff" }}>
            Be discouraged to save to break your save.
          </p>
          <p>Seamsless cross chain messaging via Axelar.</p>
        </div>
        <div className={styles.heroImage}>
          <img src="/heroimage.png" />
        </div>
      </div>

      {/* SAVE ON ONE CHAIN SECTION */}
      <div className={styles.saveOnOneChainSection}>
        <div className={styles.saveOnOneSectionText}>
          <h3>Save on one chain earn interest from multiple chains.</h3>
          <p>
            Crossave makes use of a default pool mechanism to reward savers
            based on how long the saver has saved rather the amount saved.
            Allowing users to be flexible with their savings, meaning that the
            users can withdraw part of their savings at any moment in time, that
            is, before or after their savings withdrawal time. Users who
            withdraw before their set withdrawal time lose 50% of their total
            save. This percentage can be much lower, it is only high for testing
            purposes.
          </p>
        </div>

        <div className={styles.saveOnOneSectionImage}>
          <img src="/arrowimage.png" />
        </div>
      </div>

      {/* BE DISCOURAGED SECTION */}
      <div className={styles.beDiscouragedSection}>
        <div className={styles.beDiscouragedSectionImage}>
          <img src="/crossimage.png" />
        </div>

        <div className={styles.beDiscouragedSectionText}>
          <h3>Be discouraged to save to break your save.</h3>
          <p>
            With a 50% fee imposed on savers who want to break their save early,
            savers are discouraged to withdraw their savings early to avoid
            being charged a fee allwoing them to keep to their original goal to
            save a specific amount over a specified period of time successfully.
          </p>
        </div>
      </div>

      {/* SEAMLESS SECTION */}
      <div className={styles.saveOnOneChainSection}>
        <div className={styles.saveOnOneSectionText}>
          <h3>Seamsless cross chain messaging</h3>
          <p>
            By Using axelar for cross chain messgaing. Cross save allows users
            who complete their savings to benefit from defaulters on both the
            bnb and fantom chain without the users bothering about which chain
            is the best to save on to profit from. Axelar makes this cross chain
            communication possible.
          </p>
        </div>

        <div className={styles.saveOnOneSectionImage}>
          <img src="/messageimage.png" />
        </div>
      </div>
    </div>
  );
}
