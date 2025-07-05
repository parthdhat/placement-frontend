import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4">
      <div className="text-center space-y-6 max-w-lg">
        <h1 className="text-4xl font-bold">Welcome to College Placement Portal</h1>
        <p className="text-lg">Manage your applications, find the right job, or control placements as admin.</p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/login"
            className="bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Student Login
          </Link>

          <Link
            to="/register"
            className="bg-green-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-600 transition"
          >
            Student Register
          </Link>

          <Link
            to="/admin/login"
            className="bg-gray-900 text-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
