'use client';

import useQuiz from "@/store/page";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Player } from "@lottiefiles/react-lottie-player"; // Import Lottie Player

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers?: { value: string; sort: number }[]; // Include shuffled answers in Question type
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const config = useQuiz((state) => state.config);
  const setScoreInStore = useQuiz((state) => state.addScore);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=${config.numberOfQuestions}&category=${config.category.id}&difficulty=${config.level}&type=${config.type}`);
        
        if (response.status === 429) {
          throw new Error("Too many requests. Please try again later.");
        }

        const data = await response.json();

        if (!data.results) {
          throw new Error("No results found.");
        }

        const shuffledResults = data.results.map((question: Question) => {
          let answers = [];
          if (question.type === 'boolean') {
            answers = ['True', 'False'].map((value) => ({ value, sort: Math.random() }));
          } else {
            answers = [...question.incorrect_answers, question.correct_answer]
              .map((value) => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort);
          }
          return { ...question, answers };
        });

        setQuestions(shuffledResults);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [config]);

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer !== null) return;

    const currentQuestion = questions[currentQuestionIndex];
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correct_answer) {
      setCorrectAnswer(answer);
      setScore(score + 1);
      setScoreInStore(score + 1);
    } else {
      setCorrectAnswer(currentQuestion.correct_answer);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setCorrectAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  // Show final score with Lottie animation if quiz is completed
  if (quizCompleted) {
    return (
      <section className="flex flex-col justify-center items-center mt-10 px-4">
        <Player
          autoplay
          loop={true} // or set to false if you want it to play once
          src="https://assets5.lottiefiles.com/packages/lf20_tou0hxv0.json" // Path or URL to your Lottie animation
          style={{ height: '300px', width: '300px' }}
        />
        <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-tight text-center text-white">
          Quiz Complete!
        </h1>
        <p className="text-3xl text-gray-300 mb-4">Final Score: {score}</p>
        <button
          className="mt-4 py-3 px-6 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500"
          onClick={() => window.location.reload()}
        >
          Play Again
        </button>
      </section>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <section className="flex flex-col justify-center items-center mt-10 px-4">
      <h1 className="mb-6 text-3xl font-extrabold leading-none tracking-tight text-center text-white md:text-4xl lg:text-5xl dark:text-white">
        Question Number
        <span className="text-blue-600 dark:text-blue-300"> #{currentQuestionIndex + 1}</span>
      </h1>
      <p className="text-lg md:text-2xl text-gray-300 mb-4">Score: {score}</p>

      <section className="shadow-xl my-8 p-8 md:p-12 w-full md:w-3/4 lg:w-1/2 rounded-lg flex flex-col justify-center items-center bg-gray-800 dark:bg-gray-900 shadow-blue-300">
        {loading ? (
          <h2 className="text-white">Loading...</h2>
        ) : (
          <h2 className="mb-6 text-2xl font-extrabold leading-none tracking-tight text-center text-white md:text-3xl lg:text-4xl dark:text-white text-blue-500 dark:text-blue-400">
            {currentQuestion ? currentQuestion.question : "No questions available"}
          </h2>
        )}
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-3/4 lg:w-1/2 mt-6">
        {currentQuestion && currentQuestion.answers?.map((answer, index) => {
          let buttonClasses = "flex-1 border border-white text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300";

          if (selectedAnswer) {
            if (answer.value === currentQuestion.correct_answer) {
              buttonClasses += " bg-green-500";
            } else if (answer.value === selectedAnswer) {
              buttonClasses += " bg-red-500";
            } else {
              buttonClasses += " bg-gray-600";
            }
          } else {
            buttonClasses += " bg-transparent hover:bg-blue-600 hover:border-blue-600 hover:text-white";
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer.value)}
              className={buttonClasses}
              disabled={selectedAnswer !== null}
            >
              {String.fromCharCode(65 + index)}) {answer.value}
            </button>
          );
        })}
      </div>

      <div className="w-full md:w-3/4 lg:w-1/2 mt-8 flex justify-end">
        <button
          className="flex items-center justify-center gap-2 border border-white text-white font-bold py-3 px-6 rounded-lg shadow-md bg-transparent hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors duration-300"
          onClick={handleNext}
          disabled={selectedAnswer === null}
        >
          Next <FaArrowRight />
        </button>
      </div>
    </section>
  );
}
