import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://placement-backend-production.up.railway.app/api/applications/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setApplications(res.data);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load applications");
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Applications</h1>

      {error && <div className="text-red-500 text-center">{error}</div>}

      {applications.length === 0 && !error && (
        <div className="text-center text-gray-500">You have not applied to any companies yet.</div>
      )}

      <div className="max-w-4xl mx-auto space-y-4">
        {applications.map((app) => (
          <div key={app.application_id} className="bg-white p-4 rounded-xl shadow space-y-1">
            <h2 className="text-xl font-semibold">{app.company_name}</h2>
            <p><strong>Salary Package:</strong> ₹{app.salary_package} LPA</p>
            <p><strong>Status:</strong> <span className="font-medium">{app.status}</span></p>
            <p className="text-sm text-gray-500"><strong>Applied At:</strong> {new Date(app.applied_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyApplications;
