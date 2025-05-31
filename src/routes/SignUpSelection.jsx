import React from 'react';
import logo from '../assets/logo.png';
import freelancer from '../assets/freelancer.png';
import employer from '../assets/employer.png';
import { NavLink, useNavigate } from 'react-router';

function SignUpSelection() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-screen h-screen bg-white">
      {/* Header */}
      <div className="flex flex-row items-center px-6 md:px-16 animate-fade-in-down">
        <img src={logo} className="w-[205px] h-[80px]" alt="Logo" />
        <select className="ml-auto mr-4 py-1 px-3 border border-gray-300 rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200">
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
          <option value="de">Deutsch</option>
        </select>
        <NavLink
          to="/login"
          className="py-1 px-3 bg-black text-white font-bold rounded-[8px] hover:bg-gray-800 transition-all duration-200"
          end
        >
          Login
        </NavLink>
      </div>

      {/* Selection Area */}
      <div className="bg-main-500 flex flex-1 items-center justify-center">
        <div className="flex flex-col bg-white items-center p-10 gap-6 rounded-2xl shadow-xl animate-fade-in-up">
          {/* Freelancer Card */}
          <div
            className="bg-main-500 flex flex-row items-center p-5 rounded-[8px] gap-4 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg hover:brightness-110"
            onClick={() => navigate('/signupfreelancer')}
          >
            <img src={freelancer} className="w-[200px] h-[150px]" alt="Freelancer" />
            <span className="text-3xl font-semibold text-white">Freelancer</span>
          </div>

          {/* Employer Card */}
          <div
            className="bg-main-500 flex flex-row items-center p-5 rounded-[8px] gap-4 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg hover:brightness-110"
            onClick={() => navigate('/signupemployer')}
          >
            <img src={employer} className="w-[200px] h-[150px]" alt="Employer" />
            <span className="text-3xl font-semibold text-white">Employer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpSelection;
