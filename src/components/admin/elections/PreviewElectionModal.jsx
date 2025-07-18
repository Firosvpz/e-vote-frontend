"use client"

import { useEffect, useState } from "react"
import { previewElectionById } from "../../../api/admin/ElectionApi"
import CandidatesModal from "./CandidatesModal"
import VotersModal from "./VotersModal"


const PreviewElectionModal = ({ isOpen, onClose, election }) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCandidatesModal, setShowCandidatesModal] = useState(false)
  const [showVotersModal, setShowVotersModal] = useState(false)
  

  useEffect(() => {
    if (!isOpen || !election?._id) {
      setData(null) // Clear data when modal closes or election ID is missing
      setLoading(false) // Ensure loading is false if not fetching
      return
    }

    const fetchPreview = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await previewElectionById(election._id)
        setData(response.data)
      } catch (err) {
        console.error("Error fetching preview:", err)
        setError("Failed to load election details.")
      } finally {
        setLoading(false)
      }
    }
    fetchPreview()
  }, [isOpen, election?._id])

  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   second: "2-digit",
    //   hour12: true,
    })
  }

  if (!isOpen) return null

  return (
    <div
    
     className="fixed inset-0 z-50 flex items-center backdrop-blur-md justify-center transition-opacity duration-300">
      <div className="relative  bg-gradient-to-br from-slate-800/95 to-purple-700/95  rounded-3xl border border-white/20 shadow-2xl  w-full max-w-3xl p-8 max-h-[90vh] overflow-y-auto transform scale-95 data-[state=open]:scale-100 transition-transform duration-300">
        <div className="text-center mb-6 border-b pb-4">
          <h2 className="text-3xl font-bold text-white">Election Details</h2>
          <p className="text-gray-400 mt-1">Comprehensive overview of the selected election.</p>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-48">
            <p className="text-gray-600">Loading election data...</p>
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 p-4">
            <p>{error}</p>
          </div>
        )}
        {!loading && !error && data && (
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-400">Title</p>
                <p className="text-lg font-semibold text-white">{data.title}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-400">Description</p>
                <p className="text-lg text-white">{data.description}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-400">Status</p>
                <p className="text-lg text-white">{data.status}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-400">Election Type</p>
                <p className="text-lg text-white">{data.electionType}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-400">Start Date</p>
                <p className="text-lg text-white">{formatDate(data.startDate)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-400">End Date</p>
                <p className="text-lg text-white">{formatDate(data.endDate)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-400">Priority</p>
                <p className="text-lg capitalize text-white">{data.priority}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-400">Total Votes</p>
                <p className="text-lg text-white">{data.totalVotes}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border border-gray-200 rounded-lg p-4 bg-transparent shadow-3xl flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg text-white">Eligible Voters</h3>
                  <p className="text-gray-400">{data.eligibleVoters.length} voters</p>
                </div>
                <button
                  onClick={() => setShowVotersModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-md transition-colors duration-200"
                >
                  View Voters
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 bg-transparent shadow-3xl flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg text-white">Candidates</h3>
                  <p className="text-gray-400">{data.candidates.length} candidates</p>
                </div>
                <button
                  onClick={() => setShowCandidatesModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-md  transition-colors duration-200"
                >
                  View Candidates
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border-t pt-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-400">Created</p>
                <p className="text-lg text-white">{formatDate(data.createdAt)}</p>
              </div>
              {/* <div className="space-y-1">
                <p className="text-sm font-medium text-gray-400">Updated At</p>
                <p className="text-lg text-white">{formatDate(data.updatedAt)}</p>
              </div> */}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white text-3xl leading-none"
          aria-label="Close election details modal"
        >
          &times;
        </button>
      </div>

      {showCandidatesModal && (
        <CandidatesModal
          isOpen={showCandidatesModal}
          onClose={() => setShowCandidatesModal(false)}
          candidates={data.candidates}
        />
      )}
      {showVotersModal && (
        <VotersModal isOpen={showVotersModal} onClose={() => setShowVotersModal(false)} voters={data.eligibleVoters} />
      )}
    </div>
  )
}

export default PreviewElectionModal
