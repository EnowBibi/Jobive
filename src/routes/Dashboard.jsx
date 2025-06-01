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
import { postAPI } from "../services/api"
import { handleApiError } from "../utils/notifications"

function Dashboard() {
  const [user, setUser] = useState({})
  const [activeTab, setActiveTab] = useState("About")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [posts, setPosts] = useState([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(false)
  const [postsError, setPostsError] = useState(null)
  const [debugInfo, setDebugInfo] = useState({})

  useEffect(() => {
    console.log("Stored user:", localStorage.getItem("user"));

    const storedUser = localStorage.getItem("user");
    console.log(storedUser)
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser || {})
        console.log("🔍 Debug - User from localStorage:", parsedUser)
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error)
      }
    }
  }, [])

  useEffect(() => {
    if (activeTab === "Posts") {
      console.log("🔍 Debug - Posts tab activated, user:", user)
      if (user._id) {
        fetchUserPosts()
      } else {
        console.log("🔍 Debug - No user._id found, trying to fetch all posts instead")
        fetchAllPosts() // Fallback to fetch all posts
      }
    }
  }, [activeTab]) // Removed user._id from dependency array

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

  // Function to fetch user's posts
  const fetchUserPosts = async () => {
    console.log("🔍 Debug - fetchUserPosts called with user._id:", user._id)

    if (!user._id) {
      console.log("🔍 Debug - No user._id, cannot fetch user posts")
      return
    }

    setIsLoadingPosts(true)
    setPostsError(null)

    try {
      console.log("🔍 Debug - Making API call to getUserPosts...")
      const response = await postAPI.getUserPosts(user._id)
      console.log("🔍 Debug - getUserPosts response:", response)

      if (response.success) {
        setPosts(response.data)
        setDebugInfo({
          method: "getUserPosts",
          userId: user._id,
          postsCount: response.data.length,
          response: response,
        })
        console.log("🔍 Debug - Posts set successfully:", response.data)
      } else {
        setPostsError("Failed to load posts")
        console.log("🔍 Debug - API returned success: false")
      }
    } catch (error) {
      console.error("🔍 Debug - Error fetching user posts:", error)
      setPostsError("Failed to load posts")
      setDebugInfo({
        method: "getUserPosts",
        userId: user._id,
        error: error.message,
        fullError: error,
      })
      handleApiError(error)
    } finally {
      setIsLoadingPosts(false)
    }
  }

  // Fallback function to fetch all posts
  const fetchAllPosts = async () => {
    console.log("🔍 Debug - fetchAllPosts called as fallback")

    setIsLoadingPosts(true)
    setPostsError(null)

    try {
      console.log("🔍 Debug - Making API call to getAllPosts...")
      const response = await postAPI.getAllPosts(1, 10)
      console.log("🔍 Debug - getAllPosts response:", response)

      if (response.success) {
        setPosts(response.data)
        setDebugInfo({
          method: "getAllPosts",
          postsCount: response.data.length,
          response: response,
        })
        console.log("🔍 Debug - All posts set successfully:", response.data)
      } else {
        setPostsError("Failed to load posts")
        console.log("🔍 Debug - API returned success: false")
      }
    } catch (error) {
      console.error("🔍 Debug - Error fetching all posts:", error)
      setPostsError("Failed to load posts")
      setDebugInfo({
        method: "getAllPosts",
        error: error.message,
        fullError: error,
      })
      handleApiError(error)
    } finally {
      setIsLoadingPosts(false)
    }
  }

  // Function to handle post likes
  const handleLikePost = async (postId) => {
    try {
      const response = await postAPI.likePost(postId)
      if (response.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  likes: response.liked ? [...post.likes, user._id] : post.likes.filter((id) => id !== user._id),
                }
              : post,
          ),
        )
      }
    } catch (error) {
      console.error("Error liking post:", error)
      handleApiError(error)
    }
  }

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    if (diffInHours < 48) return "1 day ago"
    return `${Math.floor(diffInHours / 24)} days ago`
  }

  return (
    <div className="flex flex-col lg:flex-row w-screen min-h-screen bg-gray-50">
     

      {/* Sidebar - Hidden on mobile unless menu is open */}
      <SideNavBar />

      

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
              <p className="text-gray-600">{user.skills || "UI/UX Designer"}</p>
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
                      <FaMapMarkerAlt className="text-gray-600 text-lg" />
                      <span className="text-gray-800 break-words">{user.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-gray-600 text-lg" />
                      <span className="text-gray-800 break-words">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaPhone className="text-gray-600 text-lg" />
                      <span className="text-gray-800">{user.phone}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Posts" && (
                <div className="space-y-6">
                  {/* Manual Refresh Button */}
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex gap-4">
                      <button
                        onClick={fetchUserPosts}
                        disabled={isLoadingPosts}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        {isLoadingPosts ? "Loading..." : "Refresh My Posts"}
                      </button>
                      <button
                        onClick={fetchAllPosts}
                        disabled={isLoadingPosts}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        {isLoadingPosts ? "Loading..." : "Load All Posts"}
                      </button>
                    </div>
                  </div>

                  {isLoadingPosts ? (
                    <div className="bg-white rounded-lg p-8 shadow-sm text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading posts...</p>
                    </div>
                  ) : postsError ? (
                    <div className="bg-white rounded-lg p-8 shadow-sm text-center">
                      <p className="text-red-600 mb-4">{postsError}</p>
                      <div className="space-y-2">
                        <button
                          onClick={fetchUserPosts}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-2"
                        >
                          Try User Posts Again
                        </button>
                        <button
                          onClick={fetchAllPosts}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Try All Posts
                        </button>
                      </div>
                    </div>
                  ) : posts.length === 0 ? (
                    <div className="bg-white rounded-lg p-8 shadow-sm text-center">
                      <p className="text-gray-600 mb-4">No posts found</p>
                      <p className="text-sm text-gray-500 mb-4">
                        {debugInfo.method === "getUserPosts"
                          ? "You haven't created any posts yet, or there might be an issue with user matching."
                          : "No posts exist in the database, or there might be a connection issue."}
                      </p>
                      <button
                        onClick={fetchAllPosts}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Try Loading All Posts
                      </button>
                    </div>
                  ) : (
                    posts.map((post) => (
                      <div key={post._id} className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <img
                            src={post.author?.avatar || dummy || "/placeholder.svg"}
                            className="w-10 h-10 rounded-full"
                            alt="Author"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-800">{post.author?.name || "Unknown User"}</h4>
                            <p className="text-sm text-gray-600">{formatDate(post.createdAt)}</p>
                          </div>
                        </div>

                        <p className="text-gray-800 mb-4">{post.content}</p>
                          <div className="mb-4">
                            <img
                                  //src={post.images[0].url || dummy}
                                  src={dummy}
                                  className="w-full h-48 sm:h-64 object-cover rounded-lg"
                                  alt="Post image"
                                />
                          </div>
                        {/* Display post images */}
                        {post.images && post.images.length > 0 && (
                          <div className="mb-4">
                            <img
                                  //src={post.images[0].url || dummy}
                                  src={dummy}
                                  className="w-full h-48 sm:h-64 object-cover rounded-lg"
                                  alt="Post image"
                                />
                            {post.images.length === 1 ? (
                              <img
                                //src={post.images[0].url || dummy}
                                src={dummy}
                                className="w-full h-48 sm:h-64 object-cover rounded-lg"
                                alt="Post image"
                              />
                            ) : (
                              <div className="grid grid-cols-2 gap-2">
                                {post.images.slice(0, 4).map((image, index) => (
                                  <div key={index} className="relative">
                                    <img
                                      src={image.url || dummy}
                                      className="w-full h-32 object-cover rounded-lg"
                                      alt={`Post image ${index + 1}`}
                                    />
                                    {index === 3 && post.images.length > 4 && (
                                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-semibold">+{post.images.length - 4}</span>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Display tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="mb-4 flex flex-wrap gap-2">
                            {post.tags.map((tag, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-6 text-gray-600">
                          <button
                            onClick={() => handleLikePost(post._id)}
                            className={`flex items-center gap-2 hover:text-blue-600 transition-colors ${
                              post.likes?.includes(user._id) ? "text-blue-600" : ""
                            }`}
                          >
                            <FaThumbsUp className="text-sm" />
                            <span className="text-sm sm:text-base">{post.likes?.length || 0}</span>
                          </button>
                          <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                            <FaComment className="text-sm" />
                            <span className="text-sm sm:text-base">{post.comments?.length || 0}</span>
                          </button>
                        </div>

                       
                      </div>
                    ))
                  )}
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
