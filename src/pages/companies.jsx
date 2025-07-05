import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [appliedCompanyIds, setAppliedCompanyIds] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    Promise.all([
      axios.get("https://placement-backend-production.up.railway.app/api/companies", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get("https://placement-backend-production.up.railway.app/api/applications/my", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ])
      .then(([companiesRes, applicationsRes]) => {
        setCompanies(companiesRes.data);
        const appliedIds = applicationsRes.data.map((app) => app.company_id);
        setAppliedCompanyIds(appliedIds);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load data");
      });
  }, [navigate]);

  const handleApply = (company_id) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "https://placement-backend-production.up.railway.app/api/applications/apply",
        { company_id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert("Applied successfully!");
        setAppliedCompanyIds((prev) => [...prev, company_id]);
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Application failed");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Companies</h1>

      {error && <div className="text-red-500 text-center">{error}</div>}

      {companies.length === 0 && !error && <div className="text-center">No companies available.</div>}

      <div className="grid gap-4 max-w-4xl mx-auto">
        {companies.map((company) => (
          <div key={company.company_id} className="bg-white p-4 rounded-xl shadow-md space-y-2">
            <h2 className="text-xl font-semibold">{company.name}</h2>
            <p className="text-gray-700">{company.description}</p>
            <p><strong>Salary:</strong> ₹{company.salary_package} LPA</p>
            <p><strong>Eligibility CGPA:</strong> {company.eligibility_cgpa}</p>

            {appliedCompanyIds.includes(company.company_id) ? (
              <div className="inline-block bg-gray-300 text-gray-800 px-3 py-1 rounded-full text-sm">
                ✅ Applied
              </div>
            ) : (
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => handleApply(company.company_id)}
              >
                Apply
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Companies;
