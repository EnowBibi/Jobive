"use client"

import { useState } from "react"
import {
  FaPlus,
  FaMinus,
  FaUpload,
  FaImage,
  FaFileAlt,
  FaVideo,
  FaBook,
  FaPen,
  FaTags,
  FaTrash,
  FaSave,
  FaEye,
  FaTimes,
  FaSpinner,
} from "react-icons/fa"
import SideNavBar from "../components/SideNavBar"
import { postAPI, trainingAPI } from "../services/api"
import { showNotification, handleApiError } from "../utils/notifications"

function CreateScreen() {
  const [contentType, setContentType] = useState("training") // "training" or "post"
  const [isLoading, setIsLoading] = useState(false)
  const [trainingData, setTrainingData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    duration: "",
    level: "beginner",
    chapters: [
      {
        id: 1,
        title: "",
        subchapters: [
          {
            id: 1,
            title: "",
            description: "",
            files: [],
          },
        ],
      },
    ],
  })

  const [postData, setPostData] = useState({
    content: "",
    tags: [],
    images: [],
  })

  const [currentTag, setCurrentTag] = useState("")

  // Validation functions
  const validateTrainingData = () => {
    const errors = []

    if (!trainingData.title.trim()) errors.push("Course title is required")
    if (!trainingData.description.trim()) errors.push("Course description is required")
    if (!trainingData.category) errors.push("Category is required")
    if (!trainingData.price || Number.parseFloat(trainingData.price) <= 0) errors.push("Valid price is required")

    // Validate chapters
    trainingData.chapters.forEach((chapter, chapterIndex) => {
      if (!chapter.title.trim()) errors.push(`Chapter ${chapterIndex + 1} title is required`)

      chapter.subchapters.forEach((subchapter, subIndex) => {
        if (!subchapter.title.trim()) {
          errors.push(`Chapter ${chapterIndex + 1}, Subchapter ${subIndex + 1} title is required`)
        }
      })
    })

    return errors
  }

  const validatePostData = () => {
    const errors = []

    if (!postData.content.trim()) errors.push("Post content is required")

    return errors
  }

  // API submission functions
  const handleCreateTraining = async () => {
    const errors = validateTrainingData()

    if (errors.length > 0) {
      showNotification(`Please fix the following errors:\n${errors.join("\n")}`, "error")
      return
    }

    setIsLoading(true)

    try {
      const result = await trainingAPI.createTraining(trainingData)
      showNotification("Training program created successfully!", "success")

      // Reset form or redirect
      setTrainingData({
        title: "",
        description: "",
        category: "",
        price: "",
        duration: "",
        level: "beginner",
        chapters: [
          {
            id: 1,
            title: "",
            subchapters: [
              {
                id: 1,
                title: "",
                description: "",
                files: [],
              },
            ],
          },
        ],
      })

      // You can redirect to the training details page or dashboard
      // window.location.href = `/training/${result.data._id}`
    } catch (error) {
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreatePost = async () => {
    const errors = validatePostData()

    if (errors.length > 0) {
      showNotification(`Please fix the following errors:\n${errors.join("\n")}`, "error")
      return
    }

    setIsLoading(true)

    try {
      const result = await postAPI.createPost(postData)
      showNotification("Post created successfully!", "success")

      // Reset form
      setPostData({
        content: "",
        tags: [],
        images: [],
      })

      // You can redirect to the post or dashboard
      // window.location.href = `/post/${result.data._id}`
    } catch (error) {
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePublish = () => {
    if (contentType === "training") {
      handleCreateTraining()
    } else {
      handleCreatePost()
    }
  }

  // Training Program Functions
  const addChapter = () => {
    const newChapter = {
      id: Date.now(),
      title: "",
      subchapters: [
        {
          id: Date.now() + 1,
          title: "",
          description: "",
          files: [],
        },
      ],
    }
    setTrainingData({
      ...trainingData,
      chapters: [...trainingData.chapters, newChapter],
    })
  }

  const removeChapter = (chapterId) => {
    setTrainingData({
      ...trainingData,
      chapters: trainingData.chapters.filter((chapter) => chapter.id !== chapterId),
    })
  }

  const updateChapter = (chapterId, field, value) => {
    setTrainingData({
      ...trainingData,
      chapters: trainingData.chapters.map((chapter) =>
        chapter.id === chapterId ? { ...chapter, [field]: value } : chapter,
      ),
    })
  }

  const addSubchapter = (chapterId) => {
    const newSubchapter = {
      id: Date.now(),
      title: "",
      description: "",
      files: [],
    }
    setTrainingData({
      ...trainingData,
      chapters: trainingData.chapters.map((chapter) =>
        chapter.id === chapterId ? { ...chapter, subchapters: [...chapter.subchapters, newSubchapter] } : chapter,
      ),
    })
  }

  const removeSubchapter = (chapterId, subchapterId) => {
    setTrainingData({
      ...trainingData,
      chapters: trainingData.chapters.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              subchapters: chapter.subchapters.filter((sub) => sub.id !== subchapterId),
            }
          : chapter,
      ),
    })
  }

  const updateSubchapter = (chapterId, subchapterId, field, value) => {
    setTrainingData({
      ...trainingData,
      chapters: trainingData.chapters.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              subchapters: chapter.subchapters.map((sub) =>
                sub.id === subchapterId ? { ...sub, [field]: value } : sub,
              ),
            }
          : chapter,
      ),
    })
  }

  const handleFileUpload = (chapterId, subchapterId, files) => {
    const fileArray = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      file: file,
    }))

    setTrainingData({
      ...trainingData,
      chapters: trainingData.chapters.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              subchapters: chapter.subchapters.map((sub) =>
                sub.id === subchapterId ? { ...sub, files: [...sub.files, ...fileArray] } : sub,
              ),
            }
          : chapter,
      ),
    })
  }

  const removeFile = (chapterId, subchapterId, fileId) => {
    setTrainingData({
      ...trainingData,
      chapters: trainingData.chapters.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              subchapters: chapter.subchapters.map((sub) =>
                sub.id === subchapterId ? { ...sub, files: sub.files.filter((file) => file.id !== fileId) } : sub,
              ),
            }
          : chapter,
      ),
    })
  }

  // Post Functions
  const addTag = () => {
    if (currentTag.trim() && !postData.tags.includes(currentTag.trim())) {
      setPostData({
        ...postData,
        tags: [...postData.tags, currentTag.trim()],
      })
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handlePostImageUpload = (files) => {
    const fileArray = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      file: file,
    }))
    setPostData({
      ...postData,
      images: [...postData.images, ...fileArray],
    })
  }

  const removePostImage = (imageId) => {
    setPostData({
      ...postData,
      images: postData.images.filter((img) => img.id !== imageId),
    })
  }

  const getFileIcon = (fileType) => {
    if (fileType.startsWith("image/")) return <FaImage className="text-green-500" />
    if (fileType.startsWith("video/")) return <FaVideo className="text-red-500" />
    return <FaFileAlt className="text-blue-500" />
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="flex flex-col lg:flex-row w-screen min-h-screen bg-gray-50">
      <SideNavBar />
      <div className="flex-1 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Create Content</h1>

            {/* Content Type Toggle */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setContentType("training")}
                disabled={isLoading}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                  contentType === "training" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <FaBook />
                Online Training Program
              </button>
              <button
                onClick={() => setContentType("post")}
                disabled={isLoading}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                  contentType === "post" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <FaPen />
                Simple Post
              </button>
            </div>
          </div>

          {/* Training Program Form */}
          {contentType === "training" && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Title *</label>
                    <input
                      type="text"
                      value={trainingData.title}
                      onChange={(e) => setTrainingData({ ...trainingData, title: e.target.value })}
                      disabled={isLoading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                      placeholder="Enter course title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      value={trainingData.category}
                      onChange={(e) => setTrainingData({ ...trainingData, category: e.target.value })}
                      disabled={isLoading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    >
                      <option value="">Select category</option>
                      <option value="programming">Programming</option>
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                      <option value="business">Business</option>
                      <option value="photography">Photography</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (XAF) *</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={trainingData.price}
                        onChange={(e) => setTrainingData({ ...trainingData, price: e.target.value })}
                        disabled={isLoading}
                        className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                        placeholder="0"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      value={trainingData.duration}
                      onChange={(e) => setTrainingData({ ...trainingData, duration: e.target.value })}
                      disabled={isLoading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                      placeholder="e.g., 4 weeks, 20 hours"
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                    <div className="flex flex-wrap gap-3">
                      {["beginner", "intermediate", "advanced"].map((level) => (
                        <button
                          key={level}
                          onClick={() => setTrainingData({ ...trainingData, level })}
                          disabled={isLoading}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                            trainingData.level === level
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Description *</label>
                    <textarea
                      value={trainingData.description}
                      onChange={(e) => setTrainingData({ ...trainingData, description: e.target.value })}
                      disabled={isLoading}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                      placeholder="Describe what students will learn in this course"
                    />
                  </div>
                </div>
              </div>

              {/* Chapters */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Course Content</h2>
                  <button
                    onClick={addChapter}
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <FaPlus />
                    Add Chapter
                  </button>
                </div>

                <div className="space-y-6">
                  {trainingData.chapters.map((chapter, chapterIndex) => (
                    <div key={chapter.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium text-gray-800">Chapter {chapterIndex + 1}</h3>
                        {trainingData.chapters.length > 1 && (
                          <button
                            onClick={() => removeChapter(chapter.id)}
                            disabled={isLoading}
                            className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>

                      <div className="mb-4">
                        <input
                          type="text"
                          value={chapter.title}
                          onChange={(e) => updateChapter(chapter.id, "title", e.target.value)}
                          disabled={isLoading}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                          placeholder="Chapter title"
                        />
                      </div>

                      {/* Subchapters */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-gray-700">Subchapters</h4>
                          <button
                            onClick={() => addSubchapter(chapter.id)}
                            disabled={isLoading}
                            className="flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-200 transition-colors text-sm disabled:opacity-50"
                          >
                            <FaPlus />
                            Add Subchapter
                          </button>
                        </div>

                        {chapter.subchapters.map((subchapter, subIndex) => (
                          <div key={subchapter.id} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                              <h5 className="font-medium text-gray-700">Subchapter {subIndex + 1}</h5>
                              {chapter.subchapters.length > 1 && (
                                <button
                                  onClick={() => removeSubchapter(chapter.id, subchapter.id)}
                                  disabled={isLoading}
                                  className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                                >
                                  <FaMinus />
                                </button>
                              )}
                            </div>

                            <div className="space-y-3">
                              <input
                                type="text"
                                value={subchapter.title}
                                onChange={(e) => updateSubchapter(chapter.id, subchapter.id, "title", e.target.value)}
                                disabled={isLoading}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                                placeholder="Subchapter title"
                              />
                              <textarea
                                value={subchapter.description}
                                onChange={(e) =>
                                  updateSubchapter(chapter.id, subchapter.id, "description", e.target.value)
                                }
                                disabled={isLoading}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                                placeholder="Subchapter description"
                              />

                              {/* File Upload */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Materials</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                  <input
                                    type="file"
                                    multiple
                                    accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx"
                                    onChange={(e) => handleFileUpload(chapter.id, subchapter.id, e.target.files)}
                                    disabled={isLoading}
                                    className="hidden"
                                    id={`file-upload-${chapter.id}-${subchapter.id}`}
                                  />
                                  <label
                                    htmlFor={`file-upload-${chapter.id}-${subchapter.id}`}
                                    className={`flex flex-col items-center justify-center cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                                  >
                                    <FaUpload className="text-gray-400 text-2xl mb-2" />
                                    <span className="text-sm text-gray-600">
                                      Click to upload files or drag and drop
                                    </span>
                                    <span className="text-xs text-gray-500 mt-1">Images, videos, PDFs, documents</span>
                                  </label>
                                </div>

                                {/* Uploaded Files */}
                                {subchapter.files.length > 0 && (
                                  <div className="mt-3 space-y-2">
                                    {subchapter.files.map((file) => (
                                      <div
                                        key={file.id}
                                        className="flex items-center justify-between bg-white p-3 rounded-lg border"
                                      >
                                        <div className="flex items-center gap-3">
                                          {getFileIcon(file.type)}
                                          <div>
                                            <p className="text-sm font-medium text-gray-800">{file.name}</p>
                                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                                          </div>
                                        </div>
                                        <button
                                          onClick={() => removeFile(chapter.id, subchapter.id, file.id)}
                                          disabled={isLoading}
                                          className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                                        >
                                          <FaTrash />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Simple Post Form */}
          {contentType === "post" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Create Post</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">What's on your mind?</label>
                  <textarea
                    value={postData.content}
                    onChange={(e) => setPostData({ ...postData, content: e.target.value })}
                    disabled={isLoading}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    placeholder="Share your thoughts, insights, or updates..."
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {postData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        <FaTags className="text-xs" />
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          disabled={isLoading}
                          className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                        >
                          <FaTimes />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                      disabled={isLoading}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                      placeholder="Add a tag"
                    />
                    <button
                      onClick={addTag}
                      disabled={isLoading}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handlePostImageUpload(e.target.files)}
                      disabled={isLoading}
                      className="hidden"
                      id="post-image-upload"
                    />
                    <label
                      htmlFor="post-image-upload"
                      className={`flex flex-col items-center justify-center cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <FaImage className="text-gray-400 text-3xl mb-3" />
                      <span className="text-gray-600 mb-1">Click to upload images</span>
                      <span className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</span>
                    </label>
                  </div>

                  {/* Uploaded Images */}
                  {postData.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {postData.images.map((image) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.url || "/placeholder.svg"}
                            alt={image.name}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removePostImage(image.id)}
                            disabled={isLoading}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                disabled={isLoading}
                className="flex items-center justify-center gap-2 bg-gray-100 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <FaEye />
                Preview
              </button>
              <button
                onClick={handlePublish}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <FaSave />
                    {contentType === "training" ? "Publish Course" : "Publish Post"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateScreen
