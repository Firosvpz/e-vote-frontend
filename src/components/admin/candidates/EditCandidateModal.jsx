import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import { updateCandidate } from '../../../api/admin/AdminApi';

const EditCandidateModal = ({ isOpen, onClose, candidate, onEditCandidate }) => {
    const [isSubmitting, setIsSubmiting] = useState(false)
    const [error, setError] = useState({})
    const [formData, setFormData] = useState(
        {
            studentId: "",
            position: ""
        }
    )
    useEffect(() => {
        if (candidate) {
            setFormData(
                {
                    studentId: candidate.studentId || '',
                    position: candidate.position || ''
                }
            )
        }
    }, [candidate])

    const positions = ["Department Representative", "Year Representative", "General Representative"]
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {}
        if (!formData.studentId.trim()) newErrors.studentId = "Student ID is required";
        if (!formData.position) newErrors.position = "Position is required";

        setError(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm) return;
        setIsSubmiting(true)
        try {

            const response = await updateCandidate(candidate._id, formData)
            onEditCandidate(response.data)
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
            onClose()
        } catch (error) {
            setError({ submit: "failed to update candidate, please try aggain later" })
        } finally {
            setIsSubmiting(false)
        }
    }
    const handleClose = () => {
        if (!isSubmitting) {
            setFormData({
                studentId: "",
                position: "",
            })
            setError({})
            onClose()
        }
    }

    if (!isOpen || !candidate) return null


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
            <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Update Candidate Position</h2>
                    <button
                        onClick={handleClose}
                        className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
                        disabled={isSubmitting}
                    >
                        <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {error.submit && (
                    <div className="mb-4 p-3 bg-red-500/20 text-red-200 rounded-lg">
                        {error.submit}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">Student ID*</label>
                            <input
                                type="text"
                                name="studentId"
                                value={formData.studentId}
                                disabled
                                readOnly
                                className={`w-full bg-white/10 border ${error.studentId ? 'border-red-500' : 'border-white/20'} text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-white/50`}
                                placeholder="Enter student ID..."
                            />
                            {error.studentId && <p className="mt-1 text-sm text-red-400">{error.studentId}</p>}
                        </div>
                    </div>



                    <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">Position</label>
                        <select
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            className={`w-full bg-white/10 border ${error.position ? 'border-red-500' : 'border-white/20'} text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        >
                            <option value="" className="bg-slate-800">Select position...</option>
                            {positions.map(pos => (
                                <option key={pos} value={pos} className="bg-slate-800">
                                    {pos}
                                </option>
                            ))}
                        </select>
                        {error.position && <p className="mt-1 text-sm text-red-400">{error.position}</p>}
                    </div>



                    <div className="flex justify-end space-x-4 pt-6">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-70 disabled:transform-none"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'saving...' : 'Saving Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditCandidateModal