import React, { useState } from 'react'

const UserResults = () => {
    const [selectedElection, setSelectedElection] = useState("president")
    const [lastUpdated, setLastUpdated] = useState(new Date())
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
    // Mock data for elections
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
    return (
        <>
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
                        Election{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Results</span>
                    </h1>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        Real-time voting results and comprehensive election analytics
                    </p>
                </div>

                {/* Election Selector */}
                <div className="mb-8">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 inline-flex">
                        <button
                            onClick={() => setSelectedElection("president")}
                            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${selectedElection === "president"
                                    ? "bg-white/20 text-white shadow-lg"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                                }`}
                        >
                            Student Body President
                        </button>
                        <button
                            onClick={() => setSelectedElection("sustainability")}
                            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${selectedElection === "sustainability"
                                    ? "bg-white/20 text-white shadow-lg"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                                }`}
                        >
                            Sustainability Initiative
                        </button>
                    </div>
                </div>

                {/* Election Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {/* Total Votes */}
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center">
                        <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                            {currentElection.totalVotes.toLocaleString()}
                        </div>
                        <div className="text-white/80 font-medium">Total Votes</div>
                    </div>

                    {/* Participation Rate */}
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center">
                        <div className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent mb-2">
                            {currentElection.participationRate}%
                        </div>
                        <div className="text-white/80 font-medium">Participation</div>
                    </div>

                    {/* Status */}
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center">
                        <div className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
                            {currentElection.status.toUpperCase()}
                        </div>
                        <div className="text-white/80 font-medium">Status</div>
                    </div>

                    {/* End Date */}
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center">
                        <div className="text-lg font-bold text-white mb-1">{currentElection.endDate}</div>
                        <div className="text-white/80 font-medium">Ends</div>
                    </div>
                </div>

                {/* Results Chart */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 mb-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-white">{currentElection.title}</h2>
                        <div className="text-sm text-white/60">Last updated: {lastUpdated.toLocaleTimeString()}</div>
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
                                                className={`w-12 h-12 bg-gradient-to-r ${colorClasses.avatar} rounded-2xl flex items-center justify-center shadow-lg`}
                                            >
                                                <span className="text-white font-bold">
                                                    {candidate.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </span>
                                            </div>

                                            {/* Name and Details */}
                                            <div>
                                                <div className="flex items-center space-x-3">
                                                    <h3 className="text-lg font-bold text-white">{candidate.name}</h3>
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
                                            <div className="text-2xl font-bold text-white">{candidate.percentage}%</div>
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
                                        <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                                        <span className="text-white/80">{point.time}</span>
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
                        <div className="space-y-4">
                            {[
                                { category: "Freshmen", percentage: 22, votes: 626 },
                                { category: "Sophomores", percentage: 28, votes: 797 },
                                { category: "Juniors", percentage: 31, votes: 883 },
                                { category: "Seniors", percentage: 19, votes: 541 },
                            ].map((demo, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-white/80">{demo.category}</span>
                                        <span className="text-white font-semibold">{demo.percentage}%</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-2">
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-1000"
                                            style={{ width: `${demo.percentage}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-white/60 text-sm mt-1">{demo.votes.toLocaleString()} votes</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Election History */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Recent Elections</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Fall 2023 Student Body President",
                                winner: "Alex Thompson",
                                turnout: "84.2%",
                                date: "October 2023",
                                status: "completed",
                            },
                            {
                                title: "Spring 2023 Budget Referendum",
                                winner: "Yes (67.8%)",
                                turnout: "72.1%",
                                date: "April 2023",
                                status: "completed",
                            },
                            {
                                title: "Winter 2023 Housing Initiative",
                                winner: "Sarah Kim",
                                turnout: "79.5%",
                                date: "February 2023",
                                status: "completed",
                            },
                        ].map((election, index) => (
                            <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <h4 className="text-white font-semibold mb-2">{election.title}</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-white/60">Winner:</span>
                                        <span className="text-white">{election.winner}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/60">Turnout:</span>
                                        <span className="text-emerald-400">{election.turnout}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/60">Date:</span>
                                        <span className="text-white/80">{election.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}

export default UserResults