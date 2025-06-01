import React, { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { FaMoneyBillWave } from 'react-icons/fa'
import { MdCreate, MdWork } from 'react-icons/md'
import { FiLogOut, FiMenu } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios'
import { BASE_URL } from '../config'
import logo from '../assets/logo2.png'
function SideNavBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { label: 'Home', path: '/dashboard', icon: <AiFillHome className="w-6 h-6 mx-3" /> },
    { label: 'Jobs', path: '/jobs', icon: <MdWork className="w-6 h-6 mx-3" /> },
    { label: 'Earnings', path: '/earnings', icon: <FaMoneyBillWave className="w-6 h-6 mx-3" /> },
    { label: 'Create', path: '/create', icon: <MdCreate className="w-6 h-6 mx-3" /> },
  ]

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/api/auth/logout`, {}, { withCredentials: true })
      navigate('/login')
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const renderMenuItems = () =>
    menuItems.map(({ label, path, icon }) => (
      <div
        key={path}
        className={`flex flex-row px-6 py-3 items-center text-white w-full rounded-md mb-4 transition-transform transform hover:scale-105 ${
          currentPath === path ? 'bg-blue-400' : 'cursor-pointer'
        }`}
        onClick={() => {
          setIsMobileMenuOpen(false)
          navigate(path)
        }}
      >
        {icon}
        <span>{label}</span>
      </div>
    ))

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <FiMenu className="w-8 h-8 text-main-500" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed z-40 top-0 left-0 min-h-screen w-64 bg-main-500 px-5 py-10 transition-transform transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:flex flex-col items-center`}
      >
        {/* Logo */}
        
        <img src={logo} className="w-72 h-20 mb-8"/>

        {/* Menu */}
        {renderMenuItems()}

        {/* Logout */}
        <div
          className="flex flex-row px-6 py-3 items-center text-white w-full cursor-pointer mt-auto mb-8 transition-transform transform hover:scale-105"
          onClick={handleLogout}
        >
          <FiLogOut className="w-6 h-6 mx-3" />
          <span>Logout</span>
        </div>
      </div>
    </>
  )
}

export default SideNavBar
