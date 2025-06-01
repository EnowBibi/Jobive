import React from 'react';
import logo from '../assets/logo2.png';
import HeroSection from './HeroSection';
import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router"
import { FiMenu, FiX } from "react-icons/fi"
function Navbar() {
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (err) {
        console.error("Error parsing user from localStorage", err)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/login")
  }

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
  }
  return (
    <>
      <nav className="text-white">
        {/* Navbar Container */}
        <nav className="">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <img src={logo} alt="Logo" className="w-[150px] h-auto object-contain" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-lg font-medium">
          <NavLink to="/" className="hover:text-gray-500">Home</NavLink>
          <NavLink to="/morejobs" className="hover:text-gray-500">Jobs</NavLink>
          <NavLink to="/freelancers" className="hover:text-gray-500">Freelancers</NavLink>
          <NavLink to="/aboutus" className="hover:text-gray-500">About Us</NavLink>
          <NavLink to="/contactus" className="hover:text-gray-500">Contact Us</NavLink>
        </div>

        {/* Auth links (desktop only) */}
        <div className="hidden md:flex gap-4 items-center">
          {user ? (
            <div>
              <NavLink to="/dashboard" className="hover:text-[#205781]">Dashboard</NavLink>
              <button onClick={handleLogout} className="text-red-500 hover:text-red-700">Logout</button>
            </div>
          ) : (
            <div className='flex flex-row gap-5 items-center '>
              <NavLink to="/login" className="hover:text-[#205781]">Sign In</NavLink>
              <NavLink to="/signupselection" className="bg-[#205781] px-4 py-2 rounded-full text-white hover:bg-blue-600 transition duration-200">
                Sign Up
              </NavLink>
            </div>
          )}
        </div>

        {/* Hamburger Icon (Mobile only) */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <div className="flex flex-col gap-4 text-base">
            <NavLink to="/" className="hover:text-gray-500" onClick={toggleMenu}>Home</NavLink>
            <NavLink to="/jobs" className="hover:text-gray-500" onClick={toggleMenu}>Jobs</NavLink>
            <NavLink to="/freelancers" className="hover:text-gray-500" onClick={toggleMenu}>Freelancers</NavLink>
            <NavLink to="/aboutus" className="hover:text-gray-500" onClick={toggleMenu}>About Us</NavLink>
            <NavLink to="/contactus" className="hover:text-gray-500" onClick={toggleMenu}>Contact Us</NavLink>

            <hr className="my-2" />

            {user ? (
              <div>
                <NavLink to="/dashboard" onClick={toggleMenu}>Dashboard</NavLink>
                <button onClick={() => { toggleMenu(); handleLogout() }} className="text-red-500">Logout</button>
              </div>
            ) : (
              <div >
                <NavLink to="/login" onClick={toggleMenu}>Sign In</NavLink>
                <NavLink to="/signupselection" onClick={toggleMenu} className="text-white bg-[#205781] px-4 py-2 mx-4 rounded-full text-center">
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
        
      
      </nav>
    </>
  );
}

export default Navbar;