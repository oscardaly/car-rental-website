import styles from "@/pages/index.module.css";
import Head from "next/head";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Page Title</title>
      </Head>
      <h1>This is the home page</h1>
    </div>
  );
}
