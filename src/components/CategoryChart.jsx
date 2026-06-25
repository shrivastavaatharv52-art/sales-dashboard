import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

function CategoryChart({ data, darkMode }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
        <XAxis dataKey="category" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
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
        <Bar dataKey="revenue" fill="#ef4444" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default CategoryChart