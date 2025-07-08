"use client"

import { useState } from "react"
import AdminSidebar from "../../layouts/admin/AdminSidebar"

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 10

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@university.edu",
      studentId: "SID001234",
      year: "Junior",
      major: "Political Science",
      status: "Active",
      lastLogin: "2 hours ago",
      joinDate: "Sept 2022",
      votesCount: 12,
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@university.edu",
      studentId: "SID001235",
      year: "Senior",
      major: "Computer Science",
      status: "Active",
      lastLogin: "1 day ago",
      joinDate: "Sept 2021",
      votesCount: 18,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "e.rodriguez@university.edu",
      studentId: "SID001236",
      year: "Sophomore",
      major: "Environmental Science",
      status: "Inactive",
      lastLogin: "1 week ago",
      joinDate: "Sept 2023",
      votesCount: 5,
    },
    {
      id: 4,
      name: "David Kim",
      email: "d.kim@university.edu",
      studentId: "SID001237",
      year: "Freshman",
      major: "Business Administration",
      status: "Active",
      lastLogin: "5 minutes ago",
      joinDate: "Sept 2024",
      votesCount: 3,
    },
    {
      id: 5,
      name: "Jessica Williams",
      email: "j.williams@university.edu",
      studentId: "SID001238",
      year: "Junior",
      major: "Psychology",
      status: "Active",
      lastLogin: "3 hours ago",
      joinDate: "Sept 2022",
      votesCount: 15,
    },
    {
      id: 6,
      name: "Alex Thompson",
      email: "a.thompson@university.edu",
      studentId: "SID001239",
      year: "Senior",
      major: "Engineering",
      status: "Suspended",
      lastLogin: "2 weeks ago",
      joinDate: "Sept 2021",
      votesCount: 8,
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || user.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const startIndex = (currentPage - 1) * usersPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage)

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "inactive":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
      case "suspended":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
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
              <h1 className="text-2xl font-bold text-white">Users Management</h1>
              <p className="text-emerald-300">Manage student accounts and permissions</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                <span>Add User</span>
              </button>
              <button className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl font-medium hover:bg-white/20 transition-colors flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Export Users</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
              <div className="text-3xl font-bold text-emerald-400 mb-2">3,192</div>
              <div className="text-white/80 font-medium">Total Users</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
              <div className="text-3xl font-bold text-green-400 mb-2">2,847</div>
              <div className="text-white/80 font-medium">Active Users</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
              <div className="text-3xl font-bold text-yellow-400 mb-2">245</div>
              <div className="text-white/80 font-medium">New This Month</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
              <div className="text-3xl font-bold text-red-400 mb-2">12</div>
              <div className="text-white/80 font-medium">Suspended</div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden">
            {/* Table Header with Search and Filters */}
            <div className="p-6 border-b border-white/20">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <h3 className="text-lg font-bold text-white">Registered Users ({filteredUsers.length})</h3>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/10 border border-white/20 text-white placeholder-white/50 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">All Users</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left text-white/80 font-semibold p-4">User</th>
                    <th className="text-left text-white/80 font-semibold p-4">Student ID</th>
                    <th className="text-left text-white/80 font-semibold p-4">Academic Info</th>
                    <th className="text-left text-white/80 font-semibold p-4">Status</th>
                    <th className="text-left text-white/80 font-semibold p-4">Activity</th>
                    <th className="text-left text-white/80 font-semibold p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr key={user.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <div className="text-white font-medium">{user.name}</div>
                            <div className="text-white/60 text-sm">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-white font-mono text-sm">{user.studentId}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-white font-medium">{user.year}</div>
                        <div className="text-white/60 text-sm">{user.major}</div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(user.status)}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-white/80 text-sm">Last: {user.lastLogin}</div>
                        <div className="text-white/60 text-sm">Joined: {user.joinDate}</div>
                        <div className="text-emerald-400 text-sm">{user.votesCount} votes cast</div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <button className="text-cyan-400 hover:text-cyan-300 p-2 rounded-lg hover:bg-white/10 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button className="text-yellow-400 hover:text-yellow-300 p-2 rounded-lg hover:bg-white/10 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                          <button className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-white/10 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-white/20 flex justify-between items-center">
              <span className="text-white/70 text-sm">
                Showing {startIndex + 1}-{Math.min(startIndex + usersPerPage, filteredUsers.length)} of{" "}
                {filteredUsers.length} users
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg transition-colors ${currentPage === page ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-white/10 text-white hover:bg-white/20"}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
