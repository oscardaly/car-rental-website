import "@/styles/global.css";
import type {AppProps} from "next/app";
import Header from "@/components/app-structure/header/Header";
import {Context} from "../context/state";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/app-structure/Footer";

export default function MyApp({Component, pageProps}: AppProps) {
  return <Context>
    <Header/>
    <Component {...pageProps}/>
    <Footer/>
    <ToastContainer/>
  </Context>;
}
