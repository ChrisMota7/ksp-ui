"use client"
import { Inter } from "next/font/google";

import { Provider, useSelector } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import reducer from "@/redux/reducer"
import Menu from "@/components/Menu/Menu";

const inter = Inter({ subsets: ["latin"] });

const store = configureStore({
  reducer
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={inter.className}>
          <Menu children={children} />
        </body>
      </Provider>
    </html>
  );
}
