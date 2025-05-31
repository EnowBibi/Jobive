"use client"

import { createContext, useContext, useState } from "react"
import { FiX, FiCheck, FiAlertCircle, FiInfo } from "react-icons/fi"

const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = (message, type = "info", duration = 5000) => {
    const id = Date.now()
    const notification = { id, message, type, duration }

    setNotifications((prev) => [...prev, notification])

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }
  }

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <FiCheck className="w-5 h-5" />
      case "error":
        return <FiAlertCircle className="w-5 h-5" />
      case "warning":
        return <FiAlertCircle className="w-5 h-5" />
      default:
        return <FiInfo className="w-5 h-5" />
    }
  }

  const getStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white"
      case "error":
        return "bg-red-500 text-white"
      case "warning":
        return "bg-yellow-500 text-white"
      default:
        return "bg-blue-500 text-white"
    }
  }

  const value = {
    addNotification,
    removeNotification,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}

      {/* Notification Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center p-4 rounded-lg shadow-lg min-w-80 ${getStyles(notification.type)} animate-slide-in`}
          >
            <div className="flex-shrink-0 mr-3">{getIcon(notification.type)}</div>
            <div className="flex-1">
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
            <button onClick={() => removeNotification(notification.id)} className="flex-shrink-0 ml-3 hover:opacity-75">
              <FiX className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}
