import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/users/HomePage";


const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default UserRoutes;
