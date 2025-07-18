import React, { useState } from 'react'
import { toast } from "react-toastify";
import { addCandidate } from '../../../api/admin/AdminApi';
const AddCandidateModal = ({ isOpen, onClose, onAddCandidate }) => {
    const [formData, setFormData] = useState(
        {
            studentId: "",
            position: ""
        }
    )
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const positions = ['Department Representative', 'Year Representative', 'General Representative'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.studentId.trim()) newErrors.studentId = "Student ID is required";
        if (!formData.position) newErrors.position = "Position is required";


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const response = await addCandidate(formData);
            onAddCandidate(response.data)
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
            // Reset form
            setFormData({
                studentId: "",
                position: ""
            })
            onClose();
        } catch (error) {
            setErrors({ submit: "Failed to add candidate. Please try again." });
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
            setIsSubmitting(false);
        }
    };
    const handleClose = () => {
        if (!isSubmitting) {
            setFormData({
                studentId: "",
                position: "",
            })
            setErrors({})
            onClose()
        }
    }

    if (!isOpen) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
            <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Add New Candidate</h2>
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

                {errors.submit && (
                    <div className="mb-4 p-3 bg-red-500/20 text-red-200 rounded-lg">
                        {errors.submit}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">Student ID</label>
                            <input
                                type="text"
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleChange}
                                className={`w-full bg-white/10 border ${errors.studentId ? 'border-red-500' : 'border-white/20'} text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-white/50`}
                                placeholder="Enter student ID..."
                            />
                            {errors.studentId && <p className="mt-1 text-sm text-red-400">{errors.studentId}</p>}
                        </div>
                    </div>



                    <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">Position</label>
                        <select
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            className={`w-full bg-white/10 border ${errors.position ? 'border-red-500' : 'border-white/20'} text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        >
                            <option value="" className="bg-slate-800">Select position...</option>
                            {positions.map(pos => (
                                <option key={pos} value={pos} className="bg-slate-800">
                                    {pos}
                                </option>
                            ))}
                        </select>
                        {errors.position && <p className="mt-1 text-sm text-red-400">{errors.position}</p>}
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
                            {isSubmitting ? 'Adding...' : 'Add Candidate'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCandidateModal