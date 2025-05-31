"use client"

import { useEffect, useState } from "react"
import {
  FaUser,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaThumbsUp,
  FaComment,
  FaEdit,
  FaBars,
  FaTimes,
} from "react-icons/fa"
import SideNavBar from "../components/SideNavBar"
import dummy from "../assets/dummy.png"

function Dashboard() {
  const [user, setUser] = useState({})
  const [activeTab, setActiveTab] = useState("About")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser || {})
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error)
      }
    }
  }, [])

  const tabs = ["About", "Followers", "Following", "Posts"]

  const suggestions = [
    { name: "Tara Halliday", role: "Designer", avatar: dummy },
    { name: "Wendy Soto", role: "Developer", avatar: dummy },
    { name: "Anna Treadway", role: "Manager", avatar: dummy },
  ]

  const activeUsers = [
    { name: "Shelby Goode", role: "Designer", avatar: dummy },
    { name: "Robert Bacins", role: "Developer", avatar: dummy },
    { name: "John Carilo", role: "Manager", avatar: dummy },
    { name: "Adriene Watson", role: "Designer", avatar: dummy },
  ]

  const posts = [
    {
      id: 1,
      author: "Charles Deo",
      content: "New Blazer out here... SOON!!!",
      likes: 1345,
      comments: 3000,
      image: dummy,
    },
    {
      id: 2,
      author: "Charles Deo",
      content: "Working on some new designs today!",
      likes: 892,
      comments: 156,
      image: dummy,
    },
  ]

  return (
    <div className="flex flex-col lg:flex-row w-screen min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar - Hidden on mobile unless menu is open */}
        <SideNavBar />
      

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6 pt-16 lg:pt-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="relative h-32 sm:h-40 lg:h-48 w-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg mb-16 sm:mb-20">
            <img
              src={dummy || "/placeholder.svg"}
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full absolute left-4 sm:left-6 lg:left-8 bottom-[-40px] sm:bottom-[-48px] lg:bottom-[-64px] border-4 border-white shadow-lg"
              alt="Profile"
            />
          </div>

          {/* Profile Info and Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 lg:mb-8">
            <div className="ml-4 sm:ml-6 lg:ml-8">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{user.name || "Charles Deo"}</h1>
              <p className="text-gray-600">{user.skill || "UI/UX Designer"}</p>
            </div>
            <div className="ml-4 sm:ml-0">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 lg:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <FaEdit className="text-sm" />
                Edit Profile
              </button>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-6">
            {/* Left Content */}
            <div className="flex-1">
              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 lg:px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === "About" && (
                <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm mb-6">
                  <h3 className="text-lg font-semibold mb-4">About</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FaUser className="text-gray-600 text-lg" />
                      <span className="text-gray-800">Male</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="text-gray-600 text-lg" />
                      <span className="text-gray-800">Born June 26, 1985</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-gray-600 text-lg" />
                      <span className="text-gray-800 break-words">2239 Hog Camp Road, Schaumburg</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-gray-600 text-lg" />
                      <span className="text-gray-800 break-words">charles432@hotmail.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaPhone className="text-gray-600 text-lg" />
                      <span className="text-gray-800">3375795467</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Posts" && (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <img src={dummy || "/placeholder.svg"} className="w-10 h-10 rounded-full" alt="Author" />
                        <div>
                          <h4 className="font-semibold text-gray-800">{post.author}</h4>
                          <p className="text-sm text-gray-600">2 hours ago</p>
                        </div>
                      </div>
                      <p className="text-gray-800 mb-4">{post.content}</p>
                      {post.image && (
                        <img
                          src={post.image || "/placeholder.svg"}
                          className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4"
                          alt="Post"
                        />
                      )}
                      <div className="flex items-center gap-6 text-gray-600">
                        <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                          <FaThumbsUp className="text-sm" />
                          <span className="text-sm sm:text-base">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                          <FaComment className="text-sm" />
                          <span className="text-sm sm:text-base">{post.comments}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {(activeTab === "Followers" || activeTab === "Following") && (
                <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">{activeTab}</h3>
                  <p className="text-gray-600">Content for {activeTab} will be displayed here.</p>
                </div>
              )}
            </div>

            {/* Right Sidebar - Hidden on mobile and tablet, shown on desktop */}
            <div className="hidden xl:block w-80 space-y-6">
              {/* You might know */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">You might know</h3>
                <div className="space-y-4">
                  {suggestions.map((person, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <img
                        src={person.avatar || "/placeholder.svg"}
                        className="w-10 h-10 rounded-full"
                        alt={person.name}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{person.name}</h4>
                        <p className="text-sm text-gray-600">{person.role}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Connect</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Users */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Active</h3>
                <div className="space-y-4">
                  {activeUsers.map((person, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={person.avatar || "/placeholder.svg"}
                          className="w-10 h-10 rounded-full"
                          alt={person.name}
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{person.name}</h4>
                        <p className="text-sm text-gray-600">{person.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Bottom Suggestions - Only shown on mobile/tablet */}
          <div className="xl:hidden mt-6 space-y-6">
            {/* You might know */}
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">You might know</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {suggestions.map((person, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <img
                      src={person.avatar || "/placeholder.svg"}
                      className="w-10 h-10 rounded-full"
                      alt={person.name}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{person.name}</h4>
                      <p className="text-sm text-gray-600">{person.role}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Connect</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Users */}
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Active</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeUsers.map((person, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={person.avatar || "/placeholder.svg"}
                        className="w-10 h-10 rounded-full"
                        alt={person.name}
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{person.name}</h4>
                      <p className="text-sm text-gray-600">{person.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
