import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/user/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResultsPage from "./pages/user/ResultsPage";
import ElectionsPage from "./pages/user/ElectionsPage";
import AboutPage from "./pages/user/AboutPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminElections from "./pages/admin/AdminElections";
import AdminResults from "./pages/admin/AdminResults";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCandidates from "./pages/admin/AdminCandidates";
import { ToastContainer } from "react-toastify";
import AdminLogin from "./pages/admin/AdminLogin";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
export default function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/elections" element={<ElectionsPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoutes>
                <AdminDashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/elections"
            element={
              <ProtectedRoutes>
                <AdminElections />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/results"
            element={
              <ProtectedRoutes>
                <AdminResults />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoutes>
                <AdminUsers />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/candidates"
            element={
              <ProtectedRoutes>
                <AdminCandidates />
              </ProtectedRoutes>
            }
          />



        </Routes>
      </Router>

    </>
  );
}
