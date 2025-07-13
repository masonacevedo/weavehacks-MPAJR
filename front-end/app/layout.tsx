"use client"

import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {store} from './store';
import {Provider} from "react-redux";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//export const metadata: Metadata = {
//  title: "Barracuda474",
//};



export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
    <Provider store={store}>
    {children}
    </Provider>
    </body>
    </html>
  );
}
