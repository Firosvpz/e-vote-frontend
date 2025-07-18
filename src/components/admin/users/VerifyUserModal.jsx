"use client"

import { useState } from "react"
import { verifyUser } from "../../../api/admin/AdminApi"


export default function VerifyUserModal({ isOpen, onClose, user, onVerifyUser }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    
    const handleVerification = async (action) => {
        if (!user) return

        setIsSubmitting(true)
        setError("")

        try {
            // Call the API     
            const response = await verifyUser(user._id)
            
            onVerifyUser(response.user)
            onClose()
        } catch (error) {
            setError("Failed to update verification status. Please try again.")
            console.error("Verification error:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    
  
    if (!isOpen || !user) return null

    return (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-md border border-white/20 rounded-3xl w-full max-w-2xl overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-white/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">
                                    {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">User Verification</h2>
                                <p className="text-emerald-300">Review and verify user account</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="text-white/70 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-50"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">


                    {/* User Details */}
                    <div className=" rounded-2xl p-6 mb-6 ">
                        <h3 className="text-lg font-bold text-white mb-4">User Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h4 className="text-white font-medium text-sm uppercase tracking-wide opacity-70">
                                    Personal Information
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                                        <span className="text-white/70">Full Name:</span>
                                        <span className="text-white font-medium">{user.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                                        <span className="text-white/70">Email:</span>
                                        <span className="text-white font-medium">{user.email}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                                        <span className="text-white/70">Phone:</span>
                                        <span className="text-white font-medium">{user.phoneNumber || "Not provided"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Academic Information */}
                            <div className="space-y-4">
                                <h4 className="text-white font-medium text-sm uppercase tracking-wide opacity-70">
                                    Academic Information
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                                        <span className="text-white/70">Student ID:</span>
                                        <span className="text-white font-mono font-medium">{user.studentId}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                                        <span className="text-white/70">Department:</span>
                                        <span className="text-white font-medium">{user.department || user.major}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                                        <span className="text-white/70">Academic Level:</span>
                                        <span className="text-white font-medium">{user.academicLevel || user.year}</span>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="mt-4 text-center">
                            <span className="text-white/60 text-sm">
                                Joined:{" "}
                                <span className="text-white font-medium">
                                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </span>
                            </span>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-6">
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="text-red-300 font-medium">{error}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-white/20">
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>

                      

                        <button
                            onClick={() => handleVerification("approve")}
                            disabled={isSubmitting || user.isVerified}
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
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Approve</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
