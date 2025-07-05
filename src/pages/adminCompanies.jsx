import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function AdminCompanies() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    axios
      .get("http://placement-backend-production.up.railway.app/api/admin/companies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCompanies(res.data))
      .catch(() => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow space-y-4">

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Manage Companies</h1>
          <Link
            to="/admin/add-company"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ➕ Add Company
          </Link>
        </div>

        {companies.length === 0 ? (
          <p>No companies available.</p>
        ) : (
          <ul className="space-y-2">
           {companies.map((company) => (
  <li
    key={company.company_id}
    className="border p-3 rounded shadow-sm space-y-2"
  >
    <h2 className="text-lg font-semibold">{company.name}</h2>
    <p>{company.description}</p>
    <p className="text-sm text-gray-600">Package: ₹{company.salary_package} LPA</p>
    <p className="text-sm text-gray-600">Eligibility CGPA: {company.eligibility_cgpa}</p>

    <div className="flex gap-2 mt-2">
      <button
        onClick={() => navigate(`/admin/companies/${company.company_id}/applications`)}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        View Applications
      </button>
      {/* Future: Add Edit/Delete if needed */}
    </div>
  </li>
))}

          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminCompanies;
