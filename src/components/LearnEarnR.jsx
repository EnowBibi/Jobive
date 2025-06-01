import React from 'react'
import image from '../assets/image.png'

function LearnEarnR() {
  return(
    
    <div className="bg-gradient-to-br from-teal-400 to-green-500 p-8 flex flex-col items-center justify-center text-center rounded-lg">
      <h2 className="text-white text-4xl font-bold mb-6">LEARN & EARN</h2>
      <img
        src={image}
        alt="Learn and Earn"
        className="w-[726px] h-[520px] rounded shadow-lg object-cover"
      />
    </div>
  );
}

  


export default LearnEarnR