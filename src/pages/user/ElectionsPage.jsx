"use client"

import { useEffect, useState } from "react"
import UserNavbar from "../../layouts/user/UserNavbar"
import UserFooter from "../../layouts/user/UserFooter"
import VoteModal from "../../components/user/VoteModal"
import { getElections } from "../../api/admin/ElectionApi"
import ElectionDetailsModal from "../../components/user/ElectionDetailsModal"

export default function ElectionsPage() {
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false)
  const [selectedElection, setSelectedElection] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [loading, setLoading] = useState(false)
  const [elections, setElections] = useState([])
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchElections = async () => {
      try {
        const response = await getElections()
        setElections(response.data)
      } catch (error) {
        console.error("Error fetching elections:", error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchElections()
  }, [])

  const handleElectionDetails = (election) => {
    setSelectedElection(election)
    setShowDetailsModal(true)
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

  // Predefined colors to cycle through for election cards
  const predefinedColors = ["cyan", "emerald", "purple", "orange", "pink", "blue"]

  const getColorClasses = (colorKey) => {
    const colors = {
      cyan: {
        bg: "from-cyan-500/20 to-blue-600/20",
        border: "border-cyan-500/30",
        button: "from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
      },
      emerald: {
        bg: "from-emerald-500/20 to-green-600/20",
        border: "border-emerald-500/30",
        button: "from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
      },
      purple: {
        bg: "from-purple-500/20 to-pink-600/20",
        border: "border-purple-500/30",
        button: "from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700",
      },
      orange: {
        bg: "from-orange-500/20 to-red-600/20",
        border: "border-orange-500/30",
        button: "from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700",
      },
      pink: {
        bg: "from-pink-500/20 to-rose-600/20",
        border: "border-pink-500/30",
        button: "from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700",
      },
      blue: {
        bg: "from-blue-500/20 to-indigo-600/20",
        border: "border-blue-500/30",
        button: "from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700",
      },
    }
    return colors[colorKey] || colors.cyan // Fallback to cyan
  }

  const getStatusBadge = (apiStatus) => {
    let displayStatus = ""
    if (apiStatus === "Active") {
      displayStatus = "active"
    } else if (apiStatus === "Scheduled") {
      displayStatus = "upcoming"
    } else if (apiStatus === "Cancelled") {
      displayStatus = "completed" // Treating cancelled as completed for display
    } else {
      displayStatus = "upcoming" // Default for unknown statuses
    }

    const badges = {
      active: "bg-gradient-to-r from-emerald-400 to-green-500 text-white",
      upcoming: "bg-gradient-to-r from-yellow-400 to-orange-500 text-black",
      completed: "bg-gradient-to-r from-gray-400 to-gray-500 text-white",
    }
    return badges[displayStatus] || badges.active
  }

  const filteredElections = elections.filter((election) => {
    // Exclude 'Cancelled' elections first
    if (election.status === "Cancelled") {
      return false
    }

    let displayStatus = ""
    if (election.status === "Active") {
      displayStatus = "active"
    } else if (election.status === "Scheduled") {
      displayStatus = "upcoming"
    } else if (election.status === "Completed") {
      displayStatus = "completed"
    }


    if (filterStatus === "all") return true
    return displayStatus === filterStatus
  })

  const handleVote = (election) => {
    setSelectedElection(election)
    setIsVoteModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <UserNavbar />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            Current{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Elections
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Participate in democracy and make your voice heard in all active and upcoming elections
          </p>
        </div>
        {/* Filter Tabs */}
        <div className="mb-8 hidden justify-center md:flex">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 inline-flex">
            {[
              { key: "all", label: "All Elections" },
              { key: "active", label: "Active" },
              { key: "upcoming", label: "Upcoming" },
              { key: "completed", label: "Completed" }


            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setFilterStatus(filter.key)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${filterStatus === filter.key
                  ? "bg-white/20 text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        {/* Elections Grid */}
        {loading ? (
          <div className="text-center text-white text-xl py-12">Loading elections...</div>
        ) : filteredElections.length === 0 ? (
          <div className="text-center text-white/70 text-xl py-12">No elections found for the selected filter.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {filteredElections.map((election, index) => {
              const colorClasses = getColorClasses(predefinedColors[index % predefinedColors.length])
              const isActive = election.status === "Active"
              const isUpcoming = election.status === "Scheduled"
              // isCompleted is no longer relevant for display as 'Cancelled' are filtered out

              const eligibleVotersCount = election.eligibleVoters ? election.eligibleVoters.length : 0
              const candidatesCount = election.candidates ? election.candidates.length : 0
              const participationRate =
                eligibleVotersCount > 0 ? ((election.totalVotes / eligibleVotersCount) * 100).toFixed(1) : 0

              return (
                <div
                  key={election._id} // Use _id from API for key
                  className={`group bg-gradient-to-br ${colorClasses.bg} backdrop-blur-md p-8 rounded-3xl border ${colorClasses.border} hover:border-opacity-80 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl`}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-2xl font-bold text-white">{election.title}</h3>
                      {election.priority === "high" && (
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${getStatusBadge(
                        election.status,
                      )}`}
                    >
                      {election.status.toUpperCase()}
                    </span>
                  </div>
                  {/* Description */}
                  <p className="text-white/80 mb-6 leading-relaxed">{election.description}</p>
                  {/* Election Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/10 rounded-2xl p-4">
                      <div className="text-white/60 text-sm mb-1">Type</div>
                      <div className="text-white font-semibold">{election.electionType}</div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4">
                      <div className="text-white/60 text-sm mb-1">Candidates</div>
                      <div className="text-white font-semibold">{candidatesCount}</div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4">
                      <div className="text-white/60 text-sm mb-1">Start Date</div>
                      <div className="text-white font-semibold">{formatDisplayDate(election.startDate)}</div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4">
                      <div className="text-white/60 text-sm mb-1">End Date</div>
                      <div className="text-white font-semibold">{formatDisplayDate(election.endDate)}</div>
                    </div>
                  </div>
                  {/* Progress Bar (for active elections) */}
                  {isActive && (
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/80 text-sm">Participation</span>
                        <span className="text-white font-semibold">{participationRate}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-3">
                        <div
                          className={`h-full bg-gradient-to-r ${colorClasses.button} rounded-full transition-all duration-1000`}
                          style={{ width: `${participationRate}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-white/60 text-sm mt-1">
                        <span>{election.totalVotes.toLocaleString()} votes</span>
                        <span>{eligibleVotersCount.toLocaleString()} eligible</span>
                      </div>
                    </div>
                  )}
                  {/* Completed Election Stats (only if a status other than 'Cancelled' maps to completed) */}
                  {/* If you have other statuses that map to 'completed' and should be shown,
                      you can re-enable this block and adjust the 'isCompleted' logic. */}
                  {/* {isCompleted && (
                    <div className="mb-6 bg-white/5 rounded-2xl p-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-white">{election.totalVotes.toLocaleString()}</div>
                          <div className="text-white/60 text-sm">Total Votes</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-emerald-400">{participationRate}%</div>
                          <div className="text-white/60 text-sm">Turnout</div>
                        </div>
                      </div>
                    </div>
                  )} */}
                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    {isActive && (
                      <button
                        onClick={() => handleVote(election)}
                        className={`flex-1 group bg-gradient-to-r ${colorClasses.button} text-white px-6 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105`}
                      >
                        <span className="flex items-center justify-center">
                          Vote Now
                          <svg
                            className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </span>
                      </button>
                    )}
                    {isUpcoming && (
                      <button className="flex-1 bg-white/10 border border-white/20 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-200 hover:bg-white/20">
                        Coming Soon
                      </button>
                    )}
                    {/* Removed 'View Results' button for 'Completed' if 'Cancelled' is the only 'completed' status */}
                    {/* {isCompleted && (
                      <button className="flex-1 bg-white/10 border border-white/20 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-200 hover:bg-white/20">
                        View Results
                      </button>
                    )} */}
                    <button
                      onClick={() => handleElectionDetails(election)}
                      className="bg-white/10 border border-white/20 text-white px-6 py-4 rounded-2xl font-medium transition-all duration-200 hover:bg-white/20">
                      Details
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {/* Election Guidelines */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Election Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Voting Requirements</h3>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>Must be a currently enrolled student</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>Valid student ID required for verification</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>One vote per student per election</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>Voting is anonymous and secure</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Important Dates</h3>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Candidate registration: March 1-5, 2024</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Campaign period: March 6-9, 2024</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Voting opens: March 10, 2024 at 8:00 AM</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Results announced: March 16, 2024</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <UserFooter />
      {/* Voting Modal */}
      <VoteModal isOpen={isVoteModalOpen} onClose={() => setIsVoteModalOpen(false)} election={selectedElection} />
      <ElectionDetailsModal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} election={selectedElection} />
    </div>
  )
}
