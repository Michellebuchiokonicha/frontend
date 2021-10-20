import React from "react";
import styles from "./pageTitle.module.scss";

import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";

const Component = ({ title }: { title: string }) => {
  return (
    <div className={styles.first_banner}>
      <div className={styles.sublink}>
        <p>Home</p>
        <i className="fas fa-angle-right"></i>
        <p>{title}</p>
      </div>
      <p className={styles.category_title}>{title}</p>
    </div>
  );
};

export default Component;
