"use client"

import { useState } from "react"
import { useNavigate, NavLink } from "react-router" // Fixed import
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { authAPI } from "../services/api"

import logo from "../assets/logo.jpg"
import group from "../assets/Group.png"

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: "", type: "" })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setMessage({ text: "", type: "" })

    try {
      console.log(formData)
      // Use our auth service instead of direct fetch
      const result = await authAPI.login(formData)

      if (result.success) {
        localStorage.setItem("user", JSON.stringify(result.data))
        setMessage({ text: "Login successful!", type: "success" })
        navigate("/dashboard")
      } else {
        setMessage({ text: result.message || "Login failed.", type: "error" })
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
        <img src={logo || "/placeholder.svg"} alt="Logo" className="w-[205px] h-[80px]" />
        <select className="ml-auto mr-4 py-1 px-3 border border-gray-300 rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-black">
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
          <option value="de">Deutsch</option>
        </select>
        <NavLink to="/signupselection" className="py-1 px-3 bg-black text-white font-bold rounded-[8px]" end>
          Sign Up
        </NavLink>
      </div>

      <div className="bg-main-500 flex flex-1 flex-row">
        <div className="flex-1 m-5 bg-white rounded-3xl py-6 px-8 md:px-16">
          <h2 className="text-3xl font-semibold mb-6 text-lightdark-500">Login</h2>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-gray-500">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-400 outline-none py-2 px-2 rounded-[12px]"
              />
            </div>

            <div className="flex flex-col gap-2 relative">
              <div className="flex items-center justify-between">
                <label className="text-gray-500">Password</label>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500">
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-400 outline-none py-2 px-2 rounded-[12px]"
              />
            </div>

            {message.text && (
              <div
                className={`mt-2 text-center font-semibold ${
                  message.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`mt-4 bg-black text-white font-bold py-2 px-4 rounded-[8px] hover:bg-gray-800 ${
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
                "Login"
              )}
            </button>
          </div>
        </div>
        <div className="hidden md:flex flex-1 flex-col pt-15 items-center text-center gap-[20px]">
          <span className="font-semibold text-4xl text-white ">Join Us Today</span>
          <span className="text-xl text-white mb-10 max-w-[400px]">
            Connect with skilled freelancers and grow your business faster.
          </span>
          <img src={group || "/placeholder.svg"} className="w-[300px] h-[300px]" />
        </div>
      </div>
    </div>
  )
}

export default Login
