import { useNavigate } from "react-router-dom"

const userRole =localStorage.getItem("userRole")

import {
    FaChartBar,
    FaUsers,
    FaTasks,
    FaTicketAlt,
    FaIndustry
} from "react-icons/fa"

function Sidebar() {

    const navigate = useNavigate()

    return (

        <div className="w-[260px] min-h-screen bg-slate-900 text-white p-6">

            <h1 className="text-3xl font-bold text-cyan-400 mb-10">
                PharmaOps
            </h1>

            <div className="space-y-6">

                <div
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-4 hover:text-cyan-400 cursor-pointer"
                >
                    <FaChartBar />
                    <span>Dashboard</span>
                </div>

                <div
                    onClick={() => navigate("/workflow")}
                    className="flex items-center gap-4 hover:text-cyan-400 cursor-pointer"
                >
                    <FaTasks />
                    <span>Workflow Tracking</span>
                </div>

                <div
                    onClick={() => navigate("/tickets")}
                    className="flex items-center gap-4 hover:text-cyan-400 cursor-pointer"
                >
                    <FaTicketAlt />
                    <span>IT Tickets</span>
                </div>

                {
                    userRole === "Admin" && (

                        <div
                            onClick={() => navigate("/production")}
                            className="flex items-center gap-4 hover:text-cyan-400 cursor-pointer"
                        >

                            <FaIndustry />

                            <span>Production</span>

                        </div>
                    )
                }

                {
                    userRole === "Admin" && (

                        <div
                            onClick={() => navigate("/departments")}
                            className="flex items-center gap-4 hover:text-cyan-400 cursor-pointer"
                        >

                            <FaUsers />

                            <span>Departments</span>

                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default Sidebar