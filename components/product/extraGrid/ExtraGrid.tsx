import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./extraGrid.module.scss";
import { ProductType } from "@/interfaces/commonTypes";
import StarRatingComponent from "react-star-rating-component";

const ExtraGrid = function ({ product }: { product: ProductType }) {
  const avgRating = useMemo(() => {
    const totalRating = product.productRating.reduce((a, b) => a + b.rating, 0);
    const avg = totalRating / product.productRating.length;
    return avg;
  }, product.productRating);

  return (
    <div className={styles.extra_container}>
      <div className={styles.extra_info}>
        <Image
          src={
            product.user.sellerprofileSet[0].storeBannerUrl
              ? product.user.sellerprofileSet[0].storeBannerUrl
              : "/images/store.png"
          }
          width="100"
          height="100"
          className={styles.img}
        />
        <p>
          Sold by <span>{product?.user?.sellerprofileSet[0]?.shopName}</span>
        </p>
        <div className={styles.box_productRating}>
          <StarRatingComponent
            name="avg-rating"
            starCount={5}
            value={avgRating}
            editing={false}
          />
          <small>({product.productRating.length} Reviews)</small>
        </div>
      </div>
      <div className={styles.extra_contact}>
        <Link href="/contact-us">
          <a>Contact Us</a>
        </Link>
      </div>
    </div>
  );
};

export default ExtraGrid;
