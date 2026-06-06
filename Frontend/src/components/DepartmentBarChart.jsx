import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts"

function DepartmentBarChart({ data }) {

    return (

        <div className="bg-slate-900 p-6 rounded-2xl h-[400px]">

            <h2 className="text-white text-2xl font-bold mb-6">
                Department Workload
            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="department"
                        stroke="#ffffff"
                    />

                    <YAxis
                        stroke="#ffffff"
                    />

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

export default DepartmentBarChart