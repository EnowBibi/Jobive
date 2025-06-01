// Function to get appropriate icon for file type
export const getFileIcon = (fileType) => {
  if (!fileType) return { icon: "FaFile", className: "text-gray-500" }

  const type = fileType.toLowerCase()

  if (type.includes("image")) {
    return { icon: "FaImage", className: "text-blue-500" }
  }

  if (type.includes("video")) {
    return { icon: "FaVideo", className: "text-red-500" }
  }

  if (type.includes("pdf")) {
    return { icon: "FaFilePdf", className: "text-red-600" }
  }

  if (type.includes("word") || type.includes("doc")) {
    return { icon: "FaFileWord", className: "text-blue-600" }
  }

  if (type.includes("powerpoint") || type.includes("presentation") || type.includes("ppt")) {
    return { icon: "FaFilePowerpoint", className: "text-orange-500" }
  }

  if (type.includes("excel") || type.includes("spreadsheet") || type.includes("xls")) {
    return { icon: "FaFileExcel", className: "text-green-600" }
  }

  if (type.includes("text")) {
    return { icon: "FaFileAlt", className: "text-gray-600" }
  }

  // Default file icon
  return { icon: "FaFile", className: "text-gray-500" }
}

// Function to render file icon component
export const renderFileIcon = (fileType) => {
  const iconData = getFileIcon(fileType)

  // This would be used in a React component like:
  // const { icon, className } = getFileIcon(file.type)
  // Then render: <FaFile className={className} /> (replace FaFile with the actual icon)

  return iconData
}

// Function to format file size in human readable format
export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

// Function to validate file type
export const isValidFileType = (file, allowedTypes = []) => {
  if (!file || !file.type) return false

  if (allowedTypes.length === 0) return true

  return allowedTypes.some((type) => file.type.includes(type))
}

// Function to validate file size
export const isValidFileSize = (file, maxSizeInMB = 10) => {
  if (!file || !file.size) return false

  const maxSizeInBytes = maxSizeInMB * 1024 * 1024
  return file.size <= maxSizeInBytes
}

// Function to generate unique ID
export const generateUniqueId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9)
}

// Function to truncate text
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

// Function to capitalize first letter
export const capitalizeFirst = (str) => {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Function to format date
export const formatDate = (dateString) => {
  if (!dateString) return ""

  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

  if (diffInHours < 1) return "Just now"
  if (diffInHours < 24) return `${diffInHours} hours ago`
  if (diffInHours < 48) return "1 day ago"
  return `${Math.floor(diffInHours / 24)} days ago`
}

// Function to validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Function to validate phone number (basic)
export const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ""))
}

// Function to generate slug from text
export const generateSlug = (text) => {
  if (!text) return ""

  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
}

// Function to get file extension
export const getFileExtension = (filename) => {
  if (!filename) return ""
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
}

// Function to check if string is empty or whitespace
export const isEmpty = (str) => {
  return !str || str.trim().length === 0
}

// Function to debounce function calls
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Function to format currency
export const formatCurrency = (amount, currency = "XAF") => {
  if (!amount && amount !== 0) return ""

  return new Intl.NumberFormat("fr-CM", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Function to parse query string
export const parseQueryString = (queryString) => {
  const params = new URLSearchParams(queryString)
  const result = {}

  for (const [key, value] of params) {
    result[key] = value
  }

  return result
}

// Function to build query string
export const buildQueryString = (params) => {
  const searchParams = new URLSearchParams()

  Object.keys(params).forEach((key) => {
    if (params[key] !== null && params[key] !== undefined && params[key] !== "") {
      searchParams.append(key, params[key])
    }
  })

  return searchParams.toString()
}
