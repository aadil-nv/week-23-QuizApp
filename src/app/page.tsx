'use client'

import DropOptions from "@/components/DropDownOptions/page";
import Button from "@/components/Button/page"
import useQuiz from "@/store/page";



export default function Home() {

    const quizConfig = useQuiz(state=>state.config)
    console.log("Quiz config is---",quizConfig);
    

  return (
    <section className="flex flex-col justify-center items-center m-4 md:m-10">
      {/* -------------------------------------------------Heading--------------------------------------------------------- */}

      <h1 className="mb-4 text-2xl font-extrabold text-white-700 dark:text-white sm:text-3xl md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Welcome to
        </span>{" "}
        Quiz-App
      </h1>

      {/* -------------------------------------------------Number of Questions---------------------------------------------- */}

      <section className="p-6 md:p-10 my-8 mx-auto rounded-lg shadow-2xl w-[90%] md:w-[65%] bg-gray-900 dark:bg-gray-900 shadow-gray-900/70 border-rounded">
        <div>
         
        </div>

        {/* -------------------------------------------------Selection---------------------------------------------- */}

        
        <DropOptions/>
        <Button/>


      </section>
    </section>
  );
}
