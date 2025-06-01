import React from 'react';
import { NavLink } from 'react-router'; // fixed the import
import logo from '../assets/logo.png';
import HeroSection from '../HeroSection';

function Navbar() {
  return (
    <>
      <nav className="h-screen bg-cover bg-center bg-no-repeat bg-[url('../assets/bglan.png')] text-white">
        {/* Navbar Container */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className="w-[204px] h-[135px] object-contain"
          />

          {/* Center Nav Links */}
          <div className="flex gap-8 text-lg font-medium">
            <NavLink to="/" className="hover:text-gray-500">Home</NavLink>
            <NavLink to="/jobs" className="hover:text-gray-500">Jobs</NavLink>
            <NavLink to="/freelancers" className="hover:text-gray-500">Freelancers</NavLink>
            <NavLink to="/aboutus" className="hover:text-gray-500">About Us</NavLink>
            <NavLink to="/contactus" className="hover:text-gray-500">Contact Us</NavLink>
          </div>

          {/* Right-side Auth Links */}
          <div className="flex gap-4">
            <NavLink to="/signin" className="hover:text-[#205781]">Sign In</NavLink>
            <NavLink to="/signup" className="bg-[#205781] px-4 py-2 rounded-full text-white hover:bg-blue-600 transition duration-200">Sign Up</NavLink>
          </div>
        </div>

        {/* Hero Section below navbar */}
        <HeroSection />
      
      </nav>
    </>
  );
}

export default Navbar;