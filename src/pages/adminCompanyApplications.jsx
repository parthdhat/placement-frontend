import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminCompanyApplications() {
  const { id } = useParams(); // company_id
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    axios
      .get(`http://placement-backend-production.up.railway.app/api/applications/company/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setApplications(res.data))
      .catch(() => {
        alert("Failed to load applications");
        navigate("/admin/companies");
      });
  }, [id, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow space-y-4">
        <h1 className="text-2xl font-bold">Applications for Company #{id}</h1>

        {applications.length === 0 ? (
          <p>No applications found for this company.</p>
        ) : (
          <ul className="space-y-3">
            {applications.map((app) => (
              <li
                key={app.application_id}
                className="border p-3 rounded shadow-sm space-y-1"
              >
                <h2 className="font-semibold">{app.student_name}</h2>
                <p>Email: {app.email}</p>
                <p>Applied At: {new Date(app.applied_at).toLocaleString()}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      app.status === "accepted"
                        ? "text-green-600 font-semibold"
                        : app.status === "rejected"
                        ? "text-red-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                    }
                  >
                    {app.status || "applied"}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default AdminCompanyApplications;
