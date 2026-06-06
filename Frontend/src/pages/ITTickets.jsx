import { useEffect, useState } from "react"

import API from "../services/api"

import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import StatCard from "../components/StatCard"


function ITTickets() {

    const [tickets, setTickets] = useState([])

    const [stats, setStats] = useState({

    total_tickets: 0,
    pending_tickets: 0,
    completed_tickets: 0,
    high_priority: 0
    })

    

    const [searchTerm, setSearchTerm] = useState("")

    const [selectedPriority, setSelectedPriority] = useState("All")

    const [selectedStatus, setSelectedStatus] = useState("All")

    const [formData, setFormData] = useState({

        department: "",
        issue_type: "",
        description: "",
        priority: "",
        status: "Pending"
    })

    const fetchTickets = async () => {

        try {

            const response = await API.get("/tickets")

            setTickets(response.data)

        } catch (error) {

            console.log(error)
        }
    }

    const fetchTicketStats = async () => {

    try {

        const response = await API.get(
            "/ticket-stats"
        )

        setStats(response.data)

    } catch (error) {

        console.log(error)
        }
    }

   

const filteredTickets = tickets.filter((ticket) => {

    const matchesSearch =
        ticket.department
            .toLowerCase()
            .includes(searchTerm.toLowerCase())

    const matchesPriority =
        selectedPriority === "All"
        ||
        ticket.priority === selectedPriority

    const matchesStatus =
        selectedStatus === "All"
        ||
        ticket.status === selectedStatus

    return (
        matchesSearch
        &&
        matchesPriority
        &&
        matchesStatus
    )
})

const dynamicStats = {

    total_tickets:
        filteredTickets.length,

    pending_tickets:
        filteredTickets.filter(
            ticket =>
                ticket.status === "Pending"
        ).length,

    completed_tickets:
        filteredTickets.filter(
            ticket =>
                ticket.status === "Completed"
        ).length,

    high_priority:
        filteredTickets.filter(
            ticket =>
                ticket.priority === "High"
        ).length
}




   useEffect(() => {

    fetchTickets()

    fetchTicketStats()

    
}, [])

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            await API.post(
                "/add-ticket",
                formData
            )

            fetchTickets()
            fetchTicketStats()
            

            setFormData({

                department: "",
                issue_type: "",
                description: "",
                priority: "",
                status: "Pending"
            })

        } catch (error) {

            console.log(error)
        }
    }

    const updateTicketStatus = async (
    id,
    status
) => {

    try {

        await API.put(
            `/update-ticket/${id}`,
            { status }
        )

        fetchTickets()

    } catch (error) {

        console.log(error)
    }
}

const deleteTicket = async (id) => {

    const confirmDelete =
        window.confirm(
            "Delete this ticket?"
        )

    if (!confirmDelete)
        return

    try {

        await API.delete(
            `/delete-ticket/${id}`
        )

        fetchTickets()

    } catch (error) {

        console.log(error)
    }
}

    return (

        <div className="flex bg-slate-950 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-8">

                <Navbar />

                <div className="grid grid-cols-4 gap-6 mb-8">

                    <StatCard
                        title="Total Tickets"
                        value={dynamicStats.total_tickets}
                    />

                    <StatCard
                        title="Pending Tickets"
                       value={dynamicStats.pending_tickets}
                    />

                    <StatCard
                        title="Completed Tickets"
                        value={dynamicStats.completed_tickets}
                    />

                    <StatCard
                        title="High Priority"
                        value={dynamicStats.high_priority}
                    />

                </div>

                <h1 className="text-3xl text-white font-bold mb-6">
                    IT Ticket Management
                </h1>

                <div className="grid grid-cols-3 gap-4 mb-6">

    <input
        type="text"
        placeholder="Search Department"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-3 rounded-lg bg-slate-800 text-white"
    />

    <select
        value={selectedPriority}
        onChange={(e) =>
            setSelectedPriority(e.target.value)
        }
        className="p-3 rounded-lg bg-slate-800 text-white"
    >

        <option value="All">
            All Priorities
        </option>

        <option value="High">
            High
        </option>

        <option value="Medium">
            Medium
        </option>

        <option value="Low">
            Low
        </option>

    </select>

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

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-4 bg-slate-900 p-6 rounded-2xl mb-8"
                >

                    <input
                        type="text"
                        name="department"
                        placeholder="Department"
                        value={formData.department}
                        onChange={handleChange}
                        className="p-3 rounded-lg bg-slate-800 text-white"
                    />

                    <input
                        type="text"
                        name="issue_type"
                        placeholder="Issue Type"
                        value={formData.issue_type}
                        onChange={handleChange}
                        className="p-3 rounded-lg bg-slate-800 text-white"
                    />

                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="p-3 rounded-lg bg-slate-800 text-white"
                    />

                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="p-3 rounded-lg bg-slate-800 text-white"
                    >

                        <option value="">
                            Select Priority
                        </option>

                        <option value="High">
                            High
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="Low">
                            Low
                        </option>

                    </select>

                    <button
                        type="submit"
                        className="bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-lg col-span-2"
                    >

                        Create Ticket

                    </button>

                </form>

                <div className="bg-slate-900 p-6 rounded-2xl overflow-auto">

                    <table className="w-full text-white">

                        <thead>

                            <tr className="border-b border-slate-700">

                                <th className="p-4 text-left">
                                    Department
                                </th>

                                <th className="p-4 text-left">
                                    Issue Type
                                </th>

                                <th className="p-4 text-left">
                                    Description
                                </th>

                                <th className="p-4 text-left">
                                    Priority
                                </th>

                                <th className="p-4 text-left">
                                    Status
                                </th>

                                <th className="p-4 text-left">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                filteredTickets.map((ticket) => (

                                    <tr
                                        key={ticket.ticket_id}
                                        className="border-b border-slate-800"
                                    >

                                        <td className="p-4">
                                            {ticket.department}
                                        </td>

                                        <td className="p-4">
                                            {ticket.issue_type}
                                        </td>

                                        <td className="p-4">
                                            {ticket.description}
                                        </td>

                                       <td className="p-4">

    <span
        className={`px-3 py-1 rounded-full text-sm font-semibold

        ${
            ticket.priority === "High"
            ? "bg-red-500 text-white"

            : ticket.priority === "Medium"
            ? "bg-yellow-500 text-black"

            : "bg-green-500 text-white"
        }`}
    >

        {ticket.priority}

    </span>

</td>

<td className="p-4">

    <select

        value={ticket.status}

        onChange={(e) =>
            updateTicketStatus(
                ticket.ticket_id,
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

</td>

<td className="p-4">

    <button

        onClick={() =>
            deleteTicket(
                ticket.ticket_id
            )
        }

        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
    >

        Delete

    </button>

</td>

                                    </tr>
                                )
                            )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    )
}

export default ITTickets