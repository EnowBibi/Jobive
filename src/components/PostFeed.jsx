"use client"

import { useState, useEffect } from "react"
import { FaThumbsUp, FaComment } from "react-icons/fa"
import { postAPI } from "../services/api"
import { handleApiError } from "../utils/notifications"
import dummy from "../assets/dummy.png"

function PostsFeed({ userId }) {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async (pageNum = 1) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await postAPI.getAllPosts(pageNum, 10)
      if (response.success) {
        if (pageNum === 1) {
          setPosts(response.data)
        } else {
          setPosts((prev) => [...prev, ...response.data])
        }
        setHasMore(response.pagination.page < response.pagination.pages)
        setPage(pageNum)
      } else {
        setError("Failed to load posts")
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
      setError("Failed to load posts")
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLikePost = async (postId) => {
    try {
      const response = await postAPI.likePost(postId)
      if (response.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  likes: response.liked ? [...post.likes, userId] : post.likes.filter((id) => id !== userId),
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

  const loadMore = () => {
    if (!isLoading && hasMore) {
      fetchPosts(page + 1)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    if (diffInHours < 48) return "1 day ago"
    return `${Math.floor(diffInHours / 24)} days ago`
  }

  if (isLoading && posts.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 shadow-sm text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading posts...</p>
      </div>
    )
  }

  if (error && posts.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 shadow-sm text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => fetchPosts()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.length === 0 ? (
        <div className="bg-white rounded-lg p-8 shadow-sm text-center">
          <p className="text-gray-600 mb-4">No posts available</p>
          <p className="text-sm text-gray-500">Be the first to share something!</p>
        </div>
      ) : (
        <>
          {posts.map((post) => (
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

              {/* Display post images */}
              {post.images && post.images.length > 0 && (
                <div className="mb-4">
                  {post.images.length === 1 ? (
                    <img
                      src={post.images[0].url || "/placeholder.svg"}
                      className="w-full h-48 sm:h-64 object-cover rounded-lg"
                      alt="Post image"
                    />
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {post.images.slice(0, 4).map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image.url || "/placeholder.svg"}
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
                    post.likes?.includes(userId) ? "text-blue-600" : ""
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
          ))}

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center">
              <button
                onClick={loadMore}
                disabled={isLoading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Loading..." : "Load More Posts"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default PostsFeed
