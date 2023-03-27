import styles from "@/pages/index.module.css";
import Head from "next/head";
import ImageCarousel from "@/components/ImageCarousel";

const getImages = () => {
  // @ts-ignore
  const context = require.context("public/homescreen-carousel", false);

  const keys = context.keys();
  return keys.map((key: string) => {
    const fileName = key.slice(key.lastIndexOf("/") + 1);

    return {
      src: "homescreen-carousel" + "/" + fileName,
      alt: fileName
    };
  });
};

export default function Home() {
  const images = getImages();

  return (
    <div className={styles.index}>
      <Head>
        <title>NOS Rentals</title>
      </Head>
      <ImageCarousel images={images}/>
    </div>
  );
}
