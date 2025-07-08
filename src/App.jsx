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
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/elections" element={<ElectionsPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/elections" element={<AdminElections />} />
          <Route path="/admin/results" element={<AdminResults />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/candidates" element={<AdminCandidates />} />

        </Routes>
      </Router>

    </>
  );
}
