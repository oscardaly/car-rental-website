import "@/styles/global.css";
import type {AppProps} from "next/app";
import Header from "@/components/app-structure/Header";
import {Context} from "../context/state";

export default function MyApp({Component, pageProps}: AppProps) {
  return <Context>
    <Header/>
    <Component {...pageProps}/>
  </Context>;
}
