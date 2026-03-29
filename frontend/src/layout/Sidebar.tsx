import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  const linkClass = (path: string) =>
    `block px-3 py-2 rounded ${
      pathname === path
        ? "bg-blue-500 text-white"
        : "text-gray-300 hover:bg-gray-700"
    }`;

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-8">LOS System</h2>

      <nav className="flex flex-col gap-2">
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          Dashboard
        </Link>
        <Link to="/loan" className={linkClass("/loan")}>
          Loan
        </Link>
        <Link to="/admin" className={linkClass("/admin")}>
          Admin
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
