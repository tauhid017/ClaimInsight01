import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./auth/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import CreateClaim from "./pages/CreateClaim";
import ClaimDetails from "./pages/ClaimDetails";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      {/* Navbar on every page */}
      <Route element={<Layout />}>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/create-claim" element={<CreateClaim />} />
          <Route path="/claims/:id" element={<ClaimDetails />} />
          <Route path="/history" element={<History />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
