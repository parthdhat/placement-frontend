import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("https://placement-backend-production.up.railway.app/api/students/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load profile");
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>

        {error && <div className="text-red-500">{error}</div>}

        {student ? (
          <div className="space-y-3">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>

            <div className="space-y-2">
              <Link
                to="/companies"
                className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                View Companies
              </Link>

              <Link
                to="/my-applications"
                className="block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
              >
                My Applications
              </Link>

              <Link
                to="/profile"
                className="block bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                View Profile
              </Link>

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          !error && <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
