import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

function RevenueChart({ data, darkMode }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
        <XAxis dataKey="month" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
        <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
        <Tooltip
          contentStyle={{
            backgroundColor: darkMode ? "#1f2937" : "#fff",
            border: "none",
            borderRadius: "8px",
            color: darkMode ? "#fff" : "#111",
          }}
          formatter={(value) => [`$${value}`, "Revenue"]}
        />
        <Line type="monotone" dataKey="revenue" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default RevenueChart