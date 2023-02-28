import styles from "@/pages/CarSelection.module.css";
import Head from "next/head";
export default function CarSelection() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Page Title</title>
      </Head>
      <div className={styles.header}>
        <p>.../Car Selection</p>
        <div className={styles.header}>
          <h2>Choose your car:</h2>
          <input value="Search make/model" className={styles.search__input}/>
        </div>
        <div className={styles.header}>
          <p>Sort by:</p>
          <select className={styles.sort__select}>
            <option value="Price" selected>Price</option>
            <option value="Popularity">Popularity</option>
            <option value="Brand A-Z">Brand A-Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}