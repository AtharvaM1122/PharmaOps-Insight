import { useState } from "react"
import { useNavigate } from "react-router-dom"

import API from "../services/api"

function Login() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async () => {

        try {

            const response = await API.post(
                "/login",
                formData
            )

            localStorage.setItem(
                "isLoggedIn",
                "true"
            )

            localStorage.setItem(
                "userName",
                response.data.name
            )

            localStorage.setItem(
                "userDepartment",
                response.data.department
            )

            localStorage.setItem(
                "userRole",
                response.data.role
            )

            navigate("/dashboard")

        } catch (error) {

            alert("Invalid Credentials")
        }
    }

    return (

        <div className="min-h-screen bg-slate-950 flex items-center justify-center">

            <div className="bg-slate-900 p-10 rounded-2xl w-[400px]">

                <h1 className="text-white text-3xl font-bold mb-6">
                    Login
                </h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full p-3 mb-6 rounded-lg bg-slate-800 text-white"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-lg font-semibold"
                >
                    Login
                </button>

                <p className="text-slate-400 text-center mt-4">

                    Don't have an account?

                    <span
                        onClick={() => navigate("/register")}
                        className="text-cyan-400 cursor-pointer ml-2"
                    >
                        Register
                    </span>

                </p>

            </div>

        </div>
    )
}

export default Login