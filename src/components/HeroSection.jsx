import React from 'react';
import { useNavigate } from 'react-router';

function HeroSection() {
  const navigate=useNavigate();
  return (
    <>
    <section className=" text-white text-center py-16 px-4 md:px-12 md:text-start">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl md:text-3xl mb-4 text-gray-300">
          We've got you covered with
        </h2>
        <h1 className="text-8xl md:text-9xl  mb-4 text-white  ">
          Jobive
        </h1>
        <p className="text-lg md:text-xl font-medium mb-6 ">
          Freelance, <span className="text-blue-400">learn</span>, thrive........
        </p>
        <p className="text-base md:text-2xl text-gray-300 max-w-xl" id='th'>
          This is one of the best places where you get to learn, develop skills by following our training programs and as well as monetising your expertise.
        </p>
        <button
        onClick={()=>navigate('/signupselection')}
         className="mt-6 px-9 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold">
          Get Started
        </button>
      </div>
    </section>
    </>
  );
};

export default HeroSection;