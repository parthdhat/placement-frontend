import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    branch: "",
    cgpa: "",
    resume_link: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("http://placement-backend-production.up.railway.app/api/students/register", form);
      alert("Registration successful! Please login.");
      navigate("/login"); // ✅ Redirect to login page
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg space-y-4">
        <h1 className="text-2xl font-bold text-center">Student Registration</h1>

        {error && <div className="text-red-500 text-center">{error}</div>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="branch"
          placeholder="Branch"
          className="w-full p-2 border rounded"
          value={form.branch}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.01"
          name="cgpa"
          placeholder="CGPA"
          className="w-full p-2 border rounded"
          value={form.cgpa}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="resume_link"
          placeholder="Resume Link"
          className="w-full p-2 border rounded"
          value={form.resume_link}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-gray-500 text-sm">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
