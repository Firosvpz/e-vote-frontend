"use client"

import { useEffect, useState } from "react"
import AdminSidebar from "../../layouts/admin/AdminSidebar"
import { Users, ArrowUp, ArrowDown, Minus, Vote, Award, Calendar, UserRound, Activity } from "lucide-react"
import { dashboard } from "../../api/admin/AdminApi"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await dashboard()
      setDashboardData(response)
    } catch (error) {
      console.error(error?.response?.error || "Error occurring while retrieving dashboard data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleRefresh = () => {
    fetchData()
  }

  // Process data for charts and analytics
  const processedData = dashboardData
    ? {
        // User verification stats
        userStats: {
          total: dashboardData.totalUsers || 0,
          verified: dashboardData.verifiedUsers || 0,
          unverified: dashboardData.unverifiedUsers || 0,
          verificationRate:
            dashboardData.totalUsers > 0
              ? Math.round((dashboardData.verifiedUsers / dashboardData.totalUsers) * 100)
              : 0,
        },

        // Election analytics
        electionStats: {
          total: dashboardData.allElections?.length || 0,
          active: dashboardData.allElections?.filter((e) => e.status === "Active").length || 0,
          completed: dashboardData.allElections?.filter((e) => e.status === "Completed").length || 0,
          upcoming: dashboardData.allElections?.filter((e) => e.status === "Upcoming").length || 0,
          totalVotes: dashboardData.totalVotes || 0,
          avgParticipation:
            dashboardData.allElections?.length > 0
              ? Math.round(
                  dashboardData.allElections.reduce((acc, e) => acc + (e.participationRate || 0), 0) /
                    dashboardData.allElections.length,
                )
              : 0,
        },

        // Candidate analytics
        candidateStats: {
          total: dashboardData.allCandidates?.length || 0,
          totalVotes: dashboardData.allCandidates?.reduce((acc, c) => acc + (c.votes || 0), 0) || 0,
          topCandidate:
            dashboardData.allCandidates?.length > 0
              ? dashboardData.allCandidates.reduce(
                  (prev, current) => ((prev.votes || 0) > (current.votes || 0) ? prev : current),
                  dashboardData.allCandidates[0] || {},
                )
              : {},
          departmentDistribution:
            dashboardData.allCandidates?.reduce((acc, c) => {
              if (c.department) {
                acc[c.department] = (acc[c.department] || 0) + 1
              }
              return acc
            }, {}) || {},
        },

        // Election type distribution
        electionTypeStats:
          dashboardData.allElections?.reduce((acc, e) => {
            if (e.electionType) {
              acc[e.electionType] = (acc[e.electionType] || 0) + 1
            }
            return acc
          }, {}) || {},

        // Priority distribution
        priorityStats:
          dashboardData.allElections?.reduce((acc, e) => {
            if (e.priority) {
              acc[e.priority] = (acc[e.priority] || 0) + 1
            }
            return acc
          }, {}) || {},
      }
    : {
        userStats: { total: 0, verified: 0, unverified: 0, verificationRate: 0 },
        electionStats: { total: 0, active: 0, completed: 0, upcoming: 0, totalVotes: 0, avgParticipation: 0 },
        candidateStats: { total: 0, totalVotes: 0, topCandidate: {}, departmentDistribution: {} },
        electionTypeStats: {},
        priorityStats: {},
      }

  const getColorClasses = (color) => {
    const colors = {
      cyan: "from-cyan-500 to-blue-600",
      emerald: "from-emerald-500 to-green-600",
      purple: "from-purple-500 to-pink-600",
      orange: "from-orange-500 to-red-600",
      red: "from-red-500 to-rose-600",
      blue: "from-blue-500 to-indigo-600",
      green: "from-green-500 to-lime-600",
      yellow: "from-yellow-500 to-orange-600",
      pink: "from-pink-500 to-rose-600",
      indigo: "from-indigo-500 to-purple-600",
    }
    return colors[color] || colors.cyan
  }

  // Chart component for bar charts
  const BarChart = ({ data, title, colors = ["cyan", "emerald", "purple", "orange"] }) => {
    // Add null check and provide default empty object
    const chartData = data || {}
    const dataEntries = Object.entries(chartData)

    // If no data, show empty state
    // if (dataEntries.length === 0) {
    //   return (
    //     <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4 shadow-xl">
    //       <h4 className="text-lg font-bold text-white mb-4">{title}</h4>
    //       <div className="flex items-center justify-center h-32 text-white/50">
    //         <p>No data available</p>
    //       </div>
    //     </div>
    //   )
    // }

    const maxValue = Math.max(...Object.values(chartData))

    return (
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4 shadow-xl">
        <h4 className="text-lg font-bold text-white mb-4">{title}</h4>
        <div className="space-y-3">
          {dataEntries.map(([key, value], index) => (
            <div key={key} className="flex items-center space-x-3">
              <div className="w-20 text-sm text-white/80 capitalize">{key}</div>
              <div className="flex-1 bg-white/10 rounded-full h-6 relative overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getColorClasses(colors[index % colors.length])} rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2`}
                  style={{ width: `${maxValue > 0 ? (value / maxValue) * 100 : 0}%` }}
                >
                  <span className="text-white text-xs font-medium">{value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Donut chart component
  const DonutChart = ({ data, title, colors = ["cyan", "emerald", "orange"] }) => {
    // Add null check and provide default empty object
    const chartData = data || {}
    const dataEntries = Object.entries(chartData)

    // If no data or all values are 0, show empty state
    if (dataEntries.length === 0 || dataEntries.every(([key, value]) => value === 0)) {
      return (
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4 shadow-xl">
          <h4 className="text-lg font-bold text-white mb-4">{title}</h4>
          <div className="flex items-center justify-center h-32 text-white/50">
            <p>No data available</p>
          </div>
        </div>
      )
    }

    const total = Object.values(chartData).reduce((acc, val) => acc + val, 0)
    let cumulativePercentage = 0

    return (
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4 shadow-xl">
        <h4 className="text-lg font-bold text-white mb-4">{title}</h4>
        <div className="flex items-center space-x-4">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="transparent" />
              {dataEntries.map(([key, value], index) => {
                const percentage = total > 0 ? (value / total) * 100 : 0
                const strokeDasharray = `${percentage * 2.51} 251.2`
                const strokeDashoffset = -cumulativePercentage * 2.51
                cumulativePercentage += percentage

                return (
                  <circle
                    key={key}
                    cx="50"
                    cy="50"
                    r="40"
                    stroke={`url(#gradient-${colors[index % colors.length]})`}
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000 ease-out"
                  />
                )
              })}
              <defs>
                {colors.map((color) => (
                  <linearGradient key={color} id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop
                      offset="0%"
                      stopColor={
                        color === "cyan"
                          ? "#06b6d4"
                          : color === "emerald"
                            ? "#10b981"
                            : color === "orange"
                              ? "#f97316"
                              : color === "purple"
                                ? "#8b5cf6"
                                : "#06b6d4"
                      }
                    />
                    <stop
                      offset="100%"
                      stopColor={
                        color === "cyan"
                          ? "#3b82f6"
                          : color === "emerald"
                            ? "#059669"
                            : color === "orange"
                              ? "#ea580c"
                              : color === "purple"
                                ? "#7c3aed"
                                : "#3b82f6"
                      }
                    />
                  </linearGradient>
                ))}
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-sm">{total}</span>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            {dataEntries.map(([key, value], index) => (
              <div key={key} className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full bg-gradient-to-r ${getColorClasses(colors[index % colors.length])}`}
                ></div>
                <span className="text-white/80 text-sm capitalize">
                  {key}: {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Line chart for trends
  const LineChart = ({ data, title }) => {
    const elections = dashboardData?.allElections || []
    const sortedElections = elections.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

    // If no elections data, show empty state
    if (sortedElections.length === 0) {
      return (
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4 shadow-xl">
          <h4 className="text-lg font-bold text-white mb-4">{title}</h4>
          <div className="flex items-center justify-center h-32 text-white/50">
            <p>No election data available</p>
          </div>
        </div>
      )
    }

    const maxParticipation = Math.max(...sortedElections.map((e) => e.participationRate || 0))
    const minHeight = 10 // Minimum height for visibility

    return (
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4 shadow-xl">
        <h4 className="text-lg font-bold text-white mb-4">{title}</h4>
        <div className="h-32 flex items-end justify-center space-x-2 px-2">
          {sortedElections.slice(-6).map((election, index) => {
            const participationRate = election.participationRate || 0
            const barHeight =
              maxParticipation > 0 ? Math.max(minHeight, (participationRate / maxParticipation) * 100) : minHeight

            return (
              <div key={election._id || index} className="flex-1 flex flex-col items-center max-w-16">
                <div className="relative w-full flex flex-col items-center">
                  <span className="text-white text-xs font-medium mb-1">{participationRate}%</span>
                  <div
                    className="w-full bg-gradient-to-t from-cyan-500 to-blue-600 rounded-t-lg transition-all duration-1000 ease-out min-h-2"
                    style={{ height: `${barHeight}%` }}
                  ></div>
                </div>
                <span className="text-white/60 text-xs mt-2 truncate w-full text-center">
                  {election.title}
                </span>
              </div>
            )
          })}
        </div>
        <div className="mt-2 text-center">
          <span className="text-white/40 text-xs">Participation Rate (%)</span>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 flex text-white">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/80">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!processedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 flex text-white">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-white/80">No data available</p>
            <button onClick={handleRefresh} className="mt-4 px-4 py-2 bg-purple-600 rounded-lg">
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  const stats = [
    {
      title: "Total Registered Voters",
      value: processedData.userStats.total.toLocaleString(),
      change: `${processedData.userStats.verificationRate}% verified`,
      trend:
        processedData.userStats.verificationRate > 70
          ? "up"
          : processedData.userStats.verificationRate > 40
            ? "neutral"
            : "down",
      color: "cyan",
      icon: Users,
    },
    {
      title: "Active Elections",
      value: processedData.electionStats.active.toLocaleString(),
      change: `${processedData.electionStats.total} total`,
      trend: processedData.electionStats.active > 0 ? "up" : "neutral",
      color: "emerald",
      icon: Vote,
    },
    {
      title: "Total Votes Cast",
      value: processedData.electionStats.totalVotes.toLocaleString(),
      change: `${processedData.electionStats.avgParticipation}% avg participation`,
      trend:
        processedData.electionStats.avgParticipation > 60
          ? "up"
          : processedData.electionStats.avgParticipation > 30
            ? "neutral"
            : "down",
      color: "purple",
      icon: Vote,
    },
    {
      title: "Total Candidates",
      value: processedData.candidateStats.total.toLocaleString(),
      change: `${processedData.candidateStats.totalVotes} votes received`,
      trend: processedData.candidateStats.total > 0 ? "up" : "neutral",
      color: "orange",
      icon: UserRound,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 flex text-white">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/5 backdrop-blur-lg border-b border-white/10 p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">Advanced Analytics Dashboard</h1>
              <p className="text-purple-300 text-xs mt-1">Real-time election monitoring and data insights</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white/80 text-sm">Live Data</span>
              </div>
              <button
                onClick={handleRefresh}
                className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Refresh
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 overflow-y-auto">
          {/* Core Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg p-4 rounded-xl border border-white/10 shadow-xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
              >
                <div className={`absolute inset-0 opacity-10 bg-gradient-to-r ${getColorClasses(stat.color)}`}></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${getColorClasses(stat.color)} rounded-lg flex items-center justify-center shadow-lg`}
                    >
                      <stat.icon className="text-white w-5 h-5" />
                    </div>
                    <div
                      className={`text-xs font-medium flex items-center ${
                        stat.trend === "up"
                          ? "text-green-400"
                          : stat.trend === "down"
                            ? "text-red-400"
                            : "text-gray-400"
                      }`}
                    >
                      {stat.trend === "up" ? (
                        <ArrowUp className="w-3 h-3" />
                      ) : stat.trend === "down" ? (
                        <ArrowDown className="w-3 h-3" />
                      ) : (
                        <Minus className="w-3 h-3" />
                      )}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/70 text-sm mb-1">{stat.title}</div>
                  <div className="text-white/50 text-xs">{stat.change}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
            {/* User Verification Chart */}
            <DonutChart
              data={{
                verified: processedData.userStats.verified,
                unverified: processedData.userStats.unverified,
              }}
              title="User Verification Status"
              colors={["emerald", "orange"]}
            />

            {/* Election Status Distribution */}
            <DonutChart
              data={{
                active: processedData.electionStats.active,
                completed: processedData.electionStats.completed,
                upcoming: processedData.electionStats.upcoming,
              }}
              title="Election Status Distribution"
              colors={["cyan", "purple", "yellow"]}
            />

            {/* Total Votes Chart */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4 shadow-xl">
              <h4 className="text-lg font-bold text-white mb-4">Total Votes Cast</h4>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">{processedData.electionStats.totalVotes}</div>
                  <div className="text-white/60 text-sm">Total Votes</div>
                  <div className="mt-4 flex justify-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-cyan-400">
                        {processedData.electionStats.avgParticipation}%
                      </div>
                      <div className="text-white/50 text-xs">Avg Participation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-emerald-400">{processedData.electionStats.active}</div>
                      <div className="text-white/50 text-xs">Active Elections</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            {/* Department Distribution */}
            <BarChart
              data={processedData.candidateStats.departmentDistribution}
              title="Candidates by Department"
              colors={["purple", "cyan", "emerald", "orange", "pink"]}
            />

            {/* Priority Distribution */}
            <DonutChart
              data={processedData.priorityStats}
              title="Election Priority Levels"
              colors={["red", "orange", "green"]}
            />
          </div>

          {/* Participation Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <LineChart data={dashboardData?.allElections || []} title="Participation Rate Trends" />

            {/* Top Performing Candidates */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4 shadow-xl">
              <h4 className="text-lg font-bold text-white mb-4">Top Performing Candidates</h4>
              <div className="space-y-3">
                {dashboardData?.allCandidates
                  ?.sort((a, b) => (b.votes || 0) - (a.votes || 0))
                  ?.slice(0, 5)
                  ?.map((candidate, index) => (
                    <div key={candidate._id} className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg">
                      <div
                        className={`w-8 h-8 bg-gradient-to-r ${getColorClasses(["cyan", "emerald", "purple", "orange", "pink"][index])} rounded-lg flex items-center justify-center text-white font-bold text-sm`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium text-sm">{candidate.name}</div>
                        <div className="text-white/60 text-xs">
                          {candidate.department} • {candidate.position}
                        </div>
                      </div>
                      <div className="text-white font-bold">{candidate.votes || 0}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Recent Elections Activity */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">Recent Elections Activity</h3>
            <div className="space-y-3">
              {dashboardData?.allElections
                ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                ?.slice(0, 5)
                ?.map((election) => (
                  <div
                    key={election._id}
                    className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${getColorClasses(
                        election.status === "Active" ? "green" : election.status === "Completed" ? "purple" : "blue",
                      )} rounded-lg flex items-center justify-center`}
                    >
                      {election.status === "Active" ? (
                        <Activity className="w-5 h-5 text-white" />
                      ) : election.status === "Completed" ? (
                        <Award className="w-5 h-5 text-white" />
                      ) : (
                        <Calendar className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium text-sm">{election.title}</div>
                      <div className="text-white/60 text-xs">
                        {election.electionType} • {election.totalVotes || 0} votes • {election.participationRate || 0}%
                        participation
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        election.status === "Active"
                          ? "bg-green-500/30 text-green-300"
                          : election.status === "Completed"
                            ? "bg-purple-500/30 text-purple-300"
                            : "bg-blue-500/30 text-blue-300"
                      }`}
                    >
                      {election.status}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
