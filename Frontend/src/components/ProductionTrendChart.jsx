import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts"

function ProductionTrendChart({ data }) {

    return (

        <div className="bg-slate-900 p-6 rounded-2xl h-[400px]">

            <h2 className="text-white text-2xl font-bold mb-6">
                Production Trend
            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="date"
                        stroke="#ffffff"
                    />

                    <YAxis
                        stroke="#ffffff"
                    />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="quantity"
                        stroke="#22c55e"
                        strokeWidth={3}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    )
}

export default ProductionTrendChart