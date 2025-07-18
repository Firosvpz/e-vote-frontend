import React, { useEffect, useState } from 'react'
import { updateElection } from '../../../api/admin/ElectionApi'

const EditElectionModal = ({ isOpen, onClose, onEditElection, election }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState(
        {
            title: "",
            description: "",
            electionType: "",
            startDate: "",
            endDate: "",
            status: "",
            priority: "medium",
            candidateIds: "",
        }
    )


    useEffect(() => {
        if (election) {
            setFormData(
                {
                    title: election.title || '',
                    description: election.description || '',
                    electionType: election.electionType || '',
                    startDate: election.startDate ? new Date(election.startDate).toISOString().split("T")[0] : '',
                    endDate: election.endDate ? new Date(election.endDate).toISOString().split("T")[0] : '',
                    status: election.status || '',
                    priority: election.priority || '',
                   candidateIds: election.candidates?.map(c => c.studentId).join(", ") || ""
                }
            )
        }
    }, [election])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            console.log("Raw formData:", formData);
            const payload = {
                ...formData,
                startDate: formData.startDate ? new Date(formData.startDate).toISOString() : "",
                endDate: formData.endDate ? new Date(formData.endDate).toISOString() : "",
                candidateIds: formData.candidateIds ? formData.candidateIds.split(",").map((id) => id.trim()) : [],
            }

            const response = await updateElection(election._id, payload)
            onEditElection(response.data)
            onClose()

        } catch (error) {
            const backendMessage = error?.response?.data?.message;
            const backendField = error?.response?.data?.field;


            if (backendField && backendMessage) {
                setErrors((prev) => ({
                    ...prev,
                    [backendField]: backendMessage,
                }));
            } else if (backendMessage) {
                // General error
                setErrors((prev) => ({
                    ...prev,
                    api: backendMessage,
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    api: "Something went wrong. Please try again.",
                }));
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-3xl bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white"> Update Election Details</h2>
                    <button
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
                        aria-label="Close modal"
                    >
                        <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="title" className="block text-white/80 text-sm font-medium mb-2">
                                Election Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                placeholder="Enter election title..."
                                required
                            />
                            {errors?.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
                        </div>
                        <div>
                            <label htmlFor="electionType" className="block text-white/80 text-sm font-medium mb-2">
                                Election Type
                            </label>
                            <select
                                id="electionType"
                                name="electionType"
                                value={formData.electionType}
                                onChange={handleChange}
                                className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                required
                            >
                                <option className="bg-purple-900/95" value="">Select type...</option>
                                <option className="bg-purple-900/95" value="Department">Department</option>
                                <option className="bg-purple-900/95" value="Year">Year</option>
                                <option className="bg-purple-900/95" value="General">General</option>
                            </select>
                            {errors?.electionType && <p className="text-red-400 text-xs mt-1">{errors.electionType}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-white/80 text-sm font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={1}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="Describe the election purpose and details..."
                            required
                        />
                        {errors?.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="startDate" className="block text-white/80 text-sm font-medium mb-2">
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                required
                            />
                            {errors?.startDate && <p className="text-red-400 text-xs mt-1">{errors.startDate}</p>}
                        </div>
                        <div>
                            <label htmlFor="endDate" className="block text-white/80 text-sm font-medium mb-2">
                                End Date
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                required
                            />
                            {errors?.endDate && <p className="text-red-400 text-xs mt-1">{errors.endDate}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="priority" className="block text-white/80 text-sm font-medium mb-2">
                                Priority
                            </label>
                            <select
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <option className="bg-purple-900/95" value="low">Low</option>
                                <option className="bg-purple-900/95" value="medium">Medium</option>
                                <option className="bg-purple-900/95" value="high">High</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-white/80 text-sm font-medium mb-2">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                required
                            >

                                <option className="bg-purple-900/95" value="Scheduled">Scheduled</option>
                                <option className="bg-purple-900/95" value="Cancelled">Cancelled</option>

                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="candidateIds" className="block text-white/80 text-sm font-medium mb-2">
                            Candidate IDs (comma-separated)
                        </label>
                        <input
                            type="text"
                            id="candidateIds"
                            name="candidateIds"
                            value={formData.candidateIds}
                            onChange={handleChange}
                            className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="e.g., id1, id2, id3"
                        />
                    </div>

                    {errors?.candidateIds && <p className="text-red-400 text-sm mt-2">{errors.candidateIds}</p>}
                    <div className="flex justify-end space-x-4 pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors"
                            disabled={isSubmitting}
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
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span>Save Changes</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditElectionModal