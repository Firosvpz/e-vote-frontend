"use client"

const CandidatesModal = ({ isOpen, onClose, candidates }) => {
    console.log('candidates',candidates);
    
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center transition-opacity duration-300">
      <div className="relative  bg-gradient-to-br from-slate-900 via-purple-900 to-slate-600 rounded-lg shadow-2xl w-full max-w-xl p-6 max-h-[80vh] overflow-y-auto transform scale-95 data-[state=open]:scale-100 transition-transform duration-300">
        <div className="text-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-white">Candidates</h2>
          <p className="text-gray-400 mt-1">Detailed information about each candidate.</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {candidates && candidates.length > 0 ? (
            candidates.map((candidate, index) => (
              <div key={candidate._id || index} className="border border-gray-200 rounded-md p-4  shadow-sm">
                <p className="font-semibold text-white">
                  {candidate.name} ({candidate.studentId})
                </p>
                <p className="text-sm text-gray-400">Position: {candidate.position}</p>
                <p className="text-sm text-gray-400">Department: {candidate.department}</p>
                 <p className="text-sm text-gray-400">Votes: {candidate.votes}</p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">No candidates found.</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl leading-none"
          aria-label="Close candidates modal"
        >
          &times;
        </button>
      </div>
    </div>
  )
}

export default CandidatesModal
