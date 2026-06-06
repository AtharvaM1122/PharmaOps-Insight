import { Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Workflow from "./pages/Workflow"
import ITTickets from "./pages/ITTickets"
import Production from "./pages/Production"
import Department from "./pages/Department"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"


function App() {

  return (

    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>

      <Route path="/workflow" element={<ProtectedRoute><Workflow /></ProtectedRoute>} />

      <Route path="/tickets" element={<ProtectedRoute><ITTickets /></ProtectedRoute>} />

      <Route path="/production" element={<ProtectedRoute><AdminRoute><Production /></AdminRoute></ProtectedRoute>}/>

      <Route path="/departments" element={<ProtectedRoute><AdminRoute><Department /></AdminRoute></ProtectedRoute>}/>

    </Routes>

  )
}

export default App