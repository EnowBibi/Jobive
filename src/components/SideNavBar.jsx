import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { FaUserCircle, FaMoneyBillWave } from 'react-icons/fa'
import { MdCreate } from 'react-icons/md'
import { FiLogOut } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios'
import { BASE_URL } from '../config';
function SideNavBar() {
    const navigate = useNavigate();
       const location = useLocation();
    const currentPath = location.pathname;
    const menuItems = [
        { label: 'Home', path: '/dashboard', icon: <AiFillHome className="w-6 h-6 mx-3" /> },
        { label: 'Profile', path: '/profile', icon: <FaUserCircle className="w-6 h-6 mx-3" /> },
        { label: 'Earnings', path: '/earnings', icon: <FaMoneyBillWave className="w-6 h-6 mx-3" /> },
        { label: 'Create', path: '/create', icon: <MdCreate className="w-6 h-6 mx-3" /> },
    ];
    const handleLogout = async () => {
    try {
        await axios.post(`${BASE_URL}/api/auth/logout`, {}, { withCredentials: true }); // Adjust path as needed
        navigate('/login'); // Redirect after logout
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

    return (
        <div className="hidden md:flex flex-col items-center px-5 py-10 bg-main-500 flex-grow max-w-3/12 min-h-screen w-full">
            {/* Logo Placeholder */}
            <div className="w-72 h-40 mb-8 text-white text-3xl font-bold flex items-center justify-center">
                LOGO
            </div>

            {/* Menu Items */}
            {menuItems.map(({ label, path, icon }) => (
                <div
                    key={path}
                    className={`flex flex-row px-6 py-3 items-center text-white w-full rounded-md mb-4 transition-transform transform hover:scale-105 ${
                        currentPath=== path ? 'bg-blue-400' : 'cursor-pointer'
                    }`}
                    onClick={() => navigate(path)}
                >
                    {icon}
                    <span>{label}</span>
                </div>
            ))}

            {/* Sign Out */}
            <div 
                className="flex flex-row px-6 py-3 items-center text-white w-full cursor-pointer mt-auto mb-8 transition-transform transform hover:scale-105"
                onClick={() => handleLogout()}
            >
                <FiLogOut className="w-6 h-6 mx-3" />
                <span>Logout</span>
            </div>
        </div>
    );
}

export default SideNavBar;
