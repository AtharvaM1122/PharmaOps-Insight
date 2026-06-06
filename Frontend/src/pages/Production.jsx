import { useEffect, useState } from "react"
import API from "../services/api"

import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import StatCard from "../components/StatCard"
import WorkflowStatusChart from "../components/WorkflowStatusChart"

function Production() {

    const [productions, setProductions] = useState([])

    const [searchTerm, setSearchTerm] = useState("")

    const [selectedStatus, setSelectedStatus] =
        useState("All")

    const [formData, setFormData] = useState({

        batch_id: "",
        product_name: "",
        planned_quantity: "",
        produced_quantity: "",
        status: "",
        production_date: ""
    })

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value
        })
    }

    const fetchProductions = async () => {

        try {

            const response =
                await API.get("/productions")

            setProductions(response.data)

        } catch (error) {

            console.log(error)
        }
    }

const addProduction = async () => {

    try {

        const response = await API.post(

            "/add-production",

            formData
        )

        alert(response.data.message)

        fetchProductions()

        setFormData({

            batch_id: "",
            product_name: "",
            planned_quantity: "",
            produced_quantity: "",
            status: "",
            production_date: ""
        })

    } catch (error) {

        console.log(error)

        alert("Failed To Add Production")
    }
}

const deleteProduction = async (id) => {

    try {

        await API.delete(
            `/delete-production/${id}`
        )

        fetchProductions()

    } catch (error) {

        console.log(error)
    }
}

const updateProductionStatus = async (
    id,
    status
) => {

    try {

        await API.put(

            `/update-production/${id}`,

            {
                status
            }
        )

        fetchProductions()

    } catch (error) {

        console.log(error)
    }
}

const filteredProductions =
    productions.filter((production) => {

        const matchesSearch =
            production.batch_id
                .toLowerCase()
                .includes(
                    searchTerm.toLowerCase()
                )

        const matchesStatus =
            selectedStatus === "All"
            ||
            production.status === selectedStatus

        return (
            matchesSearch
            &&
            matchesStatus
        )
    })

const productionStats = {

    total_batches:
        filteredProductions.length,

    running_batches:
        filteredProductions.filter(
            production =>
                production.status === "Running"
        ).length,

    completed_batches:
        filteredProductions.filter(
            production =>
                production.status === "Completed"
        ).length,

    production_efficiency:

        filteredProductions.length > 0

        ?

        Math.round(

            filteredProductions.reduce(

                (total, production) =>

                    total +

                    (
                        Number(
                            production.produced_quantity
                        )

                        /

                        Number(
                            production.planned_quantity
                        )

                        * 100
                    ),

                0

            )

            /

            filteredProductions.length

        )

        : 0
}

const productionChartData = [

    {
        name: "Pending",
        value: filteredProductions.filter(
            production =>
                production.status === "Pending"
        ).length
    },

    {
        name: "Running",
        value: filteredProductions.filter(
            production =>
                production.status === "Running"
        ).length
    },

    {
        name: "Completed",
        value: filteredProductions.filter(
            production =>
                production.status === "Completed"
        ).length
    }
]

    useEffect(() => {

        fetchProductions()

    }, [])

    return (

        <div className="flex bg-slate-950 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-8">

                <Navbar />

<h1 className="text-3xl text-white font-bold mb-8">
    Production Management
</h1>

<div className="grid grid-cols-4 gap-6 mb-8">

    <StatCard
        title="Total Batches"
        value={productionStats.total_batches}
    />

    <StatCard
        title="Running"
        value={productionStats.running_batches}
    />

    <StatCard
        title="Completed"
        value={productionStats.completed_batches}
    />

    <StatCard
        title="Efficiency %"
        value={productionStats.production_efficiency}
    />

</div>

<div className="mb-8">

    <WorkflowStatusChart
        data={productionChartData}
    />

</div>

<div className="bg-slate-900 p-6 rounded-2xl mb-8">

    <h2 className="text-2xl text-white font-bold mb-6">
        Add Production Batch
    </h2>

    <div className="grid grid-cols-2 gap-4">

        <input
            type="text"
            name="batch_id"
            value={formData.batch_id}
            onChange={handleChange}
            placeholder="Batch ID"
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

        <input
            type="number"
            name="planned_quantity"
            value={formData.planned_quantity}
            onChange={handleChange}
            placeholder="Planned Quantity"
            className="p-3 rounded-lg bg-slate-800 text-white"
        />

        <input
            type="number"
            name="produced_quantity"
            value={formData.produced_quantity}
            onChange={handleChange}
            placeholder="Produced Quantity"
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

            <option value="Pending">
                Pending
            </option>

            <option value="Running">
                Running
            </option>

            <option value="Completed">
                Completed
            </option>

        </select>

        <input
            type="date"
            name="production_date"
            value={formData.production_date}
            onChange={handleChange}
            className="p-3 rounded-lg bg-slate-800 text-white"
        />

    </div>

    <button
        onClick={addProduction}
        className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold"
    >

        Add Production

</button>

</div>

<div className="bg-slate-900 p-6 rounded-2xl overflow-auto">

    <h2 className="text-2xl text-white font-bold mb-6">
        Production Records
    </h2>

    <div className="grid grid-cols-2 gap-4 mb-6">

    <input
        type="text"
        placeholder="Search Batch ID"
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

        <option value="Pending">
            Pending
        </option>

        <option value="Running">
            Running
        </option>

        <option value="Completed">
            Completed
        </option>

    </select>

</div>

    <table className="w-full text-white">

        <thead>

            <tr className="bg-slate-800">

                <th className="p-4">Batch ID</th>
                <th className="p-4">Product</th>
                <th className="p-4">Planned</th>
                <th className="p-4">Produced</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4">Actions</th>

            </tr>

        </thead>

        <tbody>

            {
                filteredProductions.map((production) => (

                    <tr
                        key={production.production_id}
                        className="border-b border-slate-800 text-center"
                    >

                        <td className="p-4">
                            {production.batch_id}
                        </td>

                        <td className="p-4">
                            {production.product_name}
                        </td>

                        <td className="p-4">
                            {production.planned_quantity}
                        </td>

                        <td className="p-4">
                            {production.produced_quantity}
                        </td>

                        <td className="p-4">

                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold

                                ${
                                    production.status === "Completed"
                                    ? "bg-green-500 text-white"

                                    : production.status === "Running"
                                    ? "bg-cyan-500 text-white"

                                    : "bg-yellow-500 text-black"
                                }`}
                            >

                                {production.status}

                            </span>

                        </td>

                        <td className="p-4">
                            {production.production_date}
                        </td>

<td className="p-4">

    <div className="flex gap-2 justify-center">

<select

    value={production.status}

    onChange={(e) =>
        updateProductionStatus(
            production.production_id,
            e.target.value
        )
    }

    className="bg-slate-700 text-white px-2 py-1 rounded"
>

    <option value="Pending">
        Pending
    </option>

    <option value="Running">
        Running
    </option>

    <option value="Completed">
        Completed
    </option>

</select>

        <button

            onClick={() =>
                deleteProduction(
                    production.production_id
                )
            }

            className="bg-red-500 px-3 py-1 rounded text-white"
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

            </div>

        </div>

    )

}

export default Production