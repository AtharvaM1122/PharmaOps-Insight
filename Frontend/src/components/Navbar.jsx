import { useNavigate } from "react-router-dom"

function Navbar() {

    const navigate = useNavigate()

    const userName =localStorage.getItem("userName")

    const userDepartment =localStorage.getItem("userDepartment")

    const userRole =localStorage.getItem("userRole")

    const handleLogout = () => {

        localStorage.removeItem(
            "isLoggedIn"
        )

        navigate("/")
    }

    return (

        <div className="bg-slate-900 p-6 rounded-2xl mb-8 flex justify-between items-center">

            <h1 className="text-white text-3xl font-bold">
                Operations Dashboard
            </h1>

            <div className="flex items-center gap-4">

                <div className="text-right">

                    <p className="text-white font-semibold">

                        Welcome, {userName}

                    </p>

                    <p className="text-slate-400 text-sm">

                        {userDepartment} Department | {userRole}

                    </p>

                </div>

                <button

                    onClick={handleLogout}

                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"

                >
                    Logout
                </button>

            </div>

        </div>
    )
}

export default Navbar