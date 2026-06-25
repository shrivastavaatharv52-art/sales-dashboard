import { useState, useEffect } from "react"
import KPICard from "./components/KPICard"
import RevenueChart from "./components/RevenueChart"
import CategoryChart from "./components/CategoryChart"
import SalesTable from "./components/SalesTable"
import AddOrderForm from "./components/AddOrderForm"

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const convertToOrder = (product, index) => {
  const statuses = ["Completed", "Completed", "Completed", "Pending", "Cancelled"]
  const months = ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06"]
  const month = months[index % months.length]
  const day = String((index % 28) + 1).padStart(2, "0")
  return {
    id: product.id,
    product: product.title,
    category: product.category,
    revenue: Math.round(product.price * (Math.floor(Math.random() * 5) + 1)),
    quantity: Math.floor(Math.random() * 10) + 1,
    date: `${month}-${day}`,
    status: statuses[index % statuses.length],
  }
}

function App() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [startMonth, setStartMonth] = useState(0)
  const [endMonth, setEndMonth] = useState(11)
  const [darkMode, setDarkMode] = useState(false)
  const [activePage, setActivePage] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch("https://dummyjson.com/products?limit=30")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data")
        return res.json()
      })
      .then((data) => {
        const converted = data.products.map((p, i) => convertToOrder(p, i))
        setOrders(converted)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const addOrder = (newOrder) => {
    setOrders([...orders, { id: orders.length + 1, ...newOrder }])
  }

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map((o) =>
      o.id === id ? { ...o, status: newStatus } : o
    ))
  }

  const completedOrders = orders.filter((o) => o.status === "Completed")
  const filteredOrders = completedOrders.filter((o) => {
    const month = new Date(o.date).getMonth()
    return month >= startMonth && month <= endMonth
  })

  const totalRevenue = filteredOrders.reduce((sum, o) => sum + o.revenue, 0)
  const totalOrders = orders.length
  const avgOrderValue = filteredOrders.length > 0
    ? Math.round(totalRevenue / filteredOrders.length)
    : 0

  const monthlyRevenue = monthNames.map((month, i) => ({
    month,
    revenue: filteredOrders
      .filter((o) => new Date(o.date).getMonth() === i)
      .reduce((sum, o) => sum + o.revenue, 0),
  })).filter((m) => m.revenue > 0)

  const categoryMap = {}
  filteredOrders.forEach((o) => {
    categoryMap[o.category] = (categoryMap[o.category] || 0) + o.revenue
  })
  const categoryRevenue = Object.entries(categoryMap).map(([category, revenue]) => ({
    category,
    revenue,
  }))

  const topCategory = categoryRevenue.length > 0
    ? categoryRevenue.reduce((a, b) => a.revenue > b.revenue ? a : b).category
    : "N/A"

  const exportCSV = () => {
    const headers = ["ID", "Product", "Category", "Revenue", "Quantity", "Date", "Status"]
    const rows = orders.map((o) =>
      [o.id, o.product, o.category, o.revenue, o.quantity, o.date, o.status].join(",")
    )
    const csv = [headers.join(","), ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "orders.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <div className="text-center">
          <p className="text-red-500 text-lg font-semibold mb-2">Something went wrong</p>
          <p className="text-gray-400 text-sm mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const bg = darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
  const card = darkMode ? "bg-gray-800" : "bg-white"
  const border = darkMode ? "border-gray-700" : "border-gray-200"

  return (
    <div className={`min-h-screen flex ${bg}`}>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-56" : "w-16"} transition-all duration-300 flex-shrink-0 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-r flex flex-col`}>

        {/* Logo */}
        <div className={`flex items-center gap-3 p-4 border-b ${border}`}>
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">S</div>
          {sidebarOpen && <span className="font-bold text-sm">SalesPro</span>}
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-3 space-y-1">
          {[
            { id: "dashboard", icon: "📊", label: "Dashboard" },
            { id: "orders", icon: "📦", label: "Orders" },
            { id: "add", icon: "➕", label: "Add Order" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all
                ${activePage === item.id
                  ? "bg-red-500 text-white"
                  : darkMode ? "text-gray-400 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <span className="text-base flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Collapse button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-4 text-sm border-t ${border} ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-gray-800"} transition-all text-left`}
        >
          {sidebarOpen ? "◀ Collapse" : "▶"}
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top header */}
        <header className={`flex items-center justify-between px-6 py-4 border-b ${border} ${card}`}>
          <div>
            <h1 className="text-lg font-bold">
              {activePage === "dashboard" && "Dashboard"}
              {activePage === "orders" && "Orders"}
              {activePage === "add" && "Add Order"}
            </h1>
            <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {orders.length} orders loaded
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${darkMode ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-white"}`}
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
            <button
              onClick={exportCSV}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-green-500 text-white hover:bg-green-600 transition-all"
            >
              ⬇️ Export CSV
            </button>
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">

          {/* Dashboard page */}
          {activePage === "dashboard" && (
            <div>
              {/* Date range filter */}
              <div className={`rounded-xl shadow p-4 mb-6 flex items-center gap-4 flex-wrap ${card}`}>
                <span className="text-sm font-medium">Filter by month:</span>
                <select
                  value={startMonth}
                  onChange={(e) => setStartMonth(Number(e.target.value))}
                  className={`border rounded-lg px-3 py-2 text-sm outline-none ${darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                >
                  {monthNames.map((m, i) => (
                    <option key={m} value={i}>{m}</option>
                  ))}
                </select>
                <span className="text-sm">to</span>
                <select
                  value={endMonth}
                  onChange={(e) => setEndMonth(Number(e.target.value))}
                  className={`border rounded-lg px-3 py-2 text-sm outline-none ${darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                >
                  {monthNames.map((m, i) => (
                    <option key={m} value={i}>{m}</option>
                  ))}
                </select>
                <button
                  onClick={() => { setStartMonth(0); setEndMonth(11) }}
                  className="text-sm text-red-500 hover:underline"
                >
                  Reset
                </button>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className={`rounded-xl shadow p-6 border-l-4 border-red-500 ${card}`}>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total Revenue</p>
                  <p className="text-2xl font-bold mt-1">${totalRevenue.toLocaleString()}</p>
                </div>
                <div className={`rounded-xl shadow p-6 border-l-4 border-blue-500 ${card}`}>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total Orders</p>
                  <p className="text-2xl font-bold mt-1">{totalOrders}</p>
                </div>
                <div className={`rounded-xl shadow p-6 border-l-4 border-green-500 ${card}`}>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Avg Order Value</p>
                  <p className="text-2xl font-bold mt-1">${avgOrderValue}</p>
                </div>
                <div className={`rounded-xl shadow p-6 border-l-4 border-yellow-500 ${card}`}>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Top Category</p>
                  <p className="text-2xl font-bold mt-1">{topCategory}</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className={`rounded-xl shadow p-6 ${card}`}>
                  <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
                  <RevenueChart data={monthlyRevenue} darkMode={darkMode} />
                </div>
                <div className={`rounded-xl shadow p-6 ${card}`}>
                  <h2 className="text-lg font-semibold mb-4">Revenue by Category</h2>
                  <CategoryChart data={categoryRevenue} darkMode={darkMode} />
                </div>
              </div>
            </div>
          )}

          {/* Orders page */}
          {activePage === "orders" && (
            <div className={`rounded-xl shadow p-6 ${card}`}>
              <SalesTable orders={orders} onUpdateStatus={updateStatus} darkMode={darkMode} />
            </div>
          )}

          {/* Add order page */}
          {activePage === "add" && (
            <div className={`rounded-xl shadow p-6 ${card}`}>
              <h2 className="text-lg font-semibold mb-4">Add New Order</h2>
              <AddOrderForm onAdd={addOrder} darkMode={darkMode} categories={[...new Set(orders.map((o) => o.category))]} />
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

export default App