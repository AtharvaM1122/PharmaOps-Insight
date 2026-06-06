import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts"

function TicketChart({ data }) {

    return (

        <div className="bg-slate-900 p-6 rounded-2xl h-[400px]">

            <h2 className="text-white text-2xl font-bold mb-6">
                Ticket Priority Distribution
            </h2>

            <ResponsiveContainer width="100%" height={300}>

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="priority" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="count"
                        fill="#06b6d4"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>
    )
}

export default TicketChart