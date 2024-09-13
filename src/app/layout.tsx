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
  // Get the configuration from Zustand store
  const config = useQuiz((state) => state.config);
  
  // Determine what to render based on config status
  const render = config.status ? quiz : children;

  // Debugging logs
  console.log("Children:", children);
  console.log("Quiz:", quiz);
  console.log("Config Status:", config.status);
  console.log("Render:", render);

  return (
    <html lang="en">
      <body>
        {render} 
      </body>
    </html>
  );
}
