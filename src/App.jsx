import { orders, monthlyRevenue, categoryRevenue} from "./data"
import KPICard from "./components/KPICard"
import RevenueChart from "./components/RevenueChart"
import CategoryChart from "./components/CategoryChart"
import SalesTable from "./components/SalesTable"

function App() {
  const totalRevenue = orders.reduce((sum, o) => sum + o.revenue, 0)
  const totalOrders = orders.length
  const avgOrderValue = Math.round(totalRevenue / totalOrders)
  const topCategory = categoryRevenue.reduce((a, b) => a.revenue > b.revenue ? a : b).category

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Sales Dashboard</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <KPICard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} color="border-green-500" />
      <KPICard title="Total Orders" value={totalOrders} color="border-blue-500" />
      <KPICard title="Avg Order Value" value={`$${avgOrderValue}`} color="border-purple-500" />
      <KPICard title="Top Category" value={topCategory} color="border-yellow-500" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      <RevenueChart data={monthlyRevenue} />
      <CategoryChart data={categoryRevenue} />
    </div>
    <SalesTable orders={orders} />
    </div>
  )
}

export default App