import { useState } from "react"

function SalesTable({ orders, onUpdateStatus, darkMode }) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [sortKey, setSortKey] = useState("date")
  const [sortOrder, setSortOrder] = useState("asc")

  const filtered = orders
    .filter((o) => statusFilter === "All" || o.status === statusFilter)
    .filter(
      (o) =>
        o.product.toLowerCase().includes(search.toLowerCase()) ||
        o.category.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1
      return 0
    })

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortOrder("asc")
    }
  }

  const statusColor = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Cancelled: "bg-red-100 text-red-700",
  }

  const thClass = `pb-3 cursor-pointer hover:text-red-500 transition-all ${darkMode ? "text-gray-400" : "text-gray-500"}`

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Orders</h2>

      {/* Search and filter */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search product or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`border rounded-lg px-3 py-2 text-sm w-full outline-none focus:ring-2 focus:ring-red-400 ${darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : ""}`}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-400 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
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
          <thead className="border-b">
            <tr>
              <th className={thClass} onClick={() => handleSort("product")}>
                Product {sortKey === "product" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th className={thClass} onClick={() => handleSort("category")}>
                Category {sortKey === "category" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th className={thClass} onClick={() => handleSort("revenue")}>
                Revenue {sortKey === "revenue" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th className={thClass} onClick={() => handleSort("quantity")}>
                Qty {sortKey === "quantity" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th className={thClass} onClick={() => handleSort("date")}>
                Date {sortKey === "date" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th className={thClass}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr
                key={order.id}
                className={`border-b last:border-0 transition-all ${darkMode ? "border-gray-700 hover:bg-gray-700" : "hover:bg-gray-50"}`}
              >
                <td className="py-3">{order.product}</td>
                <td className="py-3">{order.category}</td>
                <td className="py-3">${order.revenue}</td>
                <td className="py-3">{order.quantity}</td>
                <td className="py-3">{order.date}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[order.status]}`}>
                      {order.status}
                    </span>
                    {order.status === "Pending" && (
                      <>
                        <button
                          onClick={() => onUpdateStatus(order.id, "Completed")}
                          className="text-xs bg-green-500 text-white px-2 py-1 rounded-full hover:bg-green-600 transition-all"
                        >
                          ✓ Complete
                        </button>
                        <button
                          onClick={() => onUpdateStatus(order.id, "Cancelled")}
                          className="text-xs bg-red-400 text-white px-2 py-1 rounded-full hover:bg-red-500 transition-all"
                        >
                          ✕ Cancel
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className={`text-center py-6 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            No orders found.
          </p>
        )}
      </div>
    </>
  )
}

export default SalesTable