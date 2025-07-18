"use client"

import { useState } from "react"
import { pollVote } from "../../api/user/userApi"
import { toast } from "react-toastify";


const VoteModal = ({ isOpen, onClose, election }) => {
  const [selectedCandidate, setSelectedCandidate] = useState("")
  const [hasVoted, setHasVoted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recieptId,setRecieptId]=useState(null)
  

  // Ensure election and candidates are available
  const candidates = election?.candidates || []

  // Predefined colors to cycle through for candidate cards
  const predefinedColors = ["cyan", "emerald", "purple", "orange", "pink", "blue"]

  const getColorClasses = (index, isSelected = false) => {
    const colorKey = predefinedColors[index % predefinedColors.length]
    const colors = {
      cyan: {
        border: isSelected ? "border-cyan-400/60" : "border-cyan-500/30",
        bg: isSelected ? "from-cyan-500/30 to-blue-600/30" : "from-cyan-500/20 to-blue-600/20",
        avatar: "from-cyan-400 to-blue-500",
        button: "from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
        shadow: isSelected ? "shadow-cyan-500/20" : "",
      },
      emerald: {
        border: isSelected ? "border-emerald-400/60" : "border-emerald-500/30",
        bg: isSelected ? "from-emerald-500/30 to-green-600/30" : "from-emerald-500/20 to-green-600/20",
        avatar: "from-emerald-400 to-green-500",
        button: "from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
        shadow: isSelected ? "shadow-emerald-500/20" : "",
      },
      purple: {
        border: isSelected ? "border-purple-400/60" : "border-purple-500/30",
        bg: isSelected ? "from-purple-500/30 to-pink-600/30" : "from-purple-500/20 to-pink-600/20",
        avatar: "from-purple-400 to-pink-500",
        button: "from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700",
        shadow: isSelected ? "shadow-purple-500/20" : "",
      },
      orange: {
        border: isSelected ? "border-orange-400/60" : "border-orange-500/30",
        bg: isSelected ? "from-orange-500/30 to-red-600/30" : "from-orange-500/20 to-red-600/20",
        avatar: "from-orange-400 to-red-500",
        button: "from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700",
        shadow: isSelected ? "shadow-orange-500/20" : "",
      },
      pink: {
        border: isSelected ? "border-pink-400/60" : "border-pink-500/30",
        bg: isSelected ? "from-pink-500/30 to-rose-600/30" : "from-pink-500/20 to-rose-600/20",
        avatar: "from-pink-400 to-rose-500",
        button: "from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700",
        shadow: isSelected ? "shadow-pink-500/20" : "",
      },
      blue: {
        border: isSelected ? "border-blue-400/60" : "border-blue-500/30",
        bg: isSelected ? "from-blue-500/30 to-indigo-600/30" : "from-blue-500/20 to-indigo-600/20",
        avatar: "from-blue-400 to-indigo-500",
        button: "from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700",
        shadow: isSelected ? "shadow-blue-500/20" : "",
      },
    }
    return colors[colorKey] || colors.cyan
  }

  // Helper to format dates
  const formatDisplayDate = (isoString) => {
    if (!isoString) return "N/A"
    const date = new Date(isoString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleVote = async () => {
    if (!selectedCandidate) return
    const token = localStorage.getItem('authToken')
    console.log('token',token);
    
    if (!token) {
        toast.error("user must be login before voting", {
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
    }

    setIsSubmitting(true)
    try {
      // Simulate API call
      const response = await pollVote(election._id, selectedCandidate)
      setHasVoted(response.candidate)
      setRecieptId(response.receiptId)
      setIsSubmitting(false)
      // Auto close after 3 seconds
      setTimeout(() => {
        handleClose()
      }, 4000)
    } catch (error) {
      console.log('response error', error.response.data.message);

      toast.error(error.response?.data?.message, {
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
      setTimeout(() => {
        handleClose()
      }, 2000)

    }
  }


  const handleClose = () => {
    setSelectedCandidate("")
    setHasVoted(false)
    setIsSubmitting(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border-b border-white/20 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black text-white mb-2">Cast Your Vote</h2>
              <p className="text-white/70">{election?.title || "Election"}</p>
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors group"
            >
              <svg
                className="w-5 h-5 text-white/70 group-hover:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        {/* Content */}
        <div className="p-6">
          {!hasVoted ? (
            <>
              {/* Instructions */}
              <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Voting Instructions</h3>
                    <p className="text-white/70 text-sm">
                      Select one candidate below and click "Submit Vote" to cast your ballot. Your vote is anonymous and
                      secure.
                    </p>
                  </div>
                </div>
              </div>
              {/* Candidates */}
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Select Your Candidate</h3>
                {candidates.length > 0 ? (
                  candidates.map((candidate, index) => {
                    const isSelected = selectedCandidate === candidate._id
                    const colorClasses = getColorClasses(index, isSelected) // Pass index for color assignment
                    return (
                      <div
                        key={candidate._id} // Use _id for key
                        className={`group cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${isSelected ? "scale-[1.02]" : ""
                          }`}
                        onClick={() => setSelectedCandidate(candidate._id)} // Use _id for selection
                      >
                        <div
                          className={`bg-gradient-to-br ${colorClasses.bg} backdrop-blur-md p-6 rounded-2xl border ${colorClasses.border} hover:border-opacity-80 transition-all duration-300 ${colorClasses.shadow} ${isSelected ? "shadow-2xl" : "hover:shadow-xl"
                            }`}
                        >
                          <div className="flex items-start space-x-4">
                            {/* Radio Button */}
                            <div className="flex-shrink-0 mt-1">
                              <div
                                className={`w-6 h-6 rounded-full border-2 ${isSelected ? "border-white bg-white" : "border-white/40"
                                  } flex items-center justify-center transition-all duration-200`}
                              >
                                {isSelected && (
                                  <div className="w-3 h-3 bg-gradient-to-r from-slate-700 to-slate-800 rounded-full"></div>
                                )}
                              </div>
                            </div>
                            {/* Avatar */}
                            <div
                              className={`w-16 h-16 bg-gradient-to-r ${colorClasses.avatar} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                            >
                              <span className="text-white font-bold text-xl">
                                {candidate.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            {/* Candidate Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="text-xl font-bold text-white">{candidate.name}</h4>
                                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium text-white">
                                  {candidate.studentId}
                                </span>
                              </div>
                              <p className="text-white/80 font-medium mb-2">{candidate.position}</p>
                              <p className="text-white/70 text-sm leading-relaxed">{candidate.department}</p>
                            </div>
                            {/* Selection Indicator */}
                            {isSelected && (
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                  <svg
                                    className="w-5 h-5 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <p className="text-white/70 text-center py-4">No candidates available for this election.</p>
                )}
              </div>
              {/* Vote Button */}
              <div className="flex justify-between items-center pt-6 border-t border-white/20">
                <div className="text-sm text-white/60">Election ends: {formatDisplayDate(election?.endDate)}</div>
                <button
                  onClick={handleVote}
                  disabled={!selectedCandidate || isSubmitting}
                  className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform ${selectedCandidate && !isSubmitting
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-2xl hover:shadow-green-500/25 hover:scale-105"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
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
                      Submitting Vote...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Submit Vote
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Vote Submitted Successfully!</h3>
              <p className="text-white/70 mb-6 max-w-md mx-auto">
                Thank you for participating in the democratic process. Your vote has been recorded securely and
                anonymously.
              </p>
              <div className="bg-white/10 rounded-2xl p-4 max-w-sm mx-auto mb-6">
                <p className="text-white/60 text-sm mb-1">Confirmation ID</p>
                <p className="text-white font-mono text-lg">{recieptId || `RCPT-${Math.floor(100000 + Math.random() * 900000)}`}</p>
              </div>
              <p className="text-white/50 text-sm">This modal will close automatically in a few seconds...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VoteModal
