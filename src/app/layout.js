"use client"
import { Inter } from "next/font/google";
import styles from './page.module.css';

import { Provider, useSelector } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import reducer from "@/redux/reducer"
import GeneralMenu from "@/components/GeneralMenu/GeneralMenu";
import GenericSnackBar from "@/components/GenericSnackBar/GenericSnackBar";
import Chatbot from "@/components/Chatbot/Chatbot";

const inter = Inter({ subsets: ["latin"] });

const store = configureStore({
  reducer
})

export default function RootLayout({ children }) {
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
