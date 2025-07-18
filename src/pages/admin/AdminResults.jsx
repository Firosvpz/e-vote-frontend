"use client"

import { useEffect, useState } from "react"
import AdminSidebar from "../../layouts/admin/AdminSidebar"
import { getResults } from "../../api/admin/ElectionApi"
import { Download } from "lucide-react"

export default function AdminResults() {
  const [selectedElectionId, setSelectedElectionId] = useState(null)
  const [electionsData, setElectionsData] = useState(null) // This will hold all processed completed elections
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchElectionResults = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await getResults()
        let processedElections = []

        if (response.data && Array.isArray(response.data)) {
          processedElections = response.data
            .map((resultItem) => {
              const electionDetails = resultItem.election
              // Filter for completed elections only
              if (electionDetails.status && electionDetails.status.toLowerCase() !== "completed") {
                return null // Skip non-completed elections
              }

              const candidates = resultItem.voteBreakdown.map((breakdown, index) => {
                const colorsArray = ["cyan", "emerald", "purple", "red", "orange"]
                const assignedColor = colorsArray[index % colorsArray.length]

                return {
                  id: breakdown.candidate.id || breakdown.candidate._id,
                  name: breakdown.candidate.name,
                  major: breakdown.candidate.department,
                  year: breakdown.candidate.academicLevel,
                  votes: breakdown.votes,
                  percentage: breakdown.percentage,
                  color: assignedColor,
                }
              })

              // Sort candidates by votes in descending order for consistent display
              candidates.sort((a, b) => b.votes - a.votes)

              return {
                id: electionDetails.id || electionDetails._id,
                title: electionDetails.title,
                status: electionDetails.status,
                totalVotes: resultItem.totalVotes,
                participationRate: resultItem.turnoutPercentage,
                endDate: new Date(electionDetails.endDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
                candidates: candidates,
                // timeline and demographics are not in the provided example, so they won't be rendered unless added to backend
              }
            })
            .filter(Boolean) // Remove null entries (non-completed elections)
        }

        setElectionsData(processedElections)
        // No default selection on initial load, show all summaries
        setSelectedElectionId(null)
      } catch (err) {
        console.error(err?.response?.msg || "An error occurred while fetching results", err)
        setError(err?.response?.msg || "Failed to load election results.")
        setElectionsData(null)
        setSelectedElectionId(null)
      } finally {
        setLoading(false)
      }
    }
    fetchElectionResults()
  }, [])

  const currentElection = electionsData?.find((election) => election.id === selectedElectionId)

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
      orange: {
        bg: "from-orange-500/20 to-yellow-600/20",
        border: "border-orange-500/30",
        avatar: "from-orange-400 to-yellow-500",
        bar: "from-orange-500 to-yellow-600",
        text: "text-orange-400",
      },
    }
    return colors[color] || colors.cyan
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center text-white text-xl">
        Loading election results...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center text-red-400 text-xl">
        Error: {error}
      </div>
    )
  }

  if (!electionsData || electionsData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center text-white text-xl">
        No completed election results available.
      </div>
    )
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
              <h1 className="text-2xl font-bold text-white">Results Management</h1>
              <p className="text-purple-300">
                {selectedElectionId ? "Detailed Election Results" : "All Completed Elections"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* <button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Export Results</span>
              </button> */}
              {selectedElectionId && ( // Only show status for detailed view
                <div className="flex items-center space-x-2">
                  {currentElection.status && currentElection.status.toLowerCase() === "live" ? (
                    <>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-white/80 text-sm">LIVE</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-white/80 text-sm">COMPLETED</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {selectedElectionId === null ? (
            // Display grid of all completed elections
            <>
              <h2 className="text-3xl font-bold text-white mb-8">All Completed Elections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {electionsData.map((election) => (
                  <div
                    key={election.id}
                    className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-white flex flex-col justify-between cursor-pointer hover:bg-white/20 transition-colors"
                    onClick={() => setSelectedElectionId(election.id)}
                  >
                    <div>
                      <h3 className="text-xl font-bold mb-2">{election.title}</h3>
                      <p className="text-white/70 text-sm mb-4">
                        Status: <span className="font-semibold">{election.status}</span>
                      </p>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/80">Total Votes:</span>
                        <span className="font-bold">{election.totalVotes.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-white/80">Participation:</span>
                        <span className="font-bold">{election.participationRate}%</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation() // Prevent card click from firing
                        setSelectedElectionId(election.id)
                      }}
                      className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-4 py-2 rounded-xl font-bold shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            // Display detailed view for selected election
            currentElection && (
              <>
                <button
                  onClick={() => setSelectedElectionId(null)}
                  className="mb-6 bg-white/10 text-white px-4 py-2 rounded-xl font-medium hover:bg-white/20 transition-colors flex items-center space-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  <span>Back to All Elections</span>
                </button>

                {/* Election Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center">
                    <div className="p-0 mb-2">
                      <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        {currentElection.totalVotes.toLocaleString()}
                      </h2>
                    </div>
                    <div className="p-0">
                      <p className="text-white/80 font-medium">Total Votes</p>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center">
                    <div className="p-0 mb-2">
                      <h2 className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                        {currentElection.participationRate}%
                      </h2>
                    </div>
                    <div className="p-0">
                      <p className="text-white/80 font-medium">Participation</p>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center">
                    <div className="p-0 mb-2">
                      <h2 className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        {currentElection.status.toUpperCase()}
                      </h2>
                    </div>
                    <div className="p-0">
                      <p className="text-white/80 font-medium">Status</p>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center">
                    <div className="p-0 mb-2">
                      <h2 className="text-lg font-bold text-white">{currentElection.endDate}</h2>
                    </div>
                    <div className="p-0">
                      <p className="text-white/80 font-medium">End Date</p>
                    </div>
                  </div>
                </div>
                {/* Results Chart */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 mb-8">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-white">{currentElection.title} - Final Results</h2>
                    <div className="text-sm text-white/60">Last updated: {new Date().toLocaleTimeString()}</div>
                  </div>
                  <div className="space-y-6">
                    {currentElection.candidates.map((candidate) => {
                      const colorClasses = getColorClasses(candidate.color)
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
                  {currentElection.timeline && (
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
                      <h3 className="text-xl font-bold text-white mb-6">Voting Timeline</h3>
                      <div className="space-y-4">
                        {currentElection.timeline.map((point, index) => (
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
                  )}
                  {/* Demographics */}
                  {currentElection.demographics && (
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
                      <h3 className="text-xl font-bold text-white mb-6">Voter Demographics</h3>
                      <div className="space-y-6">
                        {currentElection.demographics.map((demo, index) => {
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
                  )}
                </div>
              </>
            )
          )}
        </main>
      </div>
    </div>
  )
}
