"use client"; // Client component

import localFont from "next/font/local";
import "./globals.css";
import useQuiz from "@/store/page";


export default function RootLayout({
  children,
  quiz,
}: Readonly<{
  children: React.ReactNode;
  quiz: React.ReactNode;
}>) {
  const config = useQuiz((state) => state.config);
  
  const render = config.status ? quiz : children;


  return (
    <html lang="en">
      <body>
        {render} 
      </body>
    </html>
  );
}
