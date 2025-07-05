import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Companies from "./pages/companies.jsx";
import MyApplications from "./pages/myApplications.jsx";
import AdminDashboard from "./pages/adminDashboard.jsx";
import HomePage from "./pages/homePage.jsx";
import AdminLogin from "./pages/adminLogin.jsx";
import AdminCompanies from "./pages/adminCompanies";
import AdminApplications from "./pages/adminApplications";
import AddCompany from "./pages/addCompany.jsx";
import Profile from "./pages/profile";
import AdminCompanyApplications from "./pages/adminCompanyApplications.jsx";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/companies" element={<Companies />} />
  <Route path="/my-applications" element={<MyApplications />} />
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
<Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/companies" element={<AdminCompanies />} />
<Route path="/admin/applications" element={<AdminApplications />} />
<Route path="/admin/add-company" element={<AddCompany />} />
<Route path="/profile" element={<Profile />} />
<Route path="/admin/companies/:id/applications" element={<AdminCompanyApplications />} />

      </Routes>
    </Router>
  );
}

export default App;
