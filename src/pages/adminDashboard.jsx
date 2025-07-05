import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    axios
      .get("http://placement-backend-production.up.railway.app/api/admin/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAdmin(res.data))
      .catch(() => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow space-y-4 text-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        {admin ? (
          <>
            <p className="text-lg">Welcome, <strong>{admin.username}</strong></p>

            <div className="grid gap-4">
              <Link
                to="/admin/companies"
                className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Manage Companies
              </Link>

              <Link
                to="/admin/applications"
                className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                View Applications
              </Link>

              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
