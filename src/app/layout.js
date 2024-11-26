"use client"
import { Inter } from "next/font/google";
import styles from './page.module.css';

import { Provider, useSelector } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import reducer from "@/redux/reducer"
import GeneralMenu from "@/components/GeneralMenu/GeneralMenu";
import GenericSnackBar from "@/components/GenericSnackBar/GenericSnackBar";
import Chatbot from "@/components/Chatbot/Chatbot";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const store = configureStore({
  reducer
})

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const checkSessionExpiration = () => {
      const expirationTime = localStorage.getItem("expirationTime");
      if (expirationTime && Date.now() > expirationTime) {
        router.push("/sessionExpired");
      }
    };
  
    checkSessionExpiration();
    const interval = setInterval(checkSessionExpiration, 1000 * 60); // Verifica cada minuto
    
    return () => clearInterval(interval);
  }, [router]);

  return (
    <html lang="en">
      <Provider store={store}>
        <body className={styles.someGlobalClass}>
          <Chatbot />
          <GeneralMenu children={children} />
          <GenericSnackBar />
        </body>
      </Provider>
    </html>
  );
}
