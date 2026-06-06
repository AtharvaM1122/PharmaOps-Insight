import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts"

function WorkflowChart({ data }) {

    const COLORS = [
        "#06b6d4",
        "#22c55e",
        "#f59e0b",
        "#ef4444"
    ]

    return (

        <div className="bg-slate-900 p-6 rounded-2xl h-[400px]">

            <h2 className="text-white text-2xl font-bold mb-6">
                Workflow Status Distribution
            </h2>

            <ResponsiveContainer width="100%" height={300}>

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={120}
                        fill="#8884d8"
                        label
                    >

                        {
                            data.map((entry, index) => (

                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))
                        }

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>
    )
}

export default WorkflowChart