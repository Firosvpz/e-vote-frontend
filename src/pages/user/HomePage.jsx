"use client";

import UserNavbar from "../../layouts/user/UserNavbar";
import MainContent from "../../layouts/user/MainContent";
import UserFooter from "../../layouts/user/UserFooter";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <UserNavbar />
      <MainContent />
      <UserFooter />
    </div>
  );
};

export default HomePage;
