import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    axios
      .get("http://placement-backend-production.up.railway.app/api/admin/applications", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setApplications(res.data))
      .catch(() => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      });
  }, [navigate]);

  const handleStatusChange = (applicationId, newStatus) => {
    const token = localStorage.getItem("adminToken");

    axios
      .put(
        `http://placement-backend-production.up.railway.app/api/admin/applications/${applicationId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setApplications((prev) =>
          prev.map((app) =>
            app.application_id === applicationId ? { ...app, status: newStatus } : app
          )
        );
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to update application status");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow space-y-4">
        <h1 className="text-2xl font-bold">Student Applications</h1>

        {applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <table className="w-full border-collapse border text-left text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Student Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Company</th>
                <th className="p-2 border">Package</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Change Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.application_id}>
                  <td className="p-2 border">{app.student_name}</td>
                  <td className="p-2 border">{app.email}</td>
                  <td className="p-2 border">{app.company_name}</td>
                  <td className="p-2 border">₹{app.salary_package} LPA</td>
                  <td className="p-2 border">{app.status}</td>
                  <td className="p-2 border">
                    <select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(app.application_id, e.target.value)
                      }
                      className="border rounded p-1"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default AdminApplications;
