import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// RevenueChart receives monthly revenue data as props and displays a line chart
function RevenueChart({ data }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>

      {/* ResponsiveContainer makes the chart fill its parent div width */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          
          {/* Grid lines in the background */}
          <CartesianGrid strokeDasharray="3 3" />
          
          {/* X axis uses the 'month' key from each data object */}
          <XAxis dataKey="month" />
          
          {/* Y axis auto-calculates range from data */}
          <YAxis />
          
          {/* Tooltip shows value when hovering */}
          <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
          
          {/* Line uses the 'revenue' key from each data object */}
          <Line type="monotone" dataKey="revenue" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
        
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RevenueChart