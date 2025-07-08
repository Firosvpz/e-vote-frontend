"use client"

import { useState } from "react"
import AdminSidebar from "../../layouts/admin/AdminSidebar"

export default function AdminResults() {
  const [selectedElection, setSelectedElection] = useState("president")
  const [viewMode, setViewMode] = useState("overview")

  const elections = {
    president: {
      title: "Student Body President",
      status: "live",
      totalVotes: 2847,
      participationRate: 89.2,
      endDate: "March 15, 2024",
      candidates: [
        {
          id: "sarah-chen",
          name: "Sarah Chen",
          major: "Political Science",
          year: "Junior",
          votes: 1423,
          percentage: 50.0,
          color: "cyan",
          trend: "+2.3%",
        },
        {
          id: "marcus-johnson",
          name: "Marcus Johnson",
          major: "Business Administration",
          year: "Senior",
          votes: 994,
          percentage: 34.9,
          color: "emerald",
          trend: "-1.1%",
        },
        {
          id: "elena-rodriguez",
          name: "Elena Rodriguez",
          major: "Environmental Science",
          year: "Sophomore",
          votes: 430,
          percentage: 15.1,
          color: "purple",
          trend: "-1.2%",
        },
      ],
    },
    sustainability: {
      title: "Campus Sustainability Initiative",
      status: "live",
      totalVotes: 2156,
      participationRate: 67.5,
      endDate: "March 20, 2024",
      candidates: [
        {
          id: "yes",
          name: "Yes - Support Initiative",
          votes: 1618,
          percentage: 75.1,
          color: "emerald",
          trend: "+3.2%",
        },
        {
          id: "no",
          name: "No - Oppose Initiative",
          votes: 538,
          percentage: 24.9,
          color: "red",
          trend: "-3.2%",
        },
      ],
    },
  }

  const currentElection = elections[selectedElection]

  const getColorClasses = (color) => {
    const colors = {
      cyan: {
        bg: "from-cyan-500/20 to-blue-600/20",
        border: "border-cyan-500/30",
        avatar: "from-cyan-400 to-blue-500",
        bar: "from-cyan-500 to-blue-600",
        text: "text-cyan-400",
      },
      emerald: {
        bg: "from-emerald-500/20 to-green-600/20",
        border: "border-emerald-500/30",
        avatar: "from-emerald-400 to-green-500",
        bar: "from-emerald-500 to-green-600",
        text: "text-emerald-400",
      },
      purple: {
        bg: "from-purple-500/20 to-pink-600/20",
        border: "border-purple-500/30",
        avatar: "from-purple-400 to-pink-500",
        bar: "from-purple-500 to-pink-600",
        text: "text-purple-400",
      },
      red: {
        bg: "from-red-500/20 to-rose-600/20",
        border: "border-red-500/30",
        avatar: "from-red-400 to-rose-500",
        bar: "from-red-500 to-rose-600",
        text: "text-red-400",
      },
    }
    return colors[color] || colors.cyan
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      {/* Sidebar */}
      <AdminSidebar/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Results Management</h1>
              <p className="text-purple-300">Real-time election results and analytics</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Export Results</span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white/80 text-sm">LIVE</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Election Selector and View Mode */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 inline-flex">
              <button
                onClick={() => setSelectedElection("president")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedElection === "president"
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Student Body President
              </button>
              <button
                onClick={() => setSelectedElection("sustainability")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedElection === "sustainability"
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Sustainability Initiative
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 inline-flex">
              <button
                onClick={() => setViewMode("overview")}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 text-sm ${
                  viewMode === "overview"
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setViewMode("detailed")}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 text-sm ${
                  viewMode === "detailed"
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Detailed
              </button>
              <button
                onClick={() => setViewMode("analytics")}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 text-sm ${
                  viewMode === "analytics"
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Analytics
              </button>
            </div>
          </div>

          {/* Election Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center">
              <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                {currentElection.totalVotes.toLocaleString()}
              </div>
              <div className="text-white/80 font-medium">Total Votes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center">
              <div className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent mb-2">
                {currentElection.participationRate}%
              </div>
              <div className="text-white/80 font-medium">Participation</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center">
              <div className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
                {currentElection.status.toUpperCase()}
              </div>
              <div className="text-white/80 font-medium">Status</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center">
              <div className="text-lg font-bold text-white mb-1">{currentElection.endDate}</div>
              <div className="text-white/80 font-medium">End Date</div>
            </div>
          </div>

          {/* Results Chart */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 mb-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">{currentElection.title} - Live Results</h2>
              <div className="text-sm text-white/60">Last updated: {new Date().toLocaleTimeString()}</div>
            </div>

            <div className="space-y-6">
              {currentElection.candidates.map((candidate, index) => {
                const colorClasses = getColorClasses(candidate.color)
                const isLeading = index === 0

                return (
                  <div key={candidate.id} className="relative">
                    {/* Candidate Info */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        {/* Avatar */}
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

                        {/* Name and Details */}
                        <div>
                          <div className="flex items-center space-x-3">
                            <h3 className="text-xl font-bold text-white">{candidate.name}</h3>
                            {isLeading && (
                              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                                LEADING
                              </span>
                            )}
                          </div>
                          {candidate.major && (
                            <p className="text-white/70 text-sm">
                              {candidate.major} • {candidate.year}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Vote Count and Percentage */}
                      <div className="text-right">
                        <div className="text-3xl font-bold text-white">{candidate.percentage}%</div>
                        <div className="text-white/70 text-sm">{candidate.votes.toLocaleString()} votes</div>
                        {candidate.trend && (
                          <div
                            className={`text-xs font-medium ${candidate.trend.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                          >
                            {candidate.trend}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative">
                      <div className="w-full bg-white/10 rounded-full h-6 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${colorClasses.bar} rounded-full transition-all duration-1000 ease-out relative`}
                          style={{ width: `${candidate.percentage}%` }}
                        >
                          {/* Animated shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Additional Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Voting Timeline */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
              <h3 className="text-xl font-bold text-white mb-6">Voting Timeline</h3>
              <div className="space-y-4">
                {[
                  { time: "9:00 AM", votes: 245, percentage: 8.6 },
                  { time: "12:00 PM", votes: 892, percentage: 31.3 },
                  { time: "3:00 PM", votes: 1456, percentage: 51.1 },
                  { time: "6:00 PM", votes: 2134, percentage: 75.0 },
                  { time: "9:00 PM", votes: 2847, percentage: 100.0 },
                ].map((point, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                      <span className="text-white/80 font-medium">{point.time}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{point.votes.toLocaleString()}</div>
                      <div className="text-white/60 text-sm">{point.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Demographics */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
              <h3 className="text-xl font-bold text-white mb-6">Voter Demographics</h3>
              <div className="space-y-6">
                {[
                  { category: "Freshmen", percentage: 22, votes: 626, color: "cyan" },
                  { category: "Sophomores", percentage: 28, votes: 797, color: "emerald" },
                  { category: "Juniors", percentage: 31, votes: 883, color: "purple" },
                  { category: "Seniors", percentage: 19, votes: 541, color: "orange" },
                ].map((demo, index) => {
                  const colorClasses = getColorClasses(demo.color)
                  return (
                    <div key={index} className="bg-white/5 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-white font-medium">{demo.category}</span>
                        <span className="text-white font-bold">{demo.percentage}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                        <div
                          className={`h-full bg-gradient-to-r ${colorClasses.bar} rounded-full transition-all duration-1000`}
                          style={{ width: `${demo.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-white/60 text-sm">{demo.votes.toLocaleString()} votes</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
