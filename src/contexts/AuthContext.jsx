"use client"

import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Configure axios defaults
  axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"
  axios.defaults.withCredentials = true

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await axios.get("/auth/me")
      setUser(response.data.user)
    } catch (error) {
      console.log("Not authenticated")
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post("/auth/login", { email, password })
      setUser(response.data.user)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await axios.post("/auth/register", userData)
      setUser(response.data.user)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      }
    }
  }

  const logout = async () => {
    try {
      await axios.post("/auth/logout")
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put("/users/profile", profileData)
      setUser(response.data.user)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Profile update failed",
      }
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
