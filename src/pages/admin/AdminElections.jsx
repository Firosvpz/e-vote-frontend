"use client"

import { useState } from "react"
import AdminSidebar from "../../layouts/admin/AdminSidebar"

export default function AdminElections() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedElection, setSelectedElection] = useState(null)


  const elections = [
    {
      id: "president-2024",
      title: "Student Body President",
      description: "Choose the next leader who will represent student interests and drive campus initiatives forward.",
      status: "Active",
      type: "Executive",
      startDate: "March 10, 2024",
      endDate: "March 15, 2024",
      totalVotes: 2847,
      eligibleVoters: 3192,
      participationRate: 89.2,
      candidates: 3,
      color: "emerald",
      priority: "high",
    },
    {
      id: "sustainability-2024",
      title: "Campus Sustainability Initiative",
      description:
        "Vote on implementing comprehensive environmental programs and renewable energy projects across campus.",
      status: "Active",
      type: "Referendum",
      startDate: "March 12, 2024",
      endDate: "March 20, 2024",
      totalVotes: 2156,
      eligibleVoters: 3192,
      participationRate: 67.5,
      candidates: 2,
      color: "cyan",
      priority: "high",
    },
    {
      id: "senate-2024",
      title: "Student Senate Representatives",
      description: "Elect representatives from each academic college to serve on the student senate.",
      status: "Draft",
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
      status: "Scheduled",
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
      status: "Completed",
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
  ]

  const getColorClasses = (color) => {
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
    }
    return colors[color] || colors.cyan
  }

  const getStatusBadge = (status) => {
    const badges = {
      Active: "bg-gradient-to-r from-emerald-400 to-green-500 text-white",
      Draft: "bg-gradient-to-r from-gray-400 to-gray-500 text-white",
      Scheduled: "bg-gradient-to-r from-yellow-400 to-orange-500 text-black",
      Completed: "bg-gradient-to-r from-blue-400 to-blue-500 text-white",
    }
    return badges[status] || badges.Draft
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Elections Management</h1>
              <p className="text-cyan-300">Create, manage, and monitor all elections</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Create New Election</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
              <div className="text-3xl font-bold text-emerald-400 mb-2">2</div>
              <div className="text-white/80 font-medium">Active Elections</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
              <div className="text-3xl font-bold text-orange-400 mb-2">2</div>
              <div className="text-white/80 font-medium">Scheduled Elections</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
              <div className="text-3xl font-bold text-cyan-400 mb-2">5,003</div>
              <div className="text-white/80 font-medium">Total Votes Cast</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
              <div className="text-3xl font-bold text-purple-400 mb-2">78.3%</div>
              <div className="text-white/80 font-medium">Average Turnout</div>
            </div>
          </div>

          {/* Elections Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {elections.map((election) => {
              const colorClasses = getColorClasses(election.color)
              const isActive = election.status === "Active"
              const isDraft = election.status === "Draft"
              const isCompleted = election.status === "Completed"

              return (
                <div
                  key={election.id}
                  className={`group bg-gradient-to-br ${colorClasses.bg} backdrop-blur-md p-6 rounded-3xl border ${colorClasses.border} hover:border-opacity-80 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl`}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-bold text-white">{election.title}</h3>
                      {election.priority === "high" && (
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold shadow-lg ${getStatusBadge(election.status)}`}
                    >
                      {election.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-white/80 mb-4 leading-relaxed text-sm">{election.description}</p>

                  {/* Election Details */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/10 rounded-xl p-3">
                      <div className="text-white/60 text-xs mb-1">Type</div>
                      <div className="text-white font-semibold text-sm">{election.type}</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3">
                      <div className="text-white/60 text-xs mb-1">Candidates</div>
                      <div className="text-white font-semibold text-sm">{election.candidates}</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3">
                      <div className="text-white/60 text-xs mb-1">Start Date</div>
                      <div className="text-white font-semibold text-sm">{election.startDate}</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3">
                      <div className="text-white/60 text-xs mb-1">End Date</div>
                      <div className="text-white font-semibold text-sm">{election.endDate}</div>
                    </div>
                  </div>

                  {/* Progress Bar (for active elections) */}
                  {isActive && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/80 text-sm">Participation</span>
                        <span className="text-white font-semibold">{election.participationRate}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className={`h-full bg-gradient-to-r ${colorClasses.button} rounded-full transition-all duration-1000`}
                          style={{ width: `${election.participationRate}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-white/60 text-xs mt-1">
                        <span>{election.totalVotes.toLocaleString()} votes</span>
                        <span>{election.eligibleVoters.toLocaleString()} eligible</span>
                      </div>
                    </div>
                  )}

                  {/* Completed Election Stats */}
                  {isCompleted && (
                    <div className="mb-4 bg-white/5 rounded-xl p-3">
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div>
                          <div className="text-lg font-bold text-white">{election.totalVotes.toLocaleString()}</div>
                          <div className="text-white/60 text-xs">Total Votes</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-emerald-400">{election.participationRate}%</div>
                          <div className="text-white/60 text-xs">Turnout</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-white/10 border border-white/20 text-white py-2 px-3 rounded-xl font-medium hover:bg-white/20 transition-colors text-sm">
                      {isDraft ? "Configure" : "Edit"}
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-2 px-3 rounded-xl font-medium transition-all duration-200 text-sm">
                      {isActive ? "Monitor" : isCompleted ? "Results" : "Preview"}
                    </button>
                    <button className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white py-2 px-3 rounded-xl font-medium transition-all duration-200 text-sm">
                      {isActive ? "End" : "Delete"}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </main>

        {/* Create Election Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
            <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Create New Election</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Election Title</label>
                  <input
                    type="text"
                    className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Enter election title..."
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Description</label>
                  <textarea
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Describe the election purpose and details..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Election Type</label>
                    <select className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500">
                      <option value="">Select type...</option>
                      <option value="executive">Executive</option>
                      <option value="legislative">Legislative</option>
                      <option value="referendum">Referendum</option>
                      <option value="social">Social</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Priority</label>
                    <select className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Start Date</label>
                    <input
                      type="datetime-local"
                      className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">End Date</label>
                    <input
                      type="datetime-local"
                      className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    Create Election
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
