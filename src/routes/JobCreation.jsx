"use client"

import { useState } from "react"
import { FaBriefcase, FaMapMarkerAlt, FaDollarSign, FaClipboardList } from "react-icons/fa"

export default function JobCreation() {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    salary: "",
    description: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setJobData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Send jobData to backend API
    console.log("Submitting job:", jobData)
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-10">
      {/* Header */}
      <div className="relative h-32 sm:h-40 lg:h-48 w-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg mb-16 sm:mb-20">
        <div className="absolute bottom-[-40px] sm:bottom-[-48px] lg:bottom-[-64px] left-6 lg:left-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Create a New Job</h1>
          <p className="text-sm sm:text-base">Post a job and attract top talent</p>
        </div>
      </div>

      {/* Job Creation Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 sm:p-8 max-w-3xl mx-auto w-full space-y-6"
      >
        {/* Job Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Job Title</label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaBriefcase className="text-gray-400 mr-2" />
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              className="w-full outline-none"
              placeholder="e.g. Senior Software Engineer"
              required
            />
          </div>
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Company</label>
          <input
            type="text"
            name="company"
            value={jobData.company}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Company Name"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Location</label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaMapMarkerAlt className="text-gray-400 mr-2" />
            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleChange}
              className="w-full outline-none"
              placeholder="e.g. New York, NY"
              required
            />
          </div>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Job Type</label>
          <select
            name="type"
            value={jobData.type}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
            <option>Remote</option>
          </select>
        </div>

        {/* Salary */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Salary (optional)</label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaDollarSign className="text-gray-400 mr-2" />
            <input
              type="text"
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              className="w-full outline-none"
              placeholder="e.g. 100000"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Job Description</label>
          <div className="flex items-start border rounded-lg px-3 py-2">
            <FaClipboardList className="text-gray-400 mt-1 mr-2" />
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleChange}
              rows={5}
              className="w-full outline-none resize-none"
              placeholder="Describe the responsibilities, requirements, and benefits"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  )
}
