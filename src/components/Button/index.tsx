import React from 'react';

export default function Index() {
  return (
    <div className="flex flex-col justify-center items-center py-5">
      {/* Start Quiz Button */}
      <button className="mt-5 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 cursor-pointer transition-all duration-100">
        Start Quiz Now
      </button>
    </div>
  );
}
