import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VoteModal from "../../components/user/VoteModal";
import { getElections } from "../../api/user/userApi";
import LoginUser from "../../components/user/LoginUser";


const MainContent = () => {
    const navigate = useNavigate()
    const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
    const [elections, setElections] = useState([])
    const [selectedElection, setSelectedElection] = useState(null)
    const [showLoginModal, setShowLoginModal] = useState(false)

    useEffect(() => {
        const fetchElections = async () => {
            try {
                const response = await getElections()
                setElections(response)
            } catch (error) {
                console.error('error occurred while fetch elections');
            }
        }
        fetchElections()
    }, [])




    const formatDisplayDate = (isoString) => {
        if (!isoString) return "N/A"
        const date = new Date(isoString)
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const handleVote = (election) => {
        setSelectedElection(election)
        setIsVoteModalOpen(true)
    }

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                            Your Voice, <span className="text-yellow-400">Your Future</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-10 text-white/80 max-w-4xl mx-auto leading-relaxed">
                            Experience the next generation of student democracy with our
                            cutting-edge, secure, and intuitive voting platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button
                                onClick={() => navigate('/elections')}
                                className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105">
                                <span className="flex items-center justify-center">
                                    Vote Now
                                    <svg
                                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </span>
                            </button>
                            <button
                                onClick={() => window.location.href = "/results"}
                                className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105">
                                View Results
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-center hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                            <div className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
                                {elections?.eligibleVotersCount}
                            </div>
                            <div className="text-white/80 font-medium">Registered Voters</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-center hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                            <div className="text-5xl font-black bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent mb-3">
                                89%
                            </div>
                            <div className="text-white/80 font-medium">
                                Participation Rate
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-center hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                            <div className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-3">
                                {elections?.statusCounts?.Active || 0}
                            </div>
                            <div className="text-white/80 font-medium">Active Elections</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                            Why Choose{" "}
                            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                                Student Vote?
                            </span>
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Experience democracy like never before with our revolutionary
                            platform designed for the digital generation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Secure & Private
                            </h3>
                            <p className="text-white/70 leading-relaxed">
                                Military-grade encryption and blockchain technology ensure your
                                vote remains completely confidential and tamper-proof.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:border-emerald-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
                            <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Lightning Fast
                            </h3>
                            <p className="text-white/70 leading-relaxed">
                                Intuitive design meets cutting-edge technology. Cast your vote
                                in under 30 seconds with our streamlined interface.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Live Analytics
                            </h3>
                            <p className="text-white/70 leading-relaxed">
                                Watch democracy unfold in real-time with live vote tracking,
                                interactive charts, and comprehensive analytics.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Current Elections */}
            <section className="py-20 relative">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                            Active{" "}
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                Elections
                            </span>
                        </h2>
                        <p className="text-xl text-white/70">
                            Your opportunity to shape the future starts now
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Election 1 */}
                        {elections?.data?.map((election) => {

                            if (election.status === "Active") {
                                return (
                                    <div key={election._id}
                                        className="group bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-md p-8 rounded-3xl border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                                        <div className="flex justify-between items-start mb-6">
                                            <h3 className="text-2xl font-bold text-white">
                                                {election?.title}
                                            </h3>
                                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                                {election?.status}
                                            </span>
                                        </div>
                                        <p className="text-white/80 mb-6 leading-relaxed">
                                            {election?.description}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <div className="text-sm text-cyan-300 font-medium">
                                                Ends: {formatDisplayDate(election?.endDate)}
                                            </div>
                                            <button
                                                onClick={() => handleVote(election)}
                                                className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                                                <span className="flex items-center">
                                                    Vote Now
                                                    <svg
                                                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                        />
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                )


                            }
                        })}

                        {/* Election 2 */}
                        {/* <div className="group bg-gradient-to-br from-emerald-500/20 to-green-600/20 backdrop-blur-md p-8 rounded-3xl border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-2xl font-bold text-white">
                                    Campus Sustainability Initiative
                                </h3>
                                <span className="bg-gradient-to-r from-emerald-400 to-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                    LIVE
                                </span>
                            </div>
                            <p className="text-white/80 mb-6 leading-relaxed">
                                Join the green revolution and help create a sustainable campus
                                that leads by example in environmental responsibility.
                            </p>
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-emerald-300 font-medium">
                                    Ends: March 20, 2024
                                </div>
                                <button
                                    onClick={() => setIsVoteModalOpen(true)}  
                                className="group bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                                    <span className="flex items-center">
                                        Vote Now
                                        <svg
                                            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30"></div>
                <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                        Ready to{" "}
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            Make History?
                        </span>
                    </h2>
                    <p className="text-xl mb-10 text-white/80 max-w-3xl mx-auto leading-relaxed">
                        Join thousands of students who are already shaping the future
                        through democratic participation. Your voice matters.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button
                            onClick={() => setShowLoginModal(true)}
                            className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-10 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105">
                            <span className="flex items-center justify-center">
                                Create Account
                                <svg
                                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </span>
                        </button>
                        <button
                            onClick={() => navigate('/about')}
                            className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>


            <VoteModal
                isOpen={isVoteModalOpen}
                onClose={() => setIsVoteModalOpen(false)}
                election={selectedElection}
            />
            <LoginUser isOpen={showLoginModal} onClose={()=>setShowLoginModal(false)} />
        </>
    );
};

export default MainContent;
