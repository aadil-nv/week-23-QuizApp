'use client';

import useQuiz from "@/store/page";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaTrophy, FaRedo } from "react-icons/fa";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Dynamically import Lottie Player with no SSR
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers?: { value: string; sort: number }[];
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const config = useQuiz((state) => state.config);
  const setScoreInStore = useQuiz((state) => state.addScore);
  const router = useRouter();

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${config.numberOfQuestions}&category=${config.category.id}&difficulty=${config.level}&type=${config.type}`
        );
        
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

    if (config && isClient) {
      fetchQuestions();
    }
  }, [config, isClient]);

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer !== null) return;

    const currentQuestion = questions[currentQuestionIndex];
    setSelectedAnswer(answer);
    setShowAnswer(true);
    
    if (answer === currentQuestion.correct_answer) {
      const newScore = score + 1;
      setScore(newScore);
      setScoreInStore(newScore);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setQuizCompleted(true);
      setScoreInStore(score);
    }
  };

  const routeToResults = () => {
    router.push(`/testpage?score=${score}`);
  };

  const restartQuiz = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  // Don't render anything until we're on the client
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  // Quiz completion screen
  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const isExcellent = percentage >= 80;
    const isGood = percentage >= 60;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          {/* Lottie Animation */}
          <div className="mb-8">
            <Player
              autoplay
              loop={false}
              src="https://assets5.lottiefiles.com/packages/lf20_tou0hxv0.json"
              style={{ height: '250px', width: '250px', margin: '0 auto' }}
            />
          </div>

          {/* Results Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="flex items-center justify-center mb-6">
              <FaTrophy className="text-yellow-400 text-4xl mr-3" />
              <h1 className="text-4xl font-bold text-white">Quiz Complete!</h1>
            </div>

            <div className="mb-8">
              <div className="text-6xl font-bold text-white mb-2">{score}/{questions.length}</div>
              <div className="text-2xl text-gray-300 mb-4">{percentage}%</div>
              
              <div className={`inline-block px-6 py-2 rounded-full text-white font-semibold ${
                isExcellent ? 'bg-green-500' : isGood ? 'bg-yellow-500' : 'bg-red-500'
              }`}>
                {isExcellent ? 'Excellent!' : isGood ? 'Good Job!' : 'Keep Practicing!'}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-4 mb-8">
              <div 
                className={`h-4 rounded-full transition-all duration-1000 ${
                  isExcellent ? 'bg-green-500' : isGood ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={routeToResults}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View Detailed Results
              </button>
              
              <button
                onClick={restartQuiz}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <FaRedo /> Play Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Question <span className="text-blue-400">#{currentQuestionIndex + 1}</span>
          </h1>
          <div className="text-xl text-gray-300">Score: <span className="text-green-400 font-bold">{score}</span></div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>Progress</span>
            <span>{currentQuestionIndex + 1} of {questions.length}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-8">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : (
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center leading-relaxed">
              {currentQuestion ? currentQuestion.question : "No questions available"}
            </h2>
          )}
        </div>

        {/* Answer Options */}
        {currentQuestion && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {currentQuestion.answers?.map((answer, index) => {
              let buttonClasses = "w-full p-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 border-2 ";

              if (showAnswer) {
                if (answer.value === currentQuestion.correct_answer) {
                  buttonClasses += "bg-green-500/80 border-green-400 text-white shadow-lg shadow-green-500/50";
                } else if (answer.value === selectedAnswer) {
                  buttonClasses += "bg-red-500/80 border-red-400 text-white shadow-lg shadow-red-500/50";
                } else {
                  buttonClasses += "bg-gray-600/60 border-gray-500 text-gray-300";
                }
              } else {
                buttonClasses += "bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/30";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(answer.value)}
                  className={buttonClasses}
                  disabled={selectedAnswer !== null}
                >
                  <div className="flex items-center">
                    <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-left">{answer.value}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Next Button */}
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
              selectedAnswer === null 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50'
            }`}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}