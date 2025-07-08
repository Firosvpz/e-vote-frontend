"use client"

import { useState } from "react"
import AdminSidebar from "../../layouts/admin/AdminSidebar"

export default function AdminCandidates() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedElection, setSelectedElection] = useState("all")

  const candidates = [
    {
      id: 1,
      name: "Sarah Chen",
      position: "Student Body President",
      major: "Political Science",
      year: "Junior",
      votes: 1423,
      percentage: 50.0,
      status: "Active",
      color: "cyan",
      platform: "Student wellness, mental health resources, and campus sustainability initiatives.",
      email: "sarah.chen@university.edu",
      phone: "(555) 123-4567",
      gpa: "3.8",
    },
    {
      id: 2,
      name: "Marcus Johnson",
      position: "Student Body President",
      major: "Business Administration",
      year: "Senior",
      votes: 994,
      percentage: 34.9,
      status: "Active",
      color: "emerald",
      platform: "Enhanced student services, career development programs, and campus technology upgrades.",
      email: "marcus.johnson@university.edu",
      phone: "(555) 234-5678",
      gpa: "3.7",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      position: "Student Body President",
      major: "Environmental Science",
      year: "Sophomore",
      votes: 430,
      percentage: 15.1,
      status: "Active",
      color: "purple",
      platform: "Green campus initiatives, renewable energy projects, and sustainable dining options.",
      email: "elena.rodriguez@university.edu",
      phone: "(555) 345-6789",
      gpa: "3.9",
    },
    {
      id: 4,
      name: "David Kim",
      position: "Student Senate - Engineering",
      major: "Computer Engineering",
      year: "Junior",
      votes: 0,
      percentage: 0,
      status: "Pending",
      color: "orange",
      platform: "Technology integration in classrooms and improved lab facilities.",
      email: "david.kim@university.edu",
      phone: "(555) 456-7890",
      gpa: "3.6",
    },
  ]

  const getColorClasses = (color) => {
    const colors = {
      cyan: {
        bg: "from-cyan-500/20 to-blue-600/20",
        border: "border-cyan-500/30",
        avatar: "from-cyan-400 to-blue-500",
        button: "from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
      },
      emerald: {
        bg: "from-emerald-500/20 to-green-600/20",
        border: "border-emerald-500/30",
        avatar: "from-emerald-400 to-green-500",
        button: "from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
      },
      purple: {
        bg: "from-purple-500/20 to-pink-600/20",
        border: "border-purple-500/30",
        avatar: "from-purple-400 to-pink-500",
        button: "from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700",
      },
      orange: {
        bg: "from-orange-500/20 to-red-600/20",
        border: "border-orange-500/30",
        avatar: "from-orange-400 to-red-500",
        button: "from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700",
      },
    }
    return colors[color] || colors.cyan
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "suspended":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      {/* Sidebar */}
      <AdminSidebar  />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Candidates Management</h1>
              <p className="text-purple-300">Manage election candidates and their profiles</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Candidate</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
              <div className="text-3xl font-bold text-purple-400 mb-2">4</div>
              <div className="text-white/80 font-medium">Total Candidates</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
              <div className="text-3xl font-bold text-green-400 mb-2">3</div>
              <div className="text-white/80 font-medium">Active Campaigns</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
              <div className="text-3xl font-bold text-yellow-400 mb-2">1</div>
              <div className="text-white/80 font-medium">Pending Approval</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
              <div className="text-3xl font-bold text-cyan-400 mb-2">2,847</div>
              <div className="text-white/80 font-medium">Total Votes</div>
            </div>
          </div>

          {/* Filter */}
          <div className="mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 inline-flex">
              <button
                onClick={() => setSelectedElection("all")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedElection === "all"
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                All Candidates
              </button>
              <button
                onClick={() => setSelectedElection("president")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedElection === "president"
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                President
              </button>
              <button
                onClick={() => setSelectedElection("senate")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedElection === "senate"
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Senate
              </button>
            </div>
          </div>

          {/* Candidates Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {candidates.map((candidate) => {
              const colorClasses = getColorClasses(candidate.color)

              return (
                <div
                  key={candidate.id}
                  className={`group bg-gradient-to-br ${colorClasses.bg} backdrop-blur-md p-6 rounded-3xl border ${colorClasses.border} hover:border-opacity-80 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${colorClasses.avatar} rounded-2xl flex items-center justify-center shadow-lg`}
                      >
                        <span className="text-white font-bold text-xl">
                          {candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{candidate.name}</h3>
                        <p className="text-white/70 text-sm">
                          {candidate.major} • {candidate.year}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(candidate.status)}`}
                    >
                      {candidate.status}
                    </span>
                  </div>

                  {/* Position */}
                  <div className="mb-4">
                    <div className="text-white/60 text-sm mb-1">Running for:</div>
                    <div className="text-white font-semibold">{candidate.position}</div>
                  </div>

                  {/* Platform */}
                  <div className="mb-4">
                    <div className="text-white/60 text-sm mb-2">Platform:</div>
                    <p className="text-white/80 text-sm leading-relaxed">{candidate.platform}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white/10 rounded-xl p-3">
                      <div className="text-white/60 text-xs mb-1">Current Votes</div>
                      <div className="text-white font-semibold">{candidate.votes.toLocaleString()}</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3">
                      <div className="text-white/60 text-xs mb-1">Vote Share</div>
                      <div className="text-white font-semibold">{candidate.percentage}%</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3">
                      <div className="text-white/60 text-xs mb-1">GPA</div>
                      <div className="text-white font-semibold">{candidate.gpa}</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3">
                      <div className="text-white/60 text-xs mb-1">Contact</div>
                      <div className="text-white font-semibold text-xs">{candidate.phone}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-white/10 border border-white/20 text-white py-2 px-3 rounded-xl font-medium hover:bg-white/20 transition-colors text-sm">
                      Edit Profile
                    </button>
                    <button
                      className={`flex-1 bg-gradient-to-r ${colorClasses.button} text-white py-2 px-3 rounded-xl font-medium transition-all duration-200 text-sm`}
                    >
                      View Details
                    </button>
                    <button className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white py-2 px-3 rounded-xl font-medium transition-all duration-200 text-sm">
                      Remove
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </main>
      </div>

      {/* Add Candidate Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Add New Candidate</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter full name..."
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter email address..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Major</label>
                  <input
                    type="text"
                    className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter major..."
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Year</label>
                  <select className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="">Select year...</option>
                    <option value="freshman">Freshman</option>
                    <option value="sophomore">Sophomore</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Position</label>
                <select className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="">Select position...</option>
                  <option value="president">Student Body President</option>
                  <option value="vice-president">Vice President</option>
                  <option value="senate">Student Senate</option>
                  <option value="treasurer">Treasurer</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Platform Statement</label>
                <textarea
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe the candidate's platform and goals..."
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Add Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
