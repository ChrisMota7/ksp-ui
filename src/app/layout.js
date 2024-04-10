"use client"
import { Inter } from "next/font/google";

import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import reducer from "@/redux/reducer"

const inter = Inter({ subsets: ["latin"] });

const store = configureStore({
  reducer
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={inter.className}>
          {/* <Menu /> */}
          {children}
        </body>
      </Provider>
    </html>
  );
}
