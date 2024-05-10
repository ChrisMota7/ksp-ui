"use client"
import { Inter } from "next/font/google";

import { Provider, useSelector } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import reducer from "@/redux/reducer"
import GeneralMenu from "@/components/GeneralMenu/GeneralMenu";
import GenericSnackBar from "@/components/GenericSnackBar/GenericSnackBar";

const inter = Inter({ subsets: ["latin"] });

const store = configureStore({
  reducer
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={inter.className}>
          <GeneralMenu children={children} />
          <GenericSnackBar />
        </body>
      </Provider>
    </html>
  );
}
