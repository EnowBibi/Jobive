import axios from "axios"
import { BASE_URL } from "../config"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for cookies
})

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    // Try to get token from localStorage first
    const token = localStorage.getItem("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // If no token in localStorage, the cookie will be sent automatically due to withCredentials: true
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token")
      localStorage.removeItem("user")

      // Only redirect if we're not already on the login page
      if (window.location.pathname !== "/login") {
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  },
)

// Auth API functions
export const authAPI = {
  // Login function
  login: async (credentials) => {
    const response = await api.post("/api/auth/login", credentials, {
      withCredentials: true, // important to send/receive cookies
    })

    // Store token and user data
    if (response.data.success && response.data.token) {
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.data))
    }

    return response.data
  },

  // Register function
  register: async (userData) => {
    const response = await api.post("/api/auth/signup", userData, {
      withCredentials: true, // important to send/receive cookies
    })

    // Store token and user data if registration includes auto-login
    if (response.data.success && response.data.token) {
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.data))
    }

    return response.data
  },

  // Logout function
  logout: async () => {
    try {
      await api.post("/api/auth/logout")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      // Clear local storage regardless of API call success
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get("/api/auth/me")
    return response.data
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    return !!(token && user)
  },

  // Get stored user data
  getStoredUser: () => {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  },
}

// Post API functions (unchanged)
export const postAPI = {
  // Create a new post
  createPost: async (postData) => {
    const formData = new FormData()
    formData.append("content", postData.content)

    // Add tags
    postData.tags.forEach((tag) => {
      formData.append("tags", tag)
    })

    // Add images
    postData.images.forEach((image) => {
      formData.append("images", image.file)
    })

    const response = await api.post("/api/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data
  },

  // Get all posts
  getAllPosts: async (page = 1, limit = 10) => {
    const response = await api.get(`/api/posts?page=${page}&limit=${limit}`)
    return response.data
  },

  // Get user posts
  getUserPosts: async (userId, page = 1, limit = 10) => {
    const response = await api.get(`/api/posts/user/${userId}?page=${page}&limit=${limit}`)
    return response.data
  },

  // Get post by ID
  getPostById: async (postId) => {
    const response = await api.get(`/api/posts/${postId}`)
    return response.data
  },

  // Update post
  updatePost: async (postId, postData) => {
    const formData = new FormData()
    formData.append("content", postData.content)

    postData.tags.forEach((tag) => {
      formData.append("tags", tag)
    })

    postData.images.forEach((image) => {
      if (image.file) {
        formData.append("images", image.file)
      }
    })

    const response = await api.put(`/api/posts/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data
  },

  // Delete post
  deletePost: async (postId) => {
    const response = await api.delete(`/api/posts/${postId}`)
    return response.data
  },

  // Like/unlike post
  likePost: async (postId) => {
    const response = await api.post(`/api/posts/${postId}/like`)
    return response.data
  },

  // Add comment
  addComment: async (postId, text) => {
    const response = await api.post(`/api/posts/${postId}/comments`, { text })
    return response.data
  },

  // Delete comment
  deleteComment: async (postId, commentId) => {
    const response = await api.delete(`/api/posts/${postId}/comments/${commentId}`)
    return response.data
  },
}

// Training API functions (unchanged)
export const trainingAPI = {
  // Create a new training program
  createTraining: async (trainingData) => {
    // First, create the training program without files
    const trainingPayload = {
      title: trainingData.title,
      description: trainingData.description,
      category: trainingData.category,
      price: Number.parseFloat(trainingData.price),
      duration: trainingData.duration,
      level: trainingData.level,
      chapters: trainingData.chapters.map((chapter, chapterIndex) => ({
        title: chapter.title,
        order: chapterIndex,
        subchapters: chapter.subchapters.map((subchapter, subIndex) => ({
          title: subchapter.title,
          description: subchapter.description,
          order: subIndex,
          files: [], // Files will be uploaded separately
        })),
      })),
    }

    const response = await api.post("/api/trainings", trainingPayload)
    const createdTraining = response.data.data

    // Upload files for each subchapter
    for (let chapterIndex = 0; chapterIndex < trainingData.chapters.length; chapterIndex++) {
      const chapter = trainingData.chapters[chapterIndex]
      const createdChapter = createdTraining.chapters[chapterIndex]

      for (let subIndex = 0; subIndex < chapter.subchapters.length; subIndex++) {
        const subchapter = chapter.subchapters[subIndex]
        const createdSubchapter = createdChapter.subchapters[subIndex]

        if (subchapter.files && subchapter.files.length > 0) {
          const formData = new FormData()
          subchapter.files.forEach((file) => {
            formData.append("files", file.file)
          })

          await api.post(
            `/api/trainings/${createdTraining._id}/upload/${createdChapter._id}/${createdSubchapter._id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          )
        }
      }
    }

    return response.data
  },

  // Get all training programs
  getAllTrainings: async (filters = {}) => {
    const params = new URLSearchParams()

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params.append(key, filters[key])
      }
    })

    const response = await api.get(`/api/trainings?${params.toString()}`)
    return response.data
  },

  // Get training by ID
  getTrainingById: async (trainingId) => {
    const response = await api.get(`/api/trainings/${trainingId}`)
    return response.data
  },

  // Get instructor trainings
  getInstructorTrainings: async (instructorId, page = 1, limit = 10) => {
    const response = await api.get(`/api/trainings/instructor/${instructorId}?page=${page}&limit=${limit}`)
    return response.data
  },

  // Update training
  updateTraining: async (trainingId, trainingData) => {
    const response = await api.put(`/api/trainings/${trainingId}`, trainingData)
    return response.data
  },

  // Delete training
  deleteTraining: async (trainingId) => {
    const response = await api.delete(`/api/trainings/${trainingId}`)
    return response.data
  },

  // Enroll in training
  enrollInTraining: async (trainingId) => {
    const response = await api.post(`/api/trainings/${trainingId}/enroll`)
    return response.data
  },

  // Complete chapter
  completeChapter: async (trainingId, chapterId) => {
    const response = await api.post(`/api/trainings/${trainingId}/complete/${chapterId}`)
    return response.data
  },

  // Rate training
  rateTraining: async (trainingId, rating, review) => {
    const response = await api.post(`/api/trainings/${trainingId}/rate`, { rating, review })
    return response.data
  },

  // Get enrolled trainings
  getEnrolledTrainings: async (page = 1, limit = 10) => {
    const response = await api.get(`/api/trainings/user/enrolled?page=${page}&limit=${limit}`)
    return response.data
  },

  // Upload files to subchapter
  uploadFiles: async (trainingId, chapterId, subchapterId, files) => {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append("files", file)
    })

    const response = await api.post(`/api/trainings/${trainingId}/upload/${chapterId}/${subchapterId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data
  },
}

export default api
