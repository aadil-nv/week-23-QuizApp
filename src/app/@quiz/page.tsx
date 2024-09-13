'use client'

import useQuiz from "@/store/page";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa"; 

export default function Quiz() {

  const [questions , setQuestions] = useState([]);
  const [answers ,setAnswers] = useState('')
  const [loading , setLoading] = useState(false);
  const config = useQuiz((state)=>state.config);
  const setScore = useQuiz((state)=>state.addScore)

useEffect(()=>{
  async function fetchQuestions (){
    const {result} =  await (await fetch(`https://opentdb.com/api.php?amount=${config.numberOfQuestions}&category=${config.category.id}&difficulty=${config.level}&type=${config.type}`)).json();
    console.log("result is -----",result);
    
  }
  fetchQuestions()
},[])



  return (
    <section className="flex flex-col justify-center items-center mt-10 px-4">
     
      <h1 className="mb-6 text-3xl font-extrabold leading-none tracking-tight text-center text-white md:text-4xl lg:text-5xl dark:text-white">
        Question Number
        <span className="text-blue-600 dark:text-blue-300"> #1</span>
      </h1>
      <p className="text-lg md:text-2xl text-gray-300 mb-4">Score: 0</p>

     
      <section className="shadow-xl my-8 p-8 md:p-12 w-full md:w-3/4 lg:w-1/2 rounded-lg flex flex-col justify-center items-center bg-gray-800 dark:bg-gray-900 shadow-blue-300">
        <h2 className="mb-6 text-2xl font-extrabold leading-none tracking-tight text-center text-white md:text-3xl lg:text-4xl dark:text-white text-blue-500 dark:text-blue-400">
          What is your name?
        </h2>
      </section>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-3/4 lg:w-1/2 mt-6">
        <button className="flex-1 border border-white text-white font-bold py-3 px-6 rounded-lg shadow-md bg-transparent hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors duration-300">
          A) Option 1
        </button>
        <button className="flex-1 border border-white text-white font-bold py-3 px-6 rounded-lg shadow-md bg-transparent hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors duration-300">
          B) Option 2
        </button>
        <button className="flex-1 border border-white text-white font-bold py-3 px-6 rounded-lg shadow-md bg-transparent hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors duration-300">
          C) Option 3
        </button>
        <button className="flex-1 border border-white text-white font-bold py-3 px-6 rounded-lg shadow-md bg-transparent hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors duration-300">
          D) Option 4
        </button>
      </div>

      {/* Next Button */}
      <div className="w-full md:w-3/4 lg:w-1/2 mt-8 flex justify-end">
        <button className="flex items-center justify-center gap-2 border border-white text-white font-bold py-3 px-6 rounded-lg shadow-md bg-transparent hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors duration-300">
          Next <FaArrowRight />
        </button>
      </div>
    </section>
  );
}
