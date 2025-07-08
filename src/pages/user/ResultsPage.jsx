"use client"

import { useState, useEffect } from "react"
import UserNavbar from "../../layouts/user/UserNavbar"
import UserResults from "../../layouts/user/UserResults"
import UserFooter from "../../layouts/user/UserFooter"

const ResultsPage=()=> {
        const [isLive, setIsLive] = useState(true)



  // Simulate live updates
  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setLastUpdated(new Date())
      }, 30000) // Update every 30 seconds

      return () => clearInterval(interval)
    }
  }, [isLive])

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
    <UserNavbar/>

    <UserResults/>

    <UserFooter/>
    </div>
  )
}
export default ResultsPage