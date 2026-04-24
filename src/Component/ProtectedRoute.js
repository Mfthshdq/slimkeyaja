import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Jika tidak ada token (belum login), lempar ke halaman login (/)
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Jika ada role yang ditentukan tapi tidak sesuai, arahkan ke tempat yang benar
    if (allowedRole && role !== allowedRole) {
        return <Navigate to={role === "admin" ? "/admin" : "/karyawan"} replace />;
    }

    return children;
};

export default ProtectedRoute;