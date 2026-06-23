import { useState } from "react"

// SalesTable receives orders array as props
// It manages its own search and filter state locally
function SalesTable({ orders }) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [sortKey, setSortKey] = useState("date")
  const [sortOrder, setSortOrder] = useState("asc")

  // Filter logic — runs every render
  // First filter by status, then by search text
  const filtered = orders
    .filter((o) => statusFilter === "All" || o.status === statusFilter)
    .filter(
      (o) =>
        o.product.toLowerCase().includes(search.toLowerCase()) ||
        o.category.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      // Sort by selected column, ascending or descending
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1
      return 0
    })

  // Toggle sort — if same column clicked, flip order. Otherwise set new column
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortOrder("asc")
    }
  }

  // Color badge based on order status
  const statusColor = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Cancelled: "bg-red-100 text-red-700",
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Orders</h2>

      {/* Search and filter controls */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search product or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm w-full outline-none focus:ring-2 focus:ring-red-400"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-400"
        >
          <option>All</option>
          <option>Completed</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b">
            <tr>
              {/* Clicking header sorts by that column */}
              <th className="pb-3 cursor-pointer" onClick={() => handleSort("product")}>Product</th>
              <th className="pb-3 cursor-pointer" onClick={() => handleSort("category")}>Category</th>
              <th className="pb-3 cursor-pointer" onClick={() => handleSort("revenue")}>Revenue</th>
              <th className="pb-3 cursor-pointer" onClick={() => handleSort("quantity")}>Qty</th>
              <th className="pb-3 cursor-pointer" onClick={() => handleSort("date")}>Date</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="py-3">{order.product}</td>
                <td className="py-3">{order.category}</td>
                <td className="py-3">${order.revenue}</td>
                <td className="py-3">{order.quantity}</td>
                <td className="py-3">{order.date}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[order.status]}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Show message if no results */}
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-6">No orders found.</p>
        )}
      </div>
    </div>
  )
}

export default SalesTable