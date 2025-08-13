'use client';


import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function TestPage() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score') 

 

  return (
    <section className="flex flex-col justify-center items-center mt-10 px-4">
      <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-tight text-center text-white">
        Quiz Results
      </h1>
      <p className="text-3xl text-gray-300 mb-4">
        {score !== null ? `Your Final Score: ${score}` : 'No score available'}
      </p>
      
    </section>
  );
}
