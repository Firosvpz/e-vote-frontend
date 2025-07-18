"use client"

import { useEffect, useState } from "react"
import AdminSidebar from "../../layouts/admin/AdminSidebar"
import { deleteCandidate, getCandidates } from "../../api/admin/AdminApi"
import AddCandidateModal from "../../components/admin/candidates/AddCandidateModal"
import EditCandidateModal from "../../components/admin/candidates/EditCandidateModal"
import DeleteCandidateModal from "../../components/admin/candidates/DeleteCandidateModal"

export default function AdminCandidates() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedElection, setSelectedElection] = useState("all")
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalCandidates, setTotalCandidates] = useState(0)
  const [activeCandidates, setActiveCandidates] = useState(0)
  const [winners, setWinners] = useState(0)
  const [totalVotes, setTotalVotes] = useState(0)
  const [showEditCandidateModal, setShowEditCandidateModal] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [candidateToDelete, setCandidateToDelete] = useState(null)
  const [showDeleteCandidateModal, setShowDeleteCandidateModal] = useState(false)
  const [isDeletingCandidate, setIsDeletingCandidate] = useState(false)
  const [error, setError] = useState(null)


  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true)
        const response = await getCandidates()
        setCandidates(response.data)
        setTotalCandidates(response.totalCandidates)
        setActiveCandidates(response.activeCandidates)
        setWinners(response.winners)
        setTotalVotes(response.totalVotes)
      } catch (error) {
        console.error("Error fetching candidates:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCandidates()
  }, [])

  const handleAddCandidate = (newCandidate) => {
    setCandidates((prevCandidate) => [newCandidate, ...prevCandidate])
  }

  const handleEditCandidate = (updatedCandidate) => {
    setCandidates((prevCandidates) => prevCandidates.map((candidate) => (candidate._id === updatedCandidate._id ? updatedCandidate : candidate)))
  }

  const openEditCandidateModal = (candidate) => {
    setSelectedCandidate(candidate)
    setShowEditCandidateModal(true)
  }

  const handleDeleteClick = (candidate) => {
    setCandidateToDelete(candidate)
    setShowDeleteCandidateModal(true)
    setError(null)

  }

  const handleConfirmDelete = async () => {
    if (!candidateToDelete) return
    setIsDeletingCandidate(true)
    setError(null)

    try {
      await deleteCandidate(candidateToDelete._id)
      setCandidates((prevCandidate) => prevCandidate.filter((candidate) => candidate._id !== candidateToDelete._id))
      setTotalCandidates((prev) => prev - 1)
      setShowDeleteCandidateModal(false)
      setCandidateToDelete(null)
    } catch (error) {
      setError("Failed to delete candidate. Please try again.")
      console.error("Error deleting candidate:", err)
    } finally {
      setIsDeletingCandidate(false)
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteCandidateModal(false)
    setCandidateToDelete(null)
    setError(null)
  }

  // Filter candidates based on selection
  const filteredCandidates = candidates.filter((candidate) => {
    if (selectedElection === "all") return true
    if (selectedElection === "Department Representative") return candidate.position.toLowerCase().includes("department")
    if (selectedElection === "Year Representative") return candidate.position.toLowerCase().includes("year rep")
    if (selectedElection === "General Representative") return candidate.position.toLowerCase().includes("general representative")

    return true
  })

  const getRandomColor = () => {
    const colors = ["cyan", "emerald", "purple", "orange", "blue", "pink", "indigo", "teal"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

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
      blue: {
        bg: "from-blue-500/20 to-indigo-600/20",
        border: "border-blue-500/30",
        avatar: "from-blue-400 to-indigo-500",
        button: "from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700",
      },
      pink: {
        bg: "from-pink-500/20 to-rose-600/20",
        border: "border-pink-500/30",
        avatar: "from-pink-400 to-rose-500",
        button: "from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700",
      },
    }
    return colors[color] || colors.cyan
  }

  const getStatusColor = (isWinner) => {
    if (isWinner) {
      return "bg-green-500/20 text-green-300 border-green-500/30"
    }
    return "bg-blue-500/20 text-blue-300 border-blue-500/30"
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white text-xl">Loading candidates...</div>
        </div>
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
              <div className="text-3xl font-bold text-purple-400 mb-2">{totalCandidates}</div>
              <div className="text-white/80 font-medium">Total Candidates</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
              <div className="text-3xl font-bold text-blue-400 mb-2">{activeCandidates}</div>
              <div className="text-white/80 font-medium">Active Candidates</div>
            </div>
            {/* <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
              <div className="text-3xl font-bold text-green-400 mb-2">{winners}</div>
              <div className="text-white/80 font-medium">Winners</div>
            </div> */}
            {/* <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
              <div className="text-3xl font-bold text-cyan-400 mb-2">{totalVotes.toLocaleString()}</div>
              <div className="text-white/80 font-medium">Total Votes</div>
            </div> */}
          </div>

          {/* Filter */}
          <div className="mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 inline-flex">
              <button
                onClick={() => setSelectedElection("all")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${selectedElection === "all"
                  ? "bg-white/20 text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
              >
                All Candidates
              </button>
              <button
                onClick={() => setSelectedElection("Department Representative")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${selectedElection === "Department Representative"
                  ? "bg-white/20 text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
              >
                Department Reps
              </button>
              <button
                onClick={() => setSelectedElection("Year Representative")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${selectedElection === "Year Representative"
                  ? "bg-white/20 text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
              >
                Year Representatives
              </button>

              <button
                onClick={() => setSelectedElection("General Representative")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${selectedElection === "General Representative"
                  ? "bg-white/20 text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
              >
                General Reps
              </button>
            </div>
          </div>

          {/* Candidates Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCandidates.map((candidate) => {
              const color = getRandomColor()
              const colorClasses = getColorClasses(color)
              const votePercentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0

              return (
                <div
                  key={candidate._id}
                  className={`group relative bg-gradient-to-br ${colorClasses.bg} backdrop-blur-md rounded-3xl border ${colorClasses.border} hover:border-opacity-80 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden`}
                >
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-16 translate-x-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-12 -translate-x-12" />

                  {/* Card Content */}
                  <div className="relative p-8">
                    {/* Header Section */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center space-x-5">
                        <div className="relative">
                          <div
                            className={`w-20 h-20 bg-gradient-to-r ${colorClasses.avatar} rounded-2xl flex items-center justify-center shadow-xl ring-4 ring-white/10`}
                          >
                            <span className="text-white font-bold text-2xl">
                              {candidate.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          {candidate.isWinner && (
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18l-8-4.5L10 2l8 11.5L10 18z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-white mb-1 truncate">{candidate.name}</h3>
                          <div className="flex items-center space-x-2 text-white/70 text-sm">
                            <span className="bg-white/10 px-2 py-1 rounded-lg font-medium">
                              ID: {candidate.studentId}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm ${getStatusColor(candidate.isWinner)}`}
                        >
                          {candidate.isWinner ? "🏆 Winner" : "🗳️ Active"}
                        </span>
                      </div>
                    </div>

                    {/* Position & Department Section */}
                    <div className="space-y-6 mb-8">
                      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-white/60 text-sm font-medium">Running for Position</div>
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                        </div>
                        <div className="text-white font-bold text-lg">{candidate.position}</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                          <div className="text-white/60 text-xs font-medium mb-2">Department</div>
                          <div className="text-white font-semibold text-sm">{candidate.department}</div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                          <div className="text-white/60 text-xs font-medium mb-2">Academic Year</div>
                          <div className="text-white font-semibold text-sm">{candidate.academicLevel}</div>
                        </div>
                      </div>
                    </div>

                    {/* Bio Section */}
                    <div className="mb-8">
                      <div className="text-white/60 text-sm font-medium mb-3 flex items-center">

                      </div>

                    </div>



                    {/* Action Buttons */}

                    <div className="flex space-x-2 mt-4 justify-center">
                      {/* Edit Button */}
                      <button
                        onClick={() => openEditCandidateModal(candidate)}
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg px-3 py-2 text-xs font-medium flex items-center space-x-1 transition-all duration-150"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        <span>Edit</span>
                      </button>


                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteClick(candidate)}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-3 py-2 text-xs font-medium flex items-center space-x-1 transition-all duration-150"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        <span>Delete</span>
                      </button>
                    </div>

                  </div>
                </div>
              )
            })}
          </div>

          {/* Empty State */}
          {filteredCandidates.length === 0 && (
            <div className="text-center py-12">
              <div className="text-white/60 text-lg mb-2">No candidates found</div>
              <p className="text-white/40">Try adjusting your filters or add a new candidate</p>
            </div>
          )}
        </main>
      </div>


      <AddCandidateModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddCandidate={handleAddCandidate} />

      <EditCandidateModal
        isOpen={showEditCandidateModal}
        onClose={() => setShowEditCandidateModal(false)}
        candidate={selectedCandidate}
        onEditCandidate={handleEditCandidate} />

      <DeleteCandidateModal
        isOpen={showDeleteCandidateModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        candidateName={candidateToDelete?.name || ""}
        isDeletingCandidate={isDeletingCandidate}
        error={error}
      />
    </div>
  )
}
