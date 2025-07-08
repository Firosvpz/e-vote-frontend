"use client"

import UserNavbar from "../../layouts/user/UserNavbar"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Faculty Advisor",
      department: "Political Science",
      image: "SJ",
      bio: "Leading expert in digital democracy and student governance with 15+ years of experience.",
    },
    {
      name: "Alex Chen",
      role: "Student Government President",
      department: "Computer Science",
      image: "AC",
      bio: "Passionate advocate for student rights and transparent democratic processes.",
    },
    {
      name: "Maria Rodriguez",
      role: "Election Commissioner",
      department: "Public Administration",
      image: "MR",
      bio: "Ensures fair and secure elections while maintaining the highest standards of integrity.",
    },
    {
      name: "David Kim",
      role: "Technical Lead",
      department: "Information Systems",
      image: "DK",
      bio: "Develops and maintains the secure voting platform with cutting-edge technology.",
    },
  ]

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Secure & Private",
      description: "End-to-end encryption ensures your vote remains confidential and tamper-proof.",
      color: "cyan",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Fast & Intuitive",
      description: "Cast your vote in under 30 seconds with our streamlined, user-friendly interface.",
      color: "emerald",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: "Real-time Results",
      description: "Watch election results update live with transparent vote counting and analytics.",
      color: "purple",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
      title: "Accessible",
      description: "Designed for all students with full accessibility support and mobile optimization.",
      color: "orange",
    },
  ]

  const stats = [
    { number: "15,000+", label: "Students Served", color: "cyan" },
    { number: "98.7%", label: "Uptime Reliability", color: "emerald" },
    { number: "50+", label: "Elections Conducted", color: "purple" },
    { number: "24/7", label: "Support Available", color: "orange" },
  ]

  const getColorClasses = (color) => {
    const colors = {
      cyan: {
        bg: "from-cyan-500/20 to-blue-600/20",
        border: "border-cyan-500/30",
        icon: "from-cyan-400 to-blue-500",
        text: "text-cyan-400",
      },
      emerald: {
        bg: "from-emerald-500/20 to-green-600/20",
        border: "border-emerald-500/30",
        icon: "from-emerald-400 to-green-500",
        text: "text-emerald-400",
      },
      purple: {
        bg: "from-purple-500/20 to-pink-600/20",
        border: "border-purple-500/30",
        icon: "from-purple-400 to-pink-500",
        text: "text-purple-400",
      },
      orange: {
        bg: "from-orange-500/20 to-red-600/20",
        border: "border-orange-500/30",
        icon: "from-orange-400 to-red-500",
        text: "text-orange-400",
      },
    }
    return colors[color] || colors.cyan
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
     
     <UserNavbar/>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Student Vote
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            Empowering student democracy through innovative technology, transparent processes, and accessible voting
            experiences that give every student a voice in shaping their university experience.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-12 mb-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-xl text-white/80 leading-relaxed max-w-4xl mx-auto">
            To revolutionize student governance by providing a secure, transparent, and accessible digital voting
            platform that encourages maximum participation and ensures every student's voice is heard in the democratic
            process.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const colorClasses = getColorClasses(stat.color)
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
              >
                <div
                  className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${colorClasses.icon} bg-clip-text text-transparent mb-2`}
                >
                  {stat.number}
                </div>
                <div className="text-white/80 font-medium">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Student Vote?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const colorClasses = getColorClasses(feature.color)
              return (
                <div
                  key={index}
                  className={`group bg-gradient-to-br ${colorClasses.bg} backdrop-blur-md p-8 rounded-3xl border ${colorClasses.border} hover:border-opacity-80 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl`}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${colorClasses.icon} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-bold text-2xl">{member.image}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-cyan-300 font-medium mb-1">{member.role}</p>
                <p className="text-white/60 text-sm mb-4">{member.department}</p>
                <p className="text-white/70 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-12 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Transparency</h3>
              <p className="text-white/70">Open processes and clear communication in all election activities.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Inclusivity</h3>
              <p className="text-white/70">Ensuring every student has equal access and opportunity to participate.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Innovation</h3>
              <p className="text-white/70">Leveraging cutting-edge technology to improve democratic processes.</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-cyan-500/20 to-purple-600/20 backdrop-blur-md rounded-3xl border border-white/20 p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Get In Touch</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Have questions about Student Vote or need assistance? We're here to help ensure your democratic
            participation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Email Support</h3>
              <p className="text-white/70 text-sm">support@studentvote.edu</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Phone Support</h3>
              <p className="text-white/70 text-sm">(555) 123-VOTE</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Office Location</h3>
              <p className="text-white/70 text-sm">Student Union, Room 205</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              Contact Support
            </button>
            <button className="bg-white/10 border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold transition-all duration-200 transform hover:scale-105">
              View FAQ
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-md border-t border-white/10 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <span className="text-white font-bold text-xl">SV</span>
            </div>
            <span className="text-2xl font-bold">Student Vote</span>
          </div>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Empowering student democracy through innovative technology and transparent processes.
          </p>
          <p className="text-white/50 text-sm">
            &copy; 2024 Student Vote. All rights reserved. Building the future of student governance.
          </p>
        </div>
      </footer>
    </div>
  )
}
