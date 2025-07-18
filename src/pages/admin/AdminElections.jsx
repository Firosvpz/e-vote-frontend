"use client"
import { useEffect, useState } from "react"
import { getElections } from "../../api/admin/ElectionApi"
import AdminSidebar from "../../layouts/admin/AdminSidebar"
import CreateElectionModal from "../../components/admin/elections/CreateElectionModal"
import EditElectionModal from "../../components/admin/elections/EditElectionModal"
import PreviewElectionModal from "../../components/admin/elections/PreviewElectionModal"
import DeleteElectionModal from "../../components/admin/elections/DeleteElectionModal"
import EndELectionModal from "../../components/admin/elections/EndELectionModal"

export default function AdminElections() {
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedElection, setSelectedElection] = useState(null)
  const [elections, setElections] = useState([])
  const [activeElections, setActiveElections] = useState(0)
  const [scheduledElections, setScheduledElections] = useState(0)
  const [showEditElectionModal, setShowEditElectionModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEndElectionModal, setShowEndElectionModal] = useState(false)

  useEffect(() => {
    const fetchElections = async () => {
      try {
        setLoading(true)
        const response = await getElections()
        setElections(response.data)
        setActiveElections(response.statusCounts?.Active || 0)
        setScheduledElections(response.statusCounts?.Scheduled || 0)
      } catch (error) {
        console.error("Error fetching elections:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchElections()
  }, [])

  const handleCreateElection = (newElection) => {
    setElections((prevElections) => [newElection, ...prevElections])
  }
  const handleEditElection = (updatedElection) => {
    setElections((prevElections) =>
      prevElections.map((election) => (election._id === updatedElection._id ? updatedElection : election)),
    )
  }
  const openEditElectionModal = (election) => {
    setSelectedElection(election)
    setShowEditElectionModal(true)
  }
  const handlePreviewModal = (election) => {
    setSelectedElection(election)
    setShowPreviewModal(true)
  }
  const handleDeleteElection = (electionToDelete) => {
    setElections((prev) => prev.filter((e) => e._id !== electionToDelete._id))
  }
  const openDeleteModal = (election) => {
    setShowDeleteModal(true)
    setSelectedElection(election)
  }
  const openEndModal = (election) => {
    setShowEndElectionModal(true)
    setSelectedElection(election)
  }
  const getColorClasses = (electionType) => {
    const typeColors = {
      Executive: {
        bg: "from-emerald-500/20 to-green-600/20",
        border: "border-emerald-500/30",
        button: "from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
      },
      Referendum: {
        bg: "from-cyan-500/20 to-blue-600/20",
        border: "border-cyan-500/30",
        button: "from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
      },
      Legislative: {
        bg: "from-purple-500/20 to-pink-600/20",
        border: "border-purple-500/30",
        button: "from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700",
      },
      Department: {
        bg: "from-orange-500/20 to-red-600/20",
        border: "border-orange-500/30",
        button: "from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700",
      },
      Social: {
        bg: "from-pink-500/20 to-rose-600/20",
        border: "border-pink-500/30",
        button: "from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700",
      },
    }
    return typeColors[electionType] || typeColors.Referendum // Default to Referendum colors if type not found
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
  // Calculate aggregate stats
  const totalVotesCast = elections.reduce((sum, e) => sum + (e.totalVotes || 0), 0)
  const totalEligibleVoters = elections.reduce((sum, e) => sum + (e.eligibleVoters?.length || 0), 0)
  const averageTurnout = totalEligibleVoters > 0 ? ((totalVotesCast / totalEligibleVoters) * 100).toFixed(1) : 0
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Elections Management</h1>
              <p className="text-cyan-300">Create, manage, and monitor all elections</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 whitespace-nowrap"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
              <div className="text-3xl font-bold text-emerald-400 mb-2">{activeElections}</div>
              <div className="text-white/80 font-medium">Active Elections</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
              <div className="text-3xl font-bold text-orange-400 mb-2">{scheduledElections}</div>
              <div className="text-white/80 font-medium">Scheduled Elections</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
              <div className="text-3xl font-bold text-cyan-400 mb-2">{totalVotesCast.toLocaleString()}</div>
              <div className="text-white/80 font-medium">Total Votes Cast</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
              <div className="text-3xl font-bold text-purple-400 mb-2">{averageTurnout}%</div>
              <div className="text-white/80 font-medium">Average Turnout</div>
            </div>
          </div>
          {/* Elections Grid */}
          {loading ? (
            <div className="text-white text-center text-lg">Loading elections...</div>
          ) : elections.length === 0 ? (
            <div className="text-white/70 text-center text-lg">No elections found. Create a new one!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {elections.map((election) => {
                const colorClasses = getColorClasses(election.electionType) // Use electionType for color
                const isActive = election.status === "Active"
                const isCompleted = election.status === "Completed"
                // Format dates
                const formattedStartDate = new Date(election.startDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                const formattedEndDate = new Date(election.endDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                // Calculate participation rate if eligibleVoters is an array
                const currentParticipationRate =
                  election.eligibleVoters?.length > 0
                    ? ((election.totalVotes / election.eligibleVoters.length) * 100).toFixed(1)
                    : 0
                return (
                  <div
                    key={election._id}
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
                        className={`px-3 py-1 rounded-full text-sm font-bold shadow-lg ${getStatusBadge(
                          election.status,
                        )}`}
                      >
                        {election.status.toUpperCase()}
                      </span>
                    </div>
                    {/* Description */}
                    <p className="text-white/80 mb-4 leading-relaxed text-sm">{election.description}</p>
                    {/* Election Details */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 mb-4">
                      <div className="bg-white/10 rounded-xl p-3">
                        <div className="text-white/60 text-xs mb-1">Type</div>
                        <div className="text-white font-semibold text-sm">{election.electionType}</div>{" "}
                        {/* Changed to electionType */}
                      </div>
                      <div className="bg-white/10 rounded-xl p-3">
                        <div className="text-white/60 text-xs mb-1">Candidates</div>
                        <div className="text-white font-semibold text-sm">{election.candidates?.length || 0}</div>{" "}
                        {/* Changed to candidates.length */}
                      </div>
                      <div className="bg-white/10 rounded-xl p-3">
                        <div className="text-white/60 text-xs mb-1">Start Date</div>
                        <div className="text-white font-semibold text-sm">{formattedStartDate}</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3">
                        <div className="text-white/60 text-xs mb-1">End Date</div>
                        <div className="text-white font-semibold text-sm">{formattedEndDate}</div>
                      </div>
                    </div>
                    {/* Progress Bar (for active elections) */}
                    {isActive && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white/80 text-sm">Participation</span>
                          <span className="text-white font-semibold">{currentParticipationRate}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className={`h-full bg-gradient-to-r ${colorClasses.button} rounded-full transition-all duration-1000`}
                            style={{ width: `${currentParticipationRate}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-white/60 text-xs mt-1">
                          <span>{election.totalVotes.toLocaleString()} votes</span>
                          <span>{(election.eligibleVoters?.length || 0).toLocaleString()} eligible</span>{" "}
                          {/* Changed to eligibleVoters.length */}
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
                            <div className="text-lg font-bold text-emerald-400">{currentParticipationRate}%</div>
                            <div className="text-white/60 text-xs">Turnout</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      {/* Only show Edit button if NOT Cancelled */}
                      {election.status !== "Cancelled" && (
                        <button
                          onClick={() => openEditElectionModal(election)}
                          className="flex-1 bg-white/10 border border-white/20 text-white py-2 px-3 rounded-xl font-medium hover:bg-white/20 transition-colors text-sm"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handlePreviewModal(election)}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-2 px-3 rounded-xl font-medium transition-all duration-200 text-sm"
                      >
                        {/* {isActive ? "Monitor" : isCompleted ? "Results" : "Preview"} */}
                        Preview
                      </button>
                      {isActive ? (
                        <button
                          onClick={() => openEndModal(election)}
                          className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white py-2 px-3 rounded-xl font-medium transition-all duration-200 text-sm"
                        >
                          End
                        </button>
                      ) : (
                        <button
                          onClick={() => openDeleteModal(election)}
                          className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white py-2 px-3 rounded-xl font-medium transition-all duration-200 text-sm"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </main>
        <CreateElectionModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreateElection={handleCreateElection}
        />
        <EditElectionModal
          isOpen={showEditElectionModal}
          onClose={() => setShowEditElectionModal(false)}
          onEditElection={handleEditElection}
          election={selectedElection}
        />
        <PreviewElectionModal
          isOpen={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
          election={selectedElection}
        />
        <DeleteElectionModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDeleteElection={handleDeleteElection}
          election={selectedElection}
        />
        <EndELectionModal
          isOpen={showEndElectionModal}
          onClose={() => setShowEndElectionModal(false)}
          election={selectedElection}
        />
      </div>
    </div>
  )
}
