"use client"
import { X, User, Mail, Phone, Building, GraduationCap, CheckCircle, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { userProfile } from "../../api/user/userApi"

export default function UserProfileModal({ isOpen, onClose }) {
  const [user, setUser] = useState([])
  const userData = JSON.parse(localStorage.getItem("userData"))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userProfile(userData.id)
        setUser(response.data)
      } catch (error) {
        console.error("error occurred while user profile")
      }
    }
    if (isOpen && userData?.id) {
      fetchData()
    }
  }, [isOpen, userData?.id])

  if (!isOpen) return null

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 border border-gray-700 rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-2xl p-6 sm:p-8 relative transform transition-all duration-300 scale-100 opacity-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white text-4xl sm:text-5xl font-bold mb-4 shadow-lg">
            {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-10 h-10 sm:w-12 sm:h-12" />}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1 sm:mb-2">{user?.name || "User Name"}</h2>
          <p className="text-purple-300 text-base sm:text-lg">{user?.studentId || "N/A"}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-base sm:text-lg">
          <div className="flex items-center space-x-3 bg-white/10 p-3 sm:p-4 rounded-xl">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
            <div>
              <p className="text-gray-300 text-xs sm:text-sm">Email</p>
              <p className="text-white font-medium break-all">{user?.email || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 p-3 sm:p-4 rounded-xl">
            <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
            <div>
              <p className="text-gray-300 text-xs sm:text-sm">Phone Number</p>
              <p className="text-white font-medium">{user?.phoneNumber || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 p-3 sm:p-4 rounded-xl">
            <Building className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
            <div>
              <p className="text-gray-300 text-xs sm:text-sm">Department</p>
              <p className="text-white font-medium">{user?.department || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 p-3 sm:p-4 rounded-xl">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
            <div>
              <p className="text-gray-300 text-xs sm:text-sm">Academic Level</p>
              <p className="text-white font-medium">{user?.academicLevel || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 p-3 sm:p-4 rounded-xl">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
            <div>
              <p className="text-gray-300 text-xs sm:text-sm">Verification Status</p>
              <p className="text-white font-medium">{user?.isVerified ? "Verified" : "Not Verified"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 p-3 sm:p-4 rounded-xl">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            <div>
              <p className="text-gray-300 text-xs sm:text-sm">Joined At</p>
              <p className="text-white font-medium">{formatDate(user?.joinedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
