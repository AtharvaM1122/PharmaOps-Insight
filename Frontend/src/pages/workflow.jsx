import { useEffect, useState } from "react"
import API from "../services/api"

import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import WorkflowStatusChart from "../components/WorkflowStatusChart"

function Workflow() {

    const [workflows, setWorkflows] = useState([])

    const [searchTerm, setSearchTerm] = useState("")

    const [selectedDepartment, setSelectedDepartment] = useState("All")

    const [selectedStatus, setSelectedStatus] = useState("All")

    const [editingId, setEditingId] = useState(null)

    const [formData, setFormData] = useState({
        batch_id: "",
        product_name: "",
        department: "",
        current_stage: "",
        status: "",
        quantity: ""
    })

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const fetchWorkflows = async () => {

        try {

            const response = await API.get("/workflows")

            setWorkflows(response.data)

        } catch (error) {

            console.log(error)
        }
    }

    const addWorkflow = async () => {

        try {

            const response = await API.post(
                "/add-workflow",
                formData
            )

            alert(response.data.message)

            fetchWorkflows()

            setFormData({

                batch_id: "",
                product_name: "",
                department: "",
                current_stage: "",
                status: "",
                quantity: ""
        })

        } catch (error) {

            console.log(error)

            alert("Failed To Add Workflow")
        }
    }

    const filteredWorkflows = workflows.filter((workflow) => {

    const matchesSearch = workflow.batch_id
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

    const matchesDepartment =
        selectedDepartment === "All"
        ||
        workflow.department === selectedDepartment

    const matchesStatus =
        selectedStatus === "All"
        ||
        workflow.status === selectedStatus

    return (
        matchesSearch
        &&
        matchesDepartment
        &&
        matchesStatus
    )
})

const workflowChartData = [

    {
        name: "Pending",
        value: filteredWorkflows.filter(
            workflow =>
                workflow.status === "Pending"
        ).length
    },

    {
        name: "Running",
        value: filteredWorkflows.filter(
            workflow =>
                workflow.status === "Running"
        ).length
    },

    {
        name: "Completed",
        value: filteredWorkflows.filter(
            workflow =>
                workflow.status === "Completed"
        ).length
    },

    {
        name: "Delayed",
        value: filteredWorkflows.filter(
            workflow =>
                workflow.status === "Delayed"
        ).length
    }
]

const updateWorkflowStatus = async (
    workflowId,
    newStatus
) => {

    try {

        await API.put(

            `/update-workflow/${workflowId}`,

            {
                status: newStatus
            }
        )

        fetchWorkflows()

    } catch (error) {

        console.log(error)
    }
}

const deleteWorkflow = async (
    workflowId
) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this workflow?"
    )

    if (!confirmDelete) {

        return
    }

    try {

        await API.delete(
            `/delete-workflow/${workflowId}`
        )

        fetchWorkflows()

    } catch (error) {

        console.log(error)
    }
}

const handleEdit = (workflow) => {

    setEditingId(workflow.workflow_id)

    setFormData({

        batch_id: workflow.batch_id,
        product_name: workflow.product_name,
        department: workflow.department,
        current_stage: workflow.current_stage,
        status: workflow.status,
        quantity: workflow.quantity
    })
}

const updateWorkflow = async () => {

    try {

        await API.put(

            `/edit-workflow/${editingId}`,

            formData
        )

        fetchWorkflows()

        setEditingId(null)

        setFormData({

            batch_id: "",
            product_name: "",
            department: "",
            current_stage: "",
            status: "",
            quantity: ""
        })

    } catch (error) {

        console.log(error)
    }
}

    useEffect(() => {

        fetchWorkflows()

    }, [])

    return (

        <div className="flex bg-slate-950 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-8">

                <Navbar />

                <div className="bg-slate-900 p-6 rounded-2xl mb-8">

                    <h1 className="text-3xl text-white font-bold mb-6">
                        Add Workflow Batch
                    </h1>

                    <div className="grid grid-cols-2 gap-4">

                        <input
                            type="text"
                            name="batch_id"
                            value={formData.batch_id}
                            placeholder="Batch ID"
                            onChange={handleChange}
                            className="p-3 rounded-lg bg-slate-800 text-white"
                        />

                        <input
                            type="text"
                            name="product_name"
                            value={formData.product_name}
                            onChange={handleChange}
                            placeholder="Product Name"
                            className="p-3 rounded-lg bg-slate-800 text-white"
                        />

                        <select
    name="department"
    value={formData.department}
    onChange={handleChange}
    className="p-3 rounded-lg bg-slate-800 text-white"
>
    <option value="">
        Select Department
    </option>

    <option value="QC">
        QC
    </option>

    <option value="Production">
        Production
    </option>

    <option value="QA">
        QA
    </option>

    <option value="Packaging">
        Packaging
    </option>
</select>

                        <input
                            type="text"
                            name="current_stage"
                            value={formData.current_stage}
                            placeholder="Current Stage"
                            onChange={handleChange}
                            className="p-3 rounded-lg bg-slate-800 text-white"
                        />

                       <select
    name="status"
    value={formData.status}
    onChange={handleChange}
    className="p-3 rounded-lg bg-slate-800 text-white"
>
    <option value="">Select Status</option>
    <option value="Pending">Pending</option>
    <option value="Running">Running</option>
    <option value="Completed">Completed</option>
    <option value="Delayed">Delayed</option>
</select>

                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            placeholder="Quantity"
                            onChange={handleChange}
                            className="p-3 rounded-lg bg-slate-800 text-white"
                        />

                    </div>
<button

    onClick={
        editingId
        ? updateWorkflow
        : addWorkflow
    }

    className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold"
>

    {
        editingId
        ? "Update Workflow"
        : "Add Workflow"
    }

</button>

                </div>

                <div className="bg-slate-900 p-6 rounded-2xl">

                    <h1 className="text-3xl text-white font-bold mb-6">
                        Workflow Tracking
                    </h1>

                    <div className="grid grid-cols-3 gap-4 mb-6">

    <input
        type="text"
        placeholder="Search Batch ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-3 rounded-lg bg-slate-800 text-white"
    />

    <select
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
        className="p-3 rounded-lg bg-slate-800 text-white"
    >

        <option value="All">All Departments</option>

        <option value="QC">QC</option>

        <option value="Production">Production</option>

        <option value="QA">QA</option>

        <option value="Packaging">Packaging</option>

    </select>

    <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="p-3 rounded-lg bg-slate-800 text-white"
    >

        <option value="All">All Status</option>

        <option value="Pending">Pending</option>

        <option value="Running">Running</option>

        <option value="Completed">Completed</option>

        <option value="Delayed">Delayed</option>

    </select>

</div>

                    <table className="w-full text-white">

                        <thead>

                            <tr className="bg-slate-800">

                                <th className="p-4">Batch ID</th>
                                <th className="p-4">Product</th>
                                <th className="p-4">Department</th>
                                <th className="p-4">Stage</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Quantity</th>
                                <th className="p-4">Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                               filteredWorkflows.map((workflow) => (

                                    <tr
                                        key={workflow.workflow_id}
                                        className="border-b border-slate-800 text-center"
                                    >

                                        <td className="p-4">
                                            {workflow.batch_id}
                                        </td>

                                        <td className="p-4">
                                            {workflow.product_name}
                                        </td>

                                        <td className="p-4">
                                            {workflow.department}
                                        </td>

                                        <td className="p-4">
                                            {workflow.current_stage}
                                        </td>

                                        <td className="p-4">

    <span
        className={`px-3 py-1 rounded-full text-sm font-semibold

        ${workflow.status === "Pending"
            ? "bg-yellow-500 text-black"

            : workflow.status === "Completed"
            ? "bg-green-500 text-white"

            : workflow.status === "Running"
            ? "bg-cyan-500 text-white"

            : "bg-red-500 text-white"
        }`}
    >

        {workflow.status}

    </span>

</td>

                                        <td className="p-4">
    {workflow.quantity}
</td>

<td className="p-4">

    <div className="flex gap-2 justify-center">

        <select
            value={workflow.status}
            onChange={(e) =>
                updateWorkflowStatus(
                    workflow.workflow_id,
                    e.target.value
                )
            }
            className="bg-slate-800 text-white p-2 rounded-lg"
        >

            <option value="Pending">Pending</option>
            <option value="Running">Running</option>
            <option value="Completed">Completed</option>
            <option value="Delayed">Delayed</option>

        </select>

        <button

            onClick={() =>
                handleEdit(workflow)
            }
            className="bg-yellow-500 hover:bg-yellow-600 px-3 py-2 rounded-lg text-black"
        >

            Edit

        </button>

        <button
            onClick={() =>
                deleteWorkflow(
                    workflow.workflow_id
                )
            }
            className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg text-white"
        >

            Delete

        </button>

    </div>

</td>

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>

                <div className="mt-8">
                    <WorkflowStatusChart
                     data={workflowChartData}
                    />
                </div>

            </div>

        </div>
    )
}

export default Workflow