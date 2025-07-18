"use client"

import { useState, useEffect } from "react"
import { forgotPassword, loginUser, registerUser } from "../../api/user/userApi"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { login } from "../../redux/slices/authSlices";



const LoginUser = ({ isOpen, onClose }) => {
    const dispatch = useDispatch()
    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        // Login fields
        studentId: "",
        email: "",
        password: "",
        // Registration fields
        name: "",
        phoneNumber: "",
        confirmPassword: "",
        department: "",
        academicLevel: "",
        rememberMe: false,
    })
    const [errors, setErrors] = useState({})
    const [apiError, setApiError] = useState("") // State to hold API errors
    const [mounted, setMounted] = useState(false)
   


 

    useEffect(() => {
        setMounted(true)
    }, [])

    const departments = ["BBA", "BCA", "BCOM", "BSC", "BA"]
    const academicLevels = ["First Year", "Second Year", "Third Year", "Fourth Year"]

    // Handle escape key press
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose()
            }
        }
        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
            // Prevent body scroll when modal is open
            document.body.style.overflow = "hidden"
        }
        return () => {
            document.removeEventListener("keydown", handleEscape)
            document.body.style.overflow = "unset"
        }
    }, [isOpen, onClose])

    const validateStudentId = (studentId) => {
        const studentIdRegex = /^[A-Z]{2}\d{2}$/ // Corrected regex: starts with 2 uppercase letters, followed by 2 digits
        return studentIdRegex.test(studentId)
    }
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }
    const validatePassword = (password) => {
        return password.length >= 8
    }
    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^[0-9]{10,15}$/
        return phoneRegex.test(phone)
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
        }
        setApiError("") // Clear API error on input change
    }

    const validateForm = () => {
        const newErrors = {}
        if (isLogin) {
            // Login validation
            if (!formData.studentId) {
                newErrors.studentId = "Student ID is required"
            } else if (!validateStudentId(formData.studentId)) {
                newErrors.studentId = "Invalid Format (e.g., AZ01)"
            }
            if (!formData.email) {
                newErrors.email = "Email is required"
            } else if (!validateEmail(formData.email)) {
                newErrors.email = "Please enter a valid email"
            }
            if (!formData.password) {
                newErrors.password = "Password is required"
            }
        } else {
            // Registration validation
            if (!formData.studentId) {
                newErrors.studentId = "Student ID is required"
            } else if (!validateStudentId(formData.studentId)) {
                newErrors.studentId = "Invalid Format (e.g., AZ01)"
            }
            if (!formData.name) {
                newErrors.name = "Name is required"
            }
            if (!formData.email) {
                newErrors.email = "Email is required"
            } else if (!validateEmail(formData.email)) {
                newErrors.email = "Please enter a valid email"
            }
            if (!formData.phoneNumber) {
                newErrors.phoneNumber = "Phone number is required"
            } else if (!validatePhoneNumber(formData.phoneNumber)) {
                newErrors.phoneNumber = "Please enter a valid phone number (10-15 digits)"
            }
            if (!formData.password) {
                newErrors.password = "Password is required"
            } else if (!validatePassword(formData.password)) {
                newErrors.password = "Password must be at least 8 characters"
            }
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = "Please confirm your password"
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match"
            }
            if (!formData.department) {
                newErrors.department = "Department is required"
            }
            if (!formData.academicLevel) {
                newErrors.academicLevel = "Academic level is required"
            }
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setApiError("") // Clear previous API errors
        if (!validateForm()) return

        setIsLoading(true)
        try {
            if (isLogin) {
                const loginData = {
                    studentId: formData.studentId,
                    email: formData.email,
                    password: formData.password,
                }
                const response = await loginUser(loginData)
                console.log("Login successful:", response)
                dispatch(login({ user: response.data, token: response?.data?.token })) // Dispatch login action with user data/token
                toast.success(response.msg, {
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

                onClose() // Close modal on successful login

            } else {
                const registerData = {
                    studentId: formData.studentId,
                    name: formData.name,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    password: formData.password,
                    department: formData.department,
                    academicLevel: formData.academicLevel,
                }
                const response = await registerUser(registerData)
                console.log("Registration successful:", response)
                toast.success(response.msg, {
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

                toggleMode()
            }
        } catch (error) {
            console.log(error.response);

            console.error("Authentication error:", error)
            // Handle API errors
            if (error.response && error.response.data.msg) {
                setApiError(error.response.data.msg)
            } else {
                setApiError("An unexpected error occurred. Please try again.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    const toggleMode = () => {
        setIsLogin(!isLogin)
        setErrors({})
        setApiError("") // Clear API error when toggling mode
        setFormData({
            studentId: "",
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            department: "",
            academicLevel: "",
            rememberMe: false,
        })
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!mounted || !isOpen) {
        return null
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div
                style={{
                    scrollbarWidth: "none", // Firefox
                    msOverflowStyle: "none", // IE and Edge
                }}
                className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900/95 to-purple-700/95 backdrop-blur-md rounded-3xl shadow-2xl transform transition-all duration-300 scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {/* Header */}
                <div className="text-center pt-8 pb-6 px-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">{isLogin ? "Welcome back" : "Create account"}</h1>
                    <p className="text-gray-300 text-sm">{isLogin ? "Sign in to your account" : "Sign up to get started"}</p>
                </div>
                {/* Toggle Tabs */}
                <div className="flex bg-transparent mx-8 rounded-xl mb-6 gap-3">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-3 px-4 text-sm font-semibold transition-all duration-300 rounded-xl border ${isLogin
                            ? "bg-white text-indigo-600 border-white shadow-lg"
                            : "text-gray-200 border-gray-400 hover:text-white hover:border-gray-300"
                            }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-3 px-4 text-sm font-semibold transition-all duration-300 rounded-xl border ${!isLogin
                            ? "bg-white text-indigo-600 border-white shadow-lg"
                            : "text-gray-200 border-gray-400 hover:text-white hover:border-gray-300"
                            }`}
                    >
                        Sign Up
                    </button>
                </div>
                {/* Form Container */}
                <div className="px-8 pb-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {apiError && <p className="text-center text-red-300 text-sm">{apiError}</p>}
                        {/* Student ID Field - Always visible */}
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1">Student ID</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="studentId"
                                    value={formData.studentId}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2.5 pl-10 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm bg-white/10 text-white placeholder-gray-400 ${errors.studentId ? "border-red-400 bg-red-500/20" : "border-gray-500 hover:border-gray-400"
                                        }`}
                                    placeholder="AZ01"
                                />
                                <svg
                                    className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                    />
                                </svg>
                            </div>
                            {errors.studentId && <p className="mt-1 text-xs text-red-300">{errors.studentId}</p>}
                        </div>
                        {/* Name Field (Registration only) */}
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Full Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2.5 pl-10 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm bg-white/10 text-white placeholder-gray-400 ${errors.name ? "border-red-400 bg-red-500/20" : "border-gray-500 hover:border-gray-400"
                                            }`}
                                        placeholder="John Doe"
                                    />
                                    <svg
                                        className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                {errors.name && <p className="mt-1 text-xs text-red-300">{errors.name}</p>}
                            </div>
                        )}
                        {/* Email Field - Always visible */}
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2.5 pl-10 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm bg-white/10 text-white placeholder-gray-400 ${errors.email ? "border-red-400 bg-red-500/20" : "border-gray-500 hover:border-gray-400"
                                        }`}
                                    placeholder="john@example.com"
                                />
                                <svg
                                    className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 12a4 4 0 10-8 0 4 4 0 018 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                            </div>
                            {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
                        </div>
                        {/* Phone Number Field (Registration only) */}
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Phone Number</label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2.5 pl-10 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm bg-white/10 text-white placeholder-gray-400 ${errors.phoneNumber ? "border-red-400 bg-red-500/20" : "border-gray-500 hover:border-gray-400"
                                            }`}
                                        placeholder="1234567890"
                                    />
                                    <svg
                                        className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                </div>
                                {errors.phoneNumber && <p className="mt-1 text-xs text-red-300">{errors.phoneNumber}</p>}
                            </div>
                        )}
                        {/* Department Field (Registration only) */}
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Department</label>
                                <div className="relative">
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2.5 pl-10 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm bg-white/10 text-white ${errors.department ? "border-red-400 bg-red-500/20" : "border-gray-500 hover:border-gray-400"
                                            }`}
                                    >
                                        <option className="bg-purple-900/95" value="">
                                            Select Department
                                        </option>
                                        {departments.map((dept) => (
                                            <option key={dept} value={dept} className="bg-purple-900/95">
                                                {dept}
                                            </option>
                                        ))}
                                    </select>
                                    <svg
                                        className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                </div>
                                {errors.department && <p className="mt-1 text-xs text-red-300">{errors.department}</p>}
                            </div>
                        )}
                        {/* Academic Level Field (Registration only) */}
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Academic Level</label>
                                <div className="relative">
                                    <select
                                        name="academicLevel"
                                        value={formData.academicLevel}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2.5 pl-10 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm bg-white/10 text-white ${errors.academicLevel ? "border-red-400 bg-red-500/20" : "border-gray-500 hover:border-gray-400"
                                            }`}
                                    >
                                        <option className="bg-purple-900/95" value="">
                                            Select Year
                                        </option>
                                        {academicLevels.map((level) => (
                                            <option key={level} value={level} className="bg-purple-900/95">
                                                {level}
                                            </option>
                                        ))}
                                    </select>
                                    <svg
                                        className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                </div>
                                {errors.academicLevel && <p className="mt-1 text-xs text-red-300">{errors.academicLevel}</p>}
                            </div>
                        )}
                        {/* Password Field - Always visible */}
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2.5 pl-10 pr-10 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm bg-white/10 text-white placeholder-gray-400 ${errors.password ? "border-red-400 bg-red-500/20" : "border-gray-500 hover:border-gray-400"
                                        }`}
                                    placeholder="••••••••"
                                />
                                <svg
                                    className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-200 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                            />
                                        </svg>
                                    ) : (
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1 text-xs text-red-300">{errors.password}</p>}
                        </div>
                        {/* Confirm Password (Registration only) */}
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2.5 pl-10 pr-10 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm bg-white/10 text-white placeholder-gray-400 ${errors.confirmPassword ? "border-red-400 bg-red-500/20" : "border-gray-500 hover:border-gray-400"
                                            }`}
                                        placeholder="••••••••"
                                    />
                                    <svg
                                        className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-200 transition-colors"
                                    >
                                        {showConfirmPassword ? (
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                                />
                                            </svg>
                                        ) : (
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="mt-1 text-xs text-red-300">{errors.confirmPassword}</p>}
                            </div>
                        )}
                      
                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    {isLogin ? "Signing in..." : "Creating account..."}
                                </div>
                            ) : isLogin ? (
                                "Sign In"
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>
                    {/* Footer */}
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-300">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button onClick={toggleMode} className="text-indigo-300 hover:text-indigo-200 font-medium">
                                {isLogin ? "Sign up" : "Sign in"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LoginUser
