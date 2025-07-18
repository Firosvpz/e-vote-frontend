import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginUser from "../../components/user/LoginUser";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import UserProfileModal from "../../components/user/UserProfileModal";

const UserNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showUserProfile, setShowUserProfile] = useState(false)
  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    toast.success(`${userData?.name} logged out successfully`, {
      style: {
        background: 'transparent',
        backdropFilter: 'blur(10px)',
        color: '#ffffff',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        fontFamily: "'Inter', sans-serif",
        fontSize: '16px',
        fontWeight: 500,
        border: '1px solid #333333',
      },
      icon: '⚠️',
    })
    navigate('/')
  };



  return (
    <>
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">SV</span>
                </div>
              </div>
              <div
                onClick={() => navigate('/')}
                className="ml-3 cursor-pointer">
                <h1 className="text-xl font-bold text-white">Student Vote</h1>
                <p className="text-sm text-cyan-300">Democracy Reimagined</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              <button
                onClick={() => navigate('/')}
                className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              >
                Home
              </button>
              <button
                onClick={() => navigate('/elections')}
                className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              >
                Elections
              </button>
              <button
                onClick={() => navigate('/results')}
                className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              >
                Results
              </button>
              <button
                onClick={() => navigate('/about')}
                className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              >
                About
              </button>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {userData ? (
                <div className="relative">
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span className="text-white text-sm font-medium">
                      {userData?.name || 'User'}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700  flex items-center justify-center text-white text-xs font-bold">
                      {userData?.name?.charAt(0) || 'U'}
                    </div>
                  </div>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white  rounded-md shadow-lg z-50">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm font-semibold text-white hover:bg-gray-100 hover:text-blue-700"
                        onClick={() => {
                          setDropdownOpen(false);
                          setShowUserProfile(true)
                        }}
                      >
                        Profile
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 font-semibold text-sm text-white hover:bg-gray-100 hover:text-red-500 "
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout()
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-2 rounded-xl text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                  Login / Signup
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
            {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full border-t border-white/20 py-4 bg-black/90 backdrop-blur-sm rounded-b-2xl px-4">
              <div className="flex flex-col space-y-1">
                <button
                  onClick={() => {
                    navigate("/")
                    setIsMenuOpen(false)
                  }}
                  className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-left w-full"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    navigate("/elections")
                    setIsMenuOpen(false)
                  }}
                  className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-left w-full"
                >
                  Elections
                </button>
                <button
                  onClick={() => {
                    navigate("/results")
                    setIsMenuOpen(false)
                  }}
                  className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-left w-full"
                >
                  Results
                </button>
                <button
                  onClick={() => {
                    navigate("/about")
                    setIsMenuOpen(false)
                  }}
                  className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-left w-full"
                >
                  About
                </button>
                <div className="flex flex-col space-y-2 pt-4 border-t border-white/20">
                  {userData ? (
                    <>
                      {/* User Info in Mobile Menu */}
                      <div className="flex items-center space-x-2 px-4 py-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                          {userData?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <span className="text-white text-sm font-medium">{userData?.name || "User"}</span>
                      </div>
                      {/* Profile Button in Mobile Menu */}
                      <button
                        className="block w-full text-left px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setShowUserProfile(true)
                        }}
                      >
                        Profile
                      </button>
                      {/* Logout Button in Mobile Menu */}
                      <button
                        className="block w-full text-left px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-red-400 "
                        onClick={() => {
                          setIsMenuOpen(false)
                          handleLogout()
                        }}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setShowLoginModal(true)
                        setIsMenuOpen(false)
                      }}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-3 rounded-xl text-sm font-medium shadow-lg w-full text-center hover:from-cyan-600 hover:to-blue-700 transition-all duration-200"
                    >
                      Login / Signup
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      <LoginUser isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <UserProfileModal isOpen={showUserProfile} onClose={() => setShowUserProfile(false)} />
    </>
  );
};

export default UserNavbar;
