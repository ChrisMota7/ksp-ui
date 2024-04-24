"use client"
import { Inter } from "next/font/google";

import { Provider, useSelector } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import reducer from "@/redux/reducer"
import Menu from "@/components/Menu/Menu";
import { selectUserid } from "@/redux/reducers/authReducer";

const inter = Inter({ subsets: ["latin"] });

const store = configureStore({
  reducer
})

export default function RootLayout({ children }) {
  const isUserId = useSelector(selectUserid)
  // const isUserId = 12
  // const isUserId = undefined

  return (
    <html lang="en">
      <Provider store={store}>
        <body className={inter.className}>
          {isUserId ? (
            <Menu children={children} />
          ) : (
            children
          )}
        </body>
      </Provider>
    </html>
  );
}
