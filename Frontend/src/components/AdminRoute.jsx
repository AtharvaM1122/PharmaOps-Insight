import { Navigate } from "react-router-dom"

function AdminRoute({ children }) {

    const role =
        localStorage.getItem("userRole")

    return role === "Admin"

        ? children

        : <Navigate to="/dashboard" />
}

export default AdminRoute