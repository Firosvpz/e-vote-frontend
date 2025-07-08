import React, { useState } from "react";

const UserNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <div className="ml-3">
                <h1 className="text-xl font-bold text-white">Student Vote</h1>
                <p className="text-sm text-cyan-300">Democracy Reimagined</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              <a
                href="/"
                className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              >
                Home
              </a>
              <a
                href="/elections"
                className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              >
                Elections
              </a>
              <a
                href="/results"
                className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              >
                Results
              </a>
              <a
                href="/about"
                className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              >
                About
              </a>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <button className="text-white/80 hover:text-white px-4 py-2 text-sm font-medium transition-colors">
                Login
              </button>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-2 rounded-xl text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                Register
              </button>
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
            <div className="md:hidden border-t border-white/20 py-4 bg-black/20 backdrop-blur-sm rounded-b-2xl mt-2">
              <div className="flex flex-col space-y-1">
                <a
                  href="#"
                  className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 text-sm font-medium rounded-lg transition-colors"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 text-sm font-medium rounded-lg transition-colors"
                >
                  Elections
                </a>
                <a
                  href="#"
                  className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 text-sm font-medium rounded-lg transition-colors"
                >
                  Results
                </a>
                <a
                  href="#"
                  className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 text-sm font-medium rounded-lg transition-colors"
                >
                  About
                </a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-white/20">
                  <button className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 text-sm font-medium text-left rounded-lg transition-colors">
                    Login
                  </button>
                  <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-3 rounded-xl text-sm font-medium shadow-lg">
                    Register
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default UserNavbar;
