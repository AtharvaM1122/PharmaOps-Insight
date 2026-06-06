import { useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"

function Register() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        department: ""
    })

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = async () => {

        try {

            const response = await API.post(
                "/register",
                formData
            )

            alert(response.data.message)

        } catch (error) {

            alert("Registration Failed")
        }
    }

    return (

        <div className="min-h-screen bg-slate-950 flex items-center justify-center">

            <div className="bg-slate-900 p-10 rounded-2xl w-[400px]">

                <h1 className="text-white text-3xl font-bold mb-6">
                    Register
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
                />

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
                    className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
                />

                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    onChange={handleChange}
                    className="w-full p-3 mb-6 rounded-lg bg-slate-800 text-white"
                />

                <button
                    onClick={handleRegister}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-lg font-semibold"
                >
                    Register
                </button>

                <p className="text-slate-400 text-center mt-4">

                    Already have an account?

                    <span
                        onClick={() => navigate("/")}
                        className="text-cyan-400 cursor-pointer ml-2"
                    >
                        Login
                    </span>

                </p>

            </div>

        </div>
    )
}

export default Register