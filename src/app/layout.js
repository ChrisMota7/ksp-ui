"use client"
import { Inter } from "next/font/google";

import { Provider, useSelector } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import reducer from "@/redux/reducer"
import Menu from "@/components/Menu/Menu";
import { selectUserid } from "@/redux/reducers/authReducer";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const store = configureStore({
  reducer
})

export default function RootLayout({ children }) {
  const [userId, setUserId] = useState(undefined)

  useEffect(() => {
    setUserId(localStorage.getItem("userid"))
  })

  return (
    <html lang="en">
      <Provider store={store}>
        <body className={inter.className}>
          {userId ? (
            <Menu children={children} />
          ) : (
            children
          )}
        </body>
      </Provider>
    </html>
  );
}
