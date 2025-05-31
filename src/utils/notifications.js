// Simple notification utility - you can replace this with your preferred notification library
export const showNotification = (message, type = "info") => {
  // For now, we'll use browser alerts, but you can integrate with toast libraries like react-hot-toast
  if (type === "success") {
    alert(`✅ ${message}`)
  } else if (type === "error") {
    alert(`❌ ${message}`)
  } else if (type === "warning") {
    alert(`⚠️ ${message}`)
  } else {
    alert(`ℹ️ ${message}`)
  }
}

export const handleApiError = (error) => {
  console.error("API Error:", error)

  if (error.response?.data?.message) {
    showNotification(error.response.data.message, "error")
  } else if (error.message) {
    showNotification(error.message, "error")
  } else {
    showNotification("An unexpected error occurred", "error")
  }
}
