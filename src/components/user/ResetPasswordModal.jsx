"use client"

import { useState } from "react"
import { forgotPassword } from "../../api/user/userApi"

export default function ResetPasswordModal({ isOpen, onClose, resetLink,email }) {
    console.log('email',email);
    
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null) // For displaying messages to the user
  const [isError, setIsError] = useState(false) // To style messages differently

  if (!isOpen) return null 

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try {
        const response = await forgotPassword(email)

    } catch (error) {
        
    }
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-white text-center mb-6">Reset Password</h2>
        <p className="text-gray-300 text-center mb-6">
          Enter your email address below and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="reset-email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="reset-email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="you@example.com"
            />
          </div>
          {message && <p className={`text-center text-sm ${isError ? "text-red-400" : "text-green-400"}`}>{message}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  )
}
