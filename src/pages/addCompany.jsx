import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCompany() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    salary_package: "",
    eligibility_cgpa: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("adminToken");
      await axios.post("https://placement-backend-production.up.railway.app/api/admin/companies", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Company added successfully!");
      setForm({ name: "", description: "", salary_package: "", eligibility_cgpa: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Add New Company</h1>

        {error && <div className="text-red-500 text-center">{error}</div>}
        {success && <div className="text-green-600 text-center">{success}</div>}

        <input
          type="text"
          name="name"
          placeholder="Company Name"
          className="w-full p-2 border rounded"
          value={form.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={form.description}
          onChange={handleChange}
          required
        ></textarea>

        <input
          type="number"
          name="salary_package"
          placeholder="Salary Package (LPA)"
          className="w-full p-2 border rounded"
          value={form.salary_package}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.01"
          name="eligibility_cgpa"
          placeholder="Eligibility CGPA"
          className="w-full p-2 border rounded"
          value={form.eligibility_cgpa}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Company"}
        </button>

        <button
          type="button"
          className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
          onClick={() => navigate("/admin/manage-companies")}
        >
          Back to Manage Companies
        </button>
      </form>
    </div>
  );
}

export default AddCompany;
