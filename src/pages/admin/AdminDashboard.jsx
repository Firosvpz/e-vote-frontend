"use client"

import { useEffect, useState } from "react"
import AdminSidebar from "../../layouts/admin/AdminSidebar"
import {
  Users,
  ClipboardList,
  BarChart,
  Plus,
  UserPlus,
  FileText,
  Upload,
  ArrowUp,
  ArrowDown,
  Minus,
  Vote,
  UserCheck,
  UserX,
  Award,
  Calendar,
  UserRound,
} from "lucide-react"
import { dashboard } from "../../api/admin/AdminApi"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [totalUsers, setTotalUsers] = useState(null)
  const [verifiedUsers, setVerifiedUsers] = useState(null)
  const [unverifiedUsers, setUnVerifiedUsers] = useState(null) // Corrected typo from user's original code
  const [activeElections, setActiveElections] = useState(null)
  const [totalVotes, setTotalVotes] = useState(null)

  const fetchData = async () => {
    try {
      const response = await dashboard()
      setTotalUsers(response.totalUsers)
      setVerifiedUsers(response.verifiedUsers)
      setUnVerifiedUsers(response. unverifiedUsers)
      setActiveElections(response.activeElections)
      setTotalVotes(response.totalVotes)
    } catch (error) {
      console.error(error?.response?.error || "Error occurring while retrieving dashboard data")
    }
  }

  useEffect(() => {
    fetchData()
  }, []) // Empty dependency array means it runs once on mount

  const handleRefresh = () => {
    fetchData()
  }



  // Derive stats from fetched data
  const stats = [
    {
      title: "Total Registered Voters",
      value: totalUsers !== null ? totalUsers.toLocaleString() : "...",
      change: "+12%", // Placeholder, as API doesn't provide this
      trend: "up", // Placeholder
      color: "cyan",
      icon: Users,
    },
    {
      title: "Verified Voters",
      value: verifiedUsers !== null ? verifiedUsers.toLocaleString() : "...",
      change: "+15%", // Placeholder
      trend: "up", // Placeholder
      color: "emerald",
      icon: UserCheck,
    },
    {
      title: "Active Elections",
      value: activeElections !== null ? activeElections.toLocaleString() : "...",
      change: "0%", // Placeholder
      trend: "neutral", // Placeholder
      color: "purple",
      icon: ClipboardList,
    },
    {
      title: "Total Votes Cast",
      value: totalVotes !== null ? totalVotes.toLocaleString() : "...",
      change: "+23%", // Placeholder
      trend: "up", // Placeholder
      color: "orange",
      icon: BarChart,
    },
  ]

  // These arrays remain hardcoded as your API response doesn't provide data for them.
  const electionOverview = [
    {
      id: 1,
      title: "Student Body President",
      status: "Active",
      voterTurnout: "78%",
      votes: "2,100",
      icon: Vote,
      color: "green",
    },
    {
      id: 2,
      title: "Community Council",
      status: "Active",
      voterTurnout: "55%",
      votes: "1,500",
      icon: Vote,
      color: "green",
    },
    {
      id: 3,
      title: "Faculty Representative",
      status: "Upcoming",
      date: "Aug 15, 2025",
      icon: Calendar,
      color: "blue",
    },
    {
      id: 4,
      title: "Alumni Board Election",
      status: "Completed",
      winner: "Jane Doe",
      icon: Award,
      color: "purple",
    },
  ]

  const candidateInsights = [
    {
      id: 1,
      name: "John Smith",
      election: "Student Body President",
      votes: "1,200",
      status: "Leading",
      icon: UserRound,
      color: "cyan",
    },
    {
      id: 2,
      name: "Emily White",
      election: "Student Body President",
      votes: "900",
      status: "Trailing",
      icon: UserRound,
      color: "red",
    },
    {
      id: 3,
      name: "David Lee",
      election: "Community Council",
      votes: "800",
      status: "Leading",
      icon: UserRound,
      color: "cyan",
    },
    {
      id: 4,
      name: "Maria Garcia",
      election: "Community Council",
      votes: "700",
      status: "Trailing",
      icon: UserRound,
      color: "red",
    },
  ]

  // Derive user management stats from fetched data
  const userManagementStats = [
    {
      title: "Total Users",
      value: totalUsers !== null ? totalUsers.toLocaleString() : "...",
      icon: Users,
      color: "purple",
    },
    {
      title: "Verified Users",
      value: verifiedUsers !== null ? verifiedUsers.toLocaleString() : "...",
      icon: UserCheck,
      color: "emerald",
    },
    {
      title: "Unverified Users",
      value: unverifiedUsers !== null ? unverifiedUsers.toLocaleString() : "...",
      icon: UserX,
      color: "orange",
    },
  ]

  const getColorClasses = (color) => {
    const colors = {
      cyan: "from-cyan-500 to-blue-600",
      emerald: "from-emerald-500 to-green-600",
      purple: "from-purple-500 to-pink-600",
      orange: "from-orange-500 to-red-600",
      red: "from-red-500 to-rose-600",
      blue: "from-blue-500 to-indigo-600",
      green: "from-green-500 to-lime-600",
    }
    return colors[color] || colors.cyan
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 flex text-white">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/5 backdrop-blur-lg border-b border-white/10 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-wide">Dashboard Overview</h1>
              <p className="text-purple-300 text-sm mt-1">System analytics and real-time monitoring for e-voting</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white/80 text-base">System Online</span>
              </div>
              <button
                onClick={handleRefresh}
                className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Refresh Data
              </button>
            </div>
          </div>
        </header>
        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          {/* Core Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg p-7 rounded-3xl border border-white/10 shadow-xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden"
              >
                <div className={`absolute inset-0 opacity-10 ${getColorClasses(stat.color)}`}></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-14 h-14 bg-gradient-to-r ${getColorClasses(stat.color)} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
                      <stat.icon className="text-white w-7 h-7" />
                    </div>
                    <div
                      className={`text-base font-semibold flex items-center ${stat.trend === "up"
                          ? "text-green-400"
                          : stat.trend === "down"
                            ? "text-red-400"
                            : "text-gray-400"
                        }`}
                    >
                      {stat.change}
                      {stat.trend === "up" ? (
                        <ArrowUp className="inline-block w-4 h-4 ml-1" />
                      ) : stat.trend === "down" ? (
                        <ArrowDown className="inline-block w-4 h-4 ml-1" />
                      ) : (
                        <Minus className="inline-block w-4 h-4 ml-1" />
                      )}
                    </div>
                  </div>
                  <div className="text-4xl font-extrabold text-white mb-2">{stat.value}</div>
                  <div className="text-white/70 text-lg">{stat.title}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-7 shadow-xl mb-10">
            <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white p-5 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-md">
                <Plus className="w-6 h-6" />
                <span>Create Election</span>
              </button>
              <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white p-5 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-md">
                <UserPlus className="w-6 h-6" />
                <span>Add Voter</span>
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white p-5 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-md">
                <Plus className="w-6 h-6" />
                <span>Add Candidate</span>
              </button>
              <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white p-5 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-md">
                <FileText className="w-6 h-6" />
                <span>View Results</span>
              </button>
              
            </div>
          </div>

         

          {/* User Management Stats */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-7 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6">User Management Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {userManagementStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-md"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${getColorClasses(stat.color)} rounded-full flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <stat.icon className="text-white w-8 h-8" />
                  </div>
                  <div className="text-4xl font-extrabold text-white mb-1">{stat.value}</div>
                  <div className="text-white/70 text-lg">{stat.title}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
