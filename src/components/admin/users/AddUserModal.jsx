"use client"

import { useState } from "react"
import { addUser } from "../../../api/admin/AdminApi"
import { toast } from "react-toastify";

export default function AddUserModal({ isOpen, onClose, onAddUser }) {
    const [formData, setFormData] = useState({
        studentId: "",
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        department: "",
        academicLevel: "",
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const departments = [
        "BBA",
        "BCA",
        "BCOM",
        "BSC",
        "BA"
    ]

    const academicLevels = ["First Year", "Second Year", "Third Year", "Fourth Year"]

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.studentId.trim()) {
            newErrors.studentId = "Student ID is required"
        } else if (!/^[A-Z]{2}\d{2}$/.test(formData.studentId)) {
            newErrors.studentId = "Student ID must be in format AZ01"
        }

        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address"
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required"
        } else if (!/^\+?[\d\s\-$$$$]{10,}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Please enter a valid phone number"
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 4) {
            newErrors.password = "Password must be at least 4 characters"
        }

        if (!formData.department) {
            newErrors.department = "Department is required"
        }

        if (!formData.academicLevel) {
            newErrors.academicLevel = "Academic level is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

   const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
        const response = await addUser(formData)
        // console.log("User added successfully:", response);
        
        onAddUser(response.newUser)

        // Reset form
        setFormData({
            studentId: "",
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
            department: "",
            academicLevel: "",
        })

        onClose()
    } catch (error) {
        console.error("Error adding user:", error)
        if (error.response?.data?.msg) {
            toast.error(error.response.data.msg, {
                style: {
                    background: 'transparent',
                    backdropFilter: 'blur(10px)',
                    color: '#ffffff',
                    borderRadius: '12px',
                    padding: '16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    fontWeight: 500,
                    border: '1px solid #333333',
                },
                icon: '⚠️',
            })
        } else {
            toast.error("Failed to add user. Please try again.")
        }
    } finally {
        setIsSubmitting(false) // 💡 Ensure loader is stopped on both success and error
    }
}


    const handleClose = () => {
        if (!isSubmitting) {
            setFormData({
                studentId: "",
                name: "",
                email: "",
                phoneNumber: "",
                password: "",
                department: "",
                academicLevel: "",
            })
            setErrors({})
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className=" bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-md border border-white/20 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-white/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Add New User</h2>
                                <p className="text-emerald-300">Create a new student account</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            disabled={isSubmitting}
                            className="text-white/70 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-50"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Student ID and Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="studentId" className="block text-white font-medium mb-2">
                                Student ID *
                            </label>
                            <input
                                type="text"
                                id="studentId"
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleInputChange}
                                placeholder=" AZ01"
                                className={`w-full bg-white/10 border ${errors.studentId ? "border-red-500" : "border-white/20"
                                    } text-white placeholder-white/50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors`}
                            />
                            {errors.studentId && <p className="text-red-400 text-sm mt-1">{errors.studentId}</p>}
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-white font-medium mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="user name"
                                className={`w-full bg-white/10 border ${errors.name ? "border-red-500" : "border-white/20"
                                    } text-white placeholder-white/50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors`}
                            />
                            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                        </div>
                    </div>

                    {/* Email and Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="email" className="block text-white font-medium mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="user@gmail.com"
                                className={`w-full bg-white/10 border ${errors.email ? "border-red-500" : "border-white/20"
                                    } text-white placeholder-white/50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors`}
                            />
                            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="block text-white font-medium mb-2">
                                Phone Number *
                            </label>
                            <input
                                type="string"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="12345 67890"
                                className={`w-full bg-white/10 border ${errors.phoneNumber ? "border-red-500" : "border-white/20"
                                    } text-white placeholder-white/50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors`}
                            />
                            {errors.phoneNumber && <p className="text-red-400 text-sm mt-1">{errors.phoneNumber}</p>}
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-white font-medium mb-2">
                            Password *
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter secure password"
                            className={`w-full bg-white/10 border ${errors.password ? "border-red-500" : "border-white/20"
                                } text-white placeholder-white/50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors`}
                        />
                        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                        <p className="text-white/60 text-sm mt-1">Password must be at least 4 characters long</p>
                    </div>

                    {/* Department and Academic Level */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="department" className="block text-white font-medium mb-2">
                                Department *
                            </label>
                            <select
                                id="department"
                                name="department"
                                value={formData.department}
                                onChange={handleInputChange}
                                className={`w-full bg-white/10 border ${errors.department ? "border-red-500" : "border-white/20"
                                    } text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors`}
                            >
                                <option  className="bg-purple-900/95" value="">Select Department</option>
                                {departments.map((dept) => (
                                    <option key={dept} value={dept} className="bg-purple-900/95">
                                        {dept}
                                    </option>
                                ))}
                            </select>
                            {errors.department && <p className="text-red-400 text-sm mt-1">{errors.department}</p>}
                        </div>
                        <div>
                            <label htmlFor="academicLevel" className="block text-white font-medium mb-2">
                                Academic Year *
                            </label>
                            <select
                                id="academicLevel"
                                name="academicLevel"
                                value={formData.academicLevel}
                                onChange={handleInputChange}
                                className={`w-full bg-white/10 border ${errors.academicLevel ? "border-red-500" : "border-white/20"
                                    } text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors`}
                            >
                                <option  className="bg-purple-900/95" value="">Select Year</option>
                                {academicLevels.map((level) => (
                                    <option key={level} value={level} className="bg-purple-900/95">
                                        {level}
                                    </option>
                                ))}
                            </select>
                            {errors.academicLevel && <p className="text-red-400 text-sm mt-1">{errors.academicLevel}</p>}
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-4 pt-6 border-t border-white/20">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl font-medium shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center space-x-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        />
                                    </svg>
                                    <span>Adding User...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span>Add User</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
