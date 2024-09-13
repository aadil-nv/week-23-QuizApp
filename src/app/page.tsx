'use client'

import DropOptions from "@/components/DropDownOptions/page";
import Button from "@/components/Button/page"
import useQuiz from "@/store/page";



export default function Home() {

    const quizConfig = useQuiz(state=>state.config)
    const addNumberOfQuestions = useQuiz(state=>state.addNumberOfQuestions);
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
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-white"
          >
            Number of Questions
          </label>
          <input
            type="number"
            min={0}
            max={20}
            defaultValue={10}
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e)=>addNumberOfQuestions(Number(e.target.value))}
            required
          />
        </div>

        {/* -------------------------------------------------Selection---------------------------------------------- */}

        
        <DropOptions/>
        <Button/>


      </section>
    </section>
  );
}
