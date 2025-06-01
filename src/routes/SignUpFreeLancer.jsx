"use client"

import { useState } from "react"
import { NavLink, useNavigate } from "react-router" // Fixed import
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { authAPI } from "../services/api"

import logo from "../assets/logo.jpg"
import group from "../assets/Group.png"

function SignUpFreelancer() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    skills: "",
    password: "",
    location: "",
    agreed: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: "", type: "" })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async () => {
    if (!formData.agreed) {
      setMessage({ text: "Please agree to the terms and conditions.", type: "error" })
      return
    }

    setLoading(true)
    setMessage({ text: "", type: "" })

    try {
      // Use our auth service instead of direct fetch
      const result = await authAPI.register({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        skills: formData.skills,
        password: formData.password,
        role: "freelancer",
        location: formData.location,
      })

      if (result.success) {
                localStorage.setItem("user", JSON.stringify(result.data))
                if (result.data.token) {
              localStorage.setItem("token", result.data.token);
            }
        setMessage({ text: "Signup successful!", type: "success" })
        navigate("/dashboard")

        // Reset form if needed
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          skills: "",
          password: "",
          location: "",
          agreed: false,
        })
      } else {
        setMessage({ text: result.message || result.error || "Signup failed.", type: "error" })
      }
    } catch (err) {
      setMessage({ text: err.message || "Something went wrong.", type: "error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="flex flex-row items-center px-6 md:px-16">
        <img src={logo || "/placeholder.svg"} className="w-[205px] h-[80px]" />
        <select className="ml-auto mr-4 py-1 px-3 border border-gray-300 rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-black">
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
          <option value="de">Deutsch</option>
        </select>
        <NavLink to="/login" className="py-1 px-3 bg-black text-white font-bold rounded-[8px]" end>
          Login
        </NavLink>
      </div>

      <div className="bg-main-500 flex flex-1 flex-row">
        <div className="hidden md:flex flex-1 flex-col pt-15 items-center text-center gap-[20px]">
          <span className="font-semibold text-4xl text-white ">Join Us Today</span>
          <span className="text-xl text-white mb-10 max-w-[400px]">
            Unlock thousands of freelance opportunities. Your next big project starts here.
          </span>
          <img src={group || "/placeholder.svg"} className="w-[300px] h-[300px]" />
        </div>

        <div className="flex-1 m-5 bg-white rounded-3xl py-6 px-8 md:px-16">
          <span className="font-semibold text-3xl text-lightdark-500">Sign up now</span>

          <div className="flex flex-col py-5 gap-4 md:flex-row">
            <div className="flex flex-1 flex-col gap-2.5">
              <span className="text-gray-500">First Name</span>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border border-gray-400 outline-none py-2 px-2 rounded-[12px]"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2.5">
              <span className="text-gray-500">Last Name</span>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border border-gray-400 outline-none py-2 px-2 rounded-[12px]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-1 flex-col gap-2.5">
              <span className="text-gray-500">Email Address</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-400 outline-none py-2 px-2 rounded-[12px]"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2.5">
              <span className="text-gray-500">Phone number</span>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border border-gray-400 outline-none py-2 px-2 rounded-[12px]"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2.5">
              <span className="text-gray-500">Skills</span>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="border border-gray-400 outline-none py-2 px-2 rounded-[12px]"
              />
            </div>

            {/* Location input */}
            <div className="flex flex-1 flex-col gap-2.5">
              <span className="text-gray-500">Location</span>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="border border-gray-400 outline-none py-2 px-2 rounded-[12px]"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2.5 relative">
              <div className="flex flex-row ">
                <span className="text-gray-500">Password</span>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-auto text-gray-500">
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
                <span className="text-gray-500 mx-2">{showPassword ? "Hide" : "See"}</span>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-400 outline-none py-2 px-2 rounded-[12px]"
              />
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label className="text-gray-600 text-sm">I agree to the terms and conditions</label>
            </div>

            {/* Message display */}
            {message.text && (
              <div
                className={`mt-4 text-center font-semibold ${
                  message.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Submit button with loader */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`mt-4 flex justify-center items-center bg-black text-white font-bold py-2 px-4 rounded-[8px] hover:bg-gray-800 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpFreelancer
