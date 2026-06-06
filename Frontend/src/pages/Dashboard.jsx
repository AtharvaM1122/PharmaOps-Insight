import { useEffect, useState } from "react"

import API from "../services/api"

import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import StatCard from "../components/StatCard"
import WorkflowChart from "../components/WorkflowChart"
import DepartmentBarChart from "../components/DepartmentBarChart"
import ProductionTrendChart from "../components/ProductionTrendChart"


function Dashboard() {

    const exportReport = () => {

    const reportData = [

        ["Metric", "Value"],

        ["Total Workflows",
            filteredStats.total
        ],

        ["Pending Workflows",
            filteredStats.pending
        ],

        ["Running Workflows",
            filteredStats.running
        ],

        ["Completed Workflows",
            filteredStats.completed
        ],

        ["Delayed Workflows",
            filteredStats.delayed
        ],

        ["Active Departments",
            stats.active_departments
        ],

        ["High Priority Tickets",
            stats.high_priority_tickets
        ],

        ["Most Active Department",
            stats.most_active_department
        ]
    ]

    const csvContent =
        reportData
            .map(row => row.join(","))
            .join("\n")

    const blob = new Blob(
        [csvContent],
        { type: "text/csv" }
    )

    const url =
        window.URL.createObjectURL(blob)

    const link =
        document.createElement("a")

    link.href = url

    link.download =
        "Dashboard_Report.csv"

    link.click()
}

    const [stats, setStats] = useState({

        total_workflows: 0,
        pending_workflows: 0,
        running_workflows: 0,
        completed_workflows: 0,
        delayed_workflows: 0,
        active_departments: 0,
        high_priority_tickets: 0,
        most_active_department: ""
    })

    const [departmentData, setDepartmentData] = useState([])

    const [departments, setDepartments] =useState([])

    const [workflows, setWorkflows] =useState([])

    const [selectedDepartment, setSelectedDepartment] =useState("All")

    const [selectedStatus, setSelectedStatus] =useState("All")

    const [productionTrend, setProductionTrend] = useState([])

    const [delayedWorkflows, setDelayedWorkflows] = useState([])

const filteredDepartmentData =
    selectedDepartment === "All"

    ? departmentData

    : departmentData.filter(
        item =>
            item.department ===
            selectedDepartment
    )

const filteredWorkflows =
    workflows.filter(workflow => {

        const departmentMatch =

            selectedDepartment === "All"

            ||

            workflow.department ===
            selectedDepartment

        const statusMatch =

            selectedStatus === "All"

            ||

            workflow.status ===
            selectedStatus

        return (
            departmentMatch &&
            statusMatch
        )
    })

    const filteredStats = {

    total:
        filteredWorkflows.length,

    pending:
        filteredWorkflows.filter(
            workflow =>
                workflow.status ===
                "Pending"
        ).length,

    running:
        filteredWorkflows.filter(
            workflow =>
                workflow.status ===
                "Running"
        ).length,

    completed:
        filteredWorkflows.filter(
            workflow =>
                workflow.status ===
                "Completed"
        ).length,

    delayed:
        filteredWorkflows.filter(
            workflow =>
                workflow.status ===
                "Delayed"
        ).length
}

    const chartData = [

    {
        name: "Pending",
        value: filteredStats.pending
    },

    {
        name: "Running",
        value: filteredStats.running
    },

    {
        name: "Completed",
        value: filteredStats.completed
    },

    {
        name: "Delayed",
        value: filteredStats.delayed
    }

]

    const fetchStats = async () => {

        try {

            const response = await API.get(
                "/dashboard-stats"
            )

            setStats(response.data)

        } catch (error) {

            console.log(error)
        }
    }

    const fetchDepartmentStats = async () => {

    try {

        const response = await API.get(
            "/department-stats"
        )

        setDepartmentData(response.data)

    } catch (error) {

        console.log(error)
    }
}

    const fetchDelayedWorkflows = async () => {

    try {

        const response = await API.get(
            "/delayed-workflows"
        )

        setDelayedWorkflows(response.data)

    } catch (error) {

        console.log(error)
    }
}

const fetchProductionTrend = async () => {

    try {

        const response =
            await API.get(
                "/production-trend"
            )

        setProductionTrend(
            response.data
        )

    } catch (error) {

        console.log(error)
    }
}

const fetchWorkflows = async () => {

    try {

        const response =
            await API.get("/workflows")

        setWorkflows(response.data)

    } catch (error) {

        console.log(error)
    }
}

const fetchDepartments = async () => {

    try {

        const response =
            await API.get("/departments")

        setDepartments(response.data)

    } catch (error) {

        console.log(error)
    }
}

   useEffect(() => {

    fetchStats()

    fetchDepartmentStats()

    fetchDelayedWorkflows()

    fetchProductionTrend()

    fetchWorkflows()

    fetchDepartments()

    }, [])

    return (

        <div className="flex bg-slate-950 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-8">

                <Navbar />

                <div className="flex justify-end mb-6">

    <button

        onClick={exportReport}

        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
    >

        Export Report

    </button>

</div>

                <div className="flex gap-4 mb-8">

    <select

        value={selectedDepartment}

        onChange={(e) =>
            setSelectedDepartment(
                e.target.value
            )
        }

        className="bg-slate-800 text-white p-3 rounded-lg"
    >

        <option value="All">
    All Departments
</option>

{
    departments.map(
        (department) => (

        <option
            key={
                department.department_id
            }
            value={
                department.department_name
            }
        >

            {
                department.department_name
            }

        </option>
    ))
}

    </select>

    <select

        value={selectedStatus}

        onChange={(e) =>
            setSelectedStatus(
                e.target.value
            )
        }

        className="bg-slate-800 text-white p-3 rounded-lg"
    >

        <option value="All">
            All Status
        </option>

        <option value="Pending">
            Pending
        </option>

        <option value="Running">
            Running
        </option>

        <option value="Completed">
            Completed
        </option>

        <option value="Delayed">
            Delayed
        </option>

    </select>

</div>

                <div className="grid grid-cols-5 gap-6 mb-8">

                    <StatCard
                        title="Total Workflows"
                        value={filteredStats.total}
                    />

                    <StatCard
                        title="Pending Workflows"
                        value={filteredStats.pending}
                    />

                    <StatCard
                        title="Completed Workflows"
                        value={filteredStats.completed}
                    />

                    <StatCard
                        title="Active Departments"
                        value={stats.active_departments}
                    />

                    <StatCard
                        title="Delayed Workflows"
                        value={filteredStats.delayed}
                    />

                </div>

                <div className="grid grid-cols-2 gap-6">

                    <div className="bg-slate-900 p-6 rounded-2xl">

                        <h2 className="text-white text-2xl font-bold mb-4">
                            Workflow Intelligence
                        </h2>

                        <div className="space-y-4">

    <div className="bg-slate-800 p-4 rounded-xl text-white">

        Pending Workflows:
        <span className="text-yellow-400 font-bold">
            {" "} {filteredStats.pending}
        </span>

    </div>

    <div className="bg-slate-800 p-4 rounded-xl text-white">

        Running Workflows:
        <span className="text-cyan-400 font-bold">
            {" "} {filteredStats.running}
        </span>

    </div>

    <div className="bg-slate-800 p-4 rounded-xl text-white">

        Delayed Workflows:
        <span className="text-red-400 font-bold">
            {" "} {filteredStats.delayed}
        </span>

    </div>

</div>

                    </div>

                    <div className="bg-slate-900 p-6 rounded-2xl">

                        <h2 className="text-white text-2xl font-bold mb-4">
                            Department Monitoring
                        </h2>

                        <div className="space-y-4">

    <div className="bg-slate-800 p-4 rounded-xl text-white">

        Most Active Department:

        <span className="text-cyan-400 font-bold">

            {" "}
            {stats.most_active_department}

        </span>

    </div>

    <div className="bg-slate-800 p-4 rounded-xl text-white">

        Active Departments:

        <span className="text-green-400 font-bold">

            {" "}
            {stats.active_departments}

        </span>

    </div>

    <div className="bg-slate-800 p-4 rounded-xl text-white">

        High Priority Tickets:

        <span className="text-red-400 font-bold">

            {" "}
            {stats.high_priority_tickets}

        </span>

    </div>

</div>

                    </div>

                </div>

                <div className="grid grid-cols-2 gap-6 mt-8">

                    <WorkflowChart
                        data={chartData}
                    />

                    <DepartmentBarChart
                        data={filteredDepartmentData}
                    />

                </div>

                <div className="mt-8">

                    <ProductionTrendChart
                        data={productionTrend}
                    />

                </div>

                
                <div className="mt-8 bg-slate-900 p-6 rounded-2xl">

    <h2 className="text-2xl font-bold text-red-400 mb-6">

        ⚠ Delayed Workflow Alerts

    </h2>

    {
        delayedWorkflows.length === 0 ? (

            <p className="text-slate-300">
                No delayed workflows detected.
            </p>

        ) : (

            <div className="space-y-4">

                {
                    delayedWorkflows
                    
                    .filter(workflow =>

    selectedDepartment === "All"

    ||

    workflow.department ===
    selectedDepartment
)

                    
                    .map((workflow, index) => (

                        <div
                            key={index}
                            className="bg-slate-800 p-4 rounded-xl text-white border-l-4 border-red-500"
                        >

                            Batch
                            <span className="text-red-400 font-bold">
                                {" "} {workflow.batch_id}
                            </span>

                            {" "} delayed in

                            <span className="text-yellow-400 font-bold">
                                {" "} {workflow.department}
                            </span>

                        </div>
                    ))
                }

            </div>
        )
    }

</div>

            </div>

        </div>
    )
}

export default Dashboard