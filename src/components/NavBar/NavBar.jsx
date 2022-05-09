import React from "react";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <navbar className={styles.container}>
      <h1 className={styles.header}>MINANCE</h1>
      <div>
        <button className={styles.logIn}>Log in</button>
        <button className={styles.register}>Register</button>
      </div>
    </navbar>
  );
};

export default NavBar;
