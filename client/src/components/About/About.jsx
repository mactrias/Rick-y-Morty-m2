import React from "react";
import styles from "./About.module.css";

export default function About() {
  return (
    <div className={styles.container}>
      <h1 className={styles.name}>Matias Suppa Nieto</h1>
      <p className={styles.description}>
        Me encuentro cursando el curso de FullStack Part Time en Henry,
        terminando el integrador de Rick & Morty.
      </p>
    </div>
  );
}
