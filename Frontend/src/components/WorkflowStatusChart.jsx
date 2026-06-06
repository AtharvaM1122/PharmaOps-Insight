import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts"

function WorkflowStatusChart({ data }) {

    const COLORS = [
        "#eab308",
        "#06b6d4",
        "#22c55e",
        "#ef4444"
    ]

    return (

        <div className="bg-slate-900 p-6 rounded-2xl h-[400px]">

            <h2 className="text-white text-2xl font-bold mb-6">
                Workflow Status Distribution
            </h2>

            <ResponsiveContainer width="100%" height="80%">

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={120}
                    >

                        {
                            data.map(
                                (entry, index) => (

                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[
                                                index %
                                                COLORS.length
                                            ]
                                        }
                                    />
                                )
                            )
                        }

                    </Pie>

                    <Tooltip />

                </PieChart>

            </ResponsiveContainer>

        </div>
    )
}

export default WorkflowStatusChart