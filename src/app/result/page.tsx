"use client"

import useQuiz from "@/store/page";
import React from "react";


const Results = () => {
  
  
  const score = useQuiz((state) => state.config.score);
  console.log("score from result page ->",score);
  
  return (
    <section className="flex flex-col justify-center items-center mt-10 px-4">
      <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-tight text-center text-white">
        Quiz Results
      </h1>
      <p className="text-3xl text-gray-300 mb-4">Your Score: {score}</p>
     
    </section>
  );
};

export default Results;
