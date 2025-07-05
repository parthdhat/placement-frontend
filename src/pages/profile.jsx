import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [student, setStudent] = useState(null);
  const [resumeLink, setResumeLink] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://placement-backend-production.up.railway.app/api/students/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStudent(response.data);
        setResumeLink(response.data.resume_link || "");
        setCgpa(response.data.cgpa || "");
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://placement-backend-production.up.railway.app/api/students/profile",
        { resume_link: resumeLink, cgpa },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!student)
    return (
      <div className="min-h-screen flex justify-center items-center">Loading...</div>
    );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow p-6 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Student Profile</h1>

        <div className="space-y-1 text-gray-700">
          <p>
            <strong>Name:</strong> {student.name}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
          <p>
            <strong>Branch:</strong> {student.branch}
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-3">
          <input
            type="url"
            className="w-full border rounded p-2"
            placeholder="Resume Link"
            value={resumeLink}
            onChange={(e) => setResumeLink(e.target.value)}
            required
          />

          <input
            type="number"
            step="0.01"
            className="w-full border rounded p-2"
            placeholder="CGPA"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {success && <div className="text-green-600 text-center">{success}</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}
      </div>
    </div>
  );
}

export default Profile;
