import { useEffect, useState } from "react"
import API from "../services/api"

import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import StatCard from "../components/StatCard"

function Department() {

    const [departments, setDepartments] = useState([])

    const [searchTerm, setSearchTerm] = useState("")

    const [selectedStatus, setSelectedStatus] =
        useState("All")

    const [formData, setFormData] = useState({

        department_name: "",
        department_head: "",
        employee_count: "",
        status: ""
    })

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value
        })
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

    const addDepartment = async () => {

        try {

            const response = await API.post(

                "/add-department",

                formData
            )

            alert(response.data.message)

            fetchDepartments()

            setFormData({

                department_name: "",
                department_head: "",
                employee_count: "",
                status: ""
            })

        } catch (error) {

            console.log(error)

            alert("Failed To Add Department")
        }
    }

    const updateDepartmentStatus = async (
    id,
    status
) => {

    try {

        await API.put(
            `/update-department/${id}`,
            { status }
        )

        fetchDepartments()

    } catch (error) {

        console.log(error)
    }
}

const deleteDepartment = async (id) => {

    try {

        await API.delete(
            `/delete-department/${id}`
        )

        fetchDepartments()

    } catch (error) {

        console.log(error)
    }
}

    const filteredDepartments =
    departments.filter((department) => {

        const matchesSearch =
            department.department_name
                .toLowerCase()
                .includes(
                    searchTerm.toLowerCase()
                )

        const matchesStatus =
            selectedStatus === "All"
            ||
            department.status === selectedStatus

        return (
            matchesSearch
            &&
            matchesStatus
        )
    })

    const departmentStats = {

    total_departments:
        filteredDepartments.length,

    active_departments:
        filteredDepartments.filter(
            department =>
                department.status === "Active"
        ).length,

    inactive_departments:
        filteredDepartments.filter(
            department =>
                department.status === "Inactive"
        ).length,

    total_employees:
        filteredDepartments.reduce(
            (sum, department) =>
                sum +
                Number(department.employee_count),
            0
        )
}

    useEffect(() => {

        fetchDepartments()

    }, [])

    return (

        <div className="flex bg-slate-950 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-8">

                <Navbar />

                <h1 className="text-3xl text-white font-bold mb-8">

                    Department Management

                </h1>

                <div className="grid grid-cols-4 gap-6 mb-8">

    <StatCard
        title="Departments"
        value={departmentStats.total_departments}
    />

    <StatCard
        title="Active"
        value={departmentStats.active_departments}
    />

    <StatCard
        title="Inactive"
        value={departmentStats.inactive_departments}
    />

    <StatCard
        title="Employees"
        value={departmentStats.total_employees}
    />

</div>

<div className="bg-slate-900 p-6 rounded-2xl mb-8">

    <h2 className="text-2xl text-white font-bold mb-6">
        Add Department
    </h2>

    <div className="grid grid-cols-2 gap-4">

        <input
            type="text"
            name="department_name"
            value={formData.department_name}
            onChange={handleChange}
            placeholder="Department Name"
            className="p-3 rounded-lg bg-slate-800 text-white"
        />

        <input
            type="text"
            name="department_head"
            value={formData.department_head}
            onChange={handleChange}
            placeholder="Department Head"
            className="p-3 rounded-lg bg-slate-800 text-white"
        />

        <input
            type="number"
            name="employee_count"
            value={formData.employee_count}
            onChange={handleChange}
            placeholder="Employee Count"
            className="p-3 rounded-lg bg-slate-800 text-white"
        />

        <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="p-3 rounded-lg bg-slate-800 text-white"
        >

            <option value="">
                Select Status
            </option>

            <option value="Active">
                Active
            </option>

            <option value="Inactive">
                Inactive
            </option>

        </select>

    </div>

    <button
        onClick={addDepartment}
        className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold"
    >
        Add Department
    </button>

</div>

<div className="grid grid-cols-2 gap-4 mb-6">

    <input
        type="text"
        placeholder="Search Department"
        value={searchTerm}
        onChange={(e) =>
            setSearchTerm(e.target.value)
        }
        className="p-3 rounded-lg bg-slate-800 text-white"
    />

    <select
        value={selectedStatus}
        onChange={(e) =>
            setSelectedStatus(e.target.value)
        }
        className="p-3 rounded-lg bg-slate-800 text-white"
    >

        <option value="All">
            All Status
        </option>

        <option value="Active">
            Active
        </option>

        <option value="Inactive">
            Inactive
        </option>

    </select>

</div>

<div className="bg-slate-900 p-6 rounded-2xl overflow-auto">

    <h2 className="text-2xl text-white font-bold mb-6">
        Department Records
    </h2>

    <table className="w-full text-white">

        <thead>

            <tr className="bg-slate-800">

                <th className="p-4">Department</th>
                <th className="p-4">Head</th>
                <th className="p-4">Employees</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>

            </tr>

        </thead>

        <tbody>

            {
                filteredDepartments.map(
                    (department) => (

                    <tr
                        key={department.department_id}
                        className="border-b border-slate-800 text-center"
                    >

                        <td className="p-4">
                            {department.department_name}
                        </td>

                        <td className="p-4">
                            {department.department_head}
                        </td>

                        <td className="p-4">
                            {department.employee_count}
                        </td>

                        <td className="p-4">

    <select

        value={department.status}

        onChange={(e) =>
            updateDepartmentStatus(
                department.department_id,
                e.target.value
            )
        }

        className="bg-slate-700 text-white px-2 py-1 rounded"
    >

        <option value="Active">
            Active
        </option>

        <option value="Inactive">
            Inactive
        </option>

    </select>

</td>

<td className="p-4">

    <button

        onClick={() => {

    if (
        window.confirm(
            "Delete this department?"
        )
    ) {

        deleteDepartment(
            department.department_id
        )
    }
}}

        className="bg-red-500 px-3 py-1 rounded text-white"
    >

        Delete

    </button>

</td>

                    </tr>
                ))
            }

        </tbody>

    </table>

</div>

            </div>

        </div>
    )
}

export default Department