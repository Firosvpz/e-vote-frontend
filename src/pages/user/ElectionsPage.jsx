"use client"

import { useState } from "react"
import VoteModal from "../../components/VoteModal"
import UserNavbar from "../../layouts/user/UserNavbar"
import UserFooter from "../../layouts/user/UserFooter"


export default function ElectionsPage() {
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false)
  const [selectedElection, setSelectedElection] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")

  const elections = [
    {
      id: "president-2024",
      title: "Student Body President",
      description: "Choose the next leader who will represent student interests and drive campus initiatives forward.",
      status: "active",
      type: "Executive",
      startDate: "March 10, 2024",
      endDate: "March 15, 2024",
      totalVotes: 2847,
      eligibleVoters: 3192,
      participationRate: 89.2,
      candidates: 3,
      color: "cyan",
      priority: "high",
    },
    {
      id: "sustainability-2024",
      title: "Campus Sustainability Initiative",
      description:
        "Vote on implementing comprehensive environmental programs and renewable energy projects across campus.",
      status: "active",
      type: "Referendum",
      startDate: "March 12, 2024",
      endDate: "March 20, 2024",
      totalVotes: 2156,
      eligibleVoters: 3192,
      participationRate: 67.5,
      candidates: 2,
      color: "emerald",
      priority: "high",
    },
    {
      id: "senate-2024",
      title: "Student Senate Representatives",
      description: "Elect representatives from each academic college to serve on the student senate.",
      status: "upcoming",
      type: "Legislative",
      startDate: "March 25, 2024",
      endDate: "March 30, 2024",
      totalVotes: 0,
      eligibleVoters: 3192,
      participationRate: 0,
      candidates: 12,
      color: "purple",
      priority: "medium",
    },
    {
      id: "activities-fee-2024",
      title: "Student Activities Fee Increase",
      description: "Decide on a proposed $25 increase to the student activities fee to fund new programs and events.",
      status: "upcoming",
      type: "Referendum",
      startDate: "April 1, 2024",
      endDate: "April 5, 2024",
      totalVotes: 0,
      eligibleVoters: 3192,
      participationRate: 0,
      candidates: 2,
      color: "orange",
      priority: "medium",
    },
    {
      id: "homecoming-2023",
      title: "Homecoming Court",
      description: "Select representatives for the annual homecoming celebration and festivities.",
      status: "completed",
      type: "Social",
      startDate: "October 15, 2023",
      endDate: "October 20, 2023",
      totalVotes: 2634,
      eligibleVoters: 3089,
      participationRate: 85.3,
      candidates: 8,
      color: "pink",
      priority: "low",
    },
    {
      id: "budget-2023",
      title: "Fall 2023 Budget Allocation",
      description: "Approve the allocation of student government funds for the fall semester programs and initiatives.",
      status: "completed",
      type: "Financial",
      startDate: "September 5, 2023",
      endDate: "September 10, 2023",
      totalVotes: 2891,
      eligibleVoters: 3089,
      participationRate: 93.6,
      candidates: 1,
      color: "blue",
      priority: "high",
    },
  ]

  const getColorClasses = (color) => {
    const colors = {
      cyan: {
        bg: "from-cyan-500/20 to-blue-600/20",
        border: "border-cyan-500/30",
        button: "from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
        badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      },
      emerald: {
        bg: "from-emerald-500/20 to-green-600/20",
        border: "border-emerald-500/30",
        button: "from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
        badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      },
      purple: {
        bg: "from-purple-500/20 to-pink-600/20",
        border: "border-purple-500/30",
        button: "from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700",
        badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      },
      orange: {
        bg: "from-orange-500/20 to-red-600/20",
        border: "border-orange-500/30",
        button: "from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700",
        badge: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      },
      pink: {
        bg: "from-pink-500/20 to-rose-600/20",
        border: "border-pink-500/30",
        button: "from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700",
        badge: "bg-pink-500/20 text-pink-300 border-pink-500/30",
      },
      blue: {
        bg: "from-blue-500/20 to-indigo-600/20",
        border: "border-blue-500/30",
        button: "from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700",
        badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      },
    }
    return colors[color] || colors.cyan
  }

  const getStatusBadge = (status) => {
    const badges = {
      active: "bg-gradient-to-r from-emerald-400 to-green-500 text-white",
      upcoming: "bg-gradient-to-r from-yellow-400 to-orange-500 text-black",
      completed: "bg-gradient-to-r from-gray-400 to-gray-500 text-white",
    }
    return badges[status] || badges.active
  }

  const filteredElections = elections.filter((election) => {
    if (filterStatus === "all") return true
    return election.status === filterStatus
  })

  const handleVote = (election) => {
    setSelectedElection(election)
    setIsVoteModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <UserNavbar/>

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
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 inline-flex">
            {[
              { key: "all", label: "All Elections" },
              { key: "active", label: "Active" },
              { key: "upcoming", label: "Upcoming" },
              { key: "completed", label: "Completed" },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setFilterStatus(filter.key)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  filterStatus === filter.key
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredElections.map((election) => {
            const colorClasses = getColorClasses(election.color)
            const isActive = election.status === "active"
            const isUpcoming = election.status === "upcoming"
            const isCompleted = election.status === "completed"

            return (
              <div
                key={election.id}
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
                    className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${getStatusBadge(election.status)}`}
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
                    <div className="text-white font-semibold">{election.type}</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4">
                    <div className="text-white/60 text-sm mb-1">Candidates</div>
                    <div className="text-white font-semibold">{election.candidates}</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4">
                    <div className="text-white/60 text-sm mb-1">Start Date</div>
                    <div className="text-white font-semibold">{election.startDate}</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4">
                    <div className="text-white/60 text-sm mb-1">End Date</div>
                    <div className="text-white font-semibold">{election.endDate}</div>
                  </div>
                </div>

                {/* Progress Bar (for active elections) */}
                {isActive && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/80 text-sm">Participation</span>
                      <span className="text-white font-semibold">{election.participationRate}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div
                        className={`h-full bg-gradient-to-r ${colorClasses.button} rounded-full transition-all duration-1000`}
                        style={{ width: `${election.participationRate}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-white/60 text-sm mt-1">
                      <span>{election.totalVotes.toLocaleString()} votes</span>
                      <span>{election.eligibleVoters.toLocaleString()} eligible</span>
                    </div>
                  </div>
                )}

                {/* Completed Election Stats */}
                {isCompleted && (
                  <div className="mb-6 bg-white/5 rounded-2xl p-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-white">{election.totalVotes.toLocaleString()}</div>
                        <div className="text-white/60 text-sm">Total Votes</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-emerald-400">{election.participationRate}%</div>
                        <div className="text-white/60 text-sm">Turnout</div>
                      </div>
                    </div>
                  </div>
                )}

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

                  {isCompleted && (
                    <button className="flex-1 bg-white/10 border border-white/20 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-200 hover:bg-white/20">
                      View Results
                    </button>
                  )}

                  <button className="bg-white/10 border border-white/20 text-white px-6 py-4 rounded-2xl font-medium transition-all duration-200 hover:bg-white/20">
                    Details
                  </button>
                </div>
              </div>
            )
          })}
        </div>

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
      <UserFooter/>

      {/* Voting Modal */}
      <VoteModal isOpen={isVoteModalOpen} onClose={() => setIsVoteModalOpen(false)} election={selectedElection} />
    </div>
  )
}
