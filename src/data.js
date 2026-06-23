// Mock e-commerce sales data
export const orders = [
  { id: 1, product: "Laptop", category: "Electronics", revenue: 1200, quantity: 2, date: "2024-01-05", status: "Completed" },
  { id: 2, product: "T-Shirt", category: "Clothing", revenue: 25, quantity: 10, date: "2024-01-08", status: "Completed" },
  { id: 3, product: "Headphones", category: "Electronics", revenue: 150, quantity: 3, date: "2024-01-12", status: "Pending" },
  { id: 4, product: "Running Shoes", category: "Clothing", revenue: 90, quantity: 5, date: "2024-02-01", status: "Completed" },
  { id: 5, product: "Coffee Maker", category: "Home", revenue: 80, quantity: 4, date: "2024-02-10", status: "Completed" },
  { id: 6, product: "Phone", category: "Electronics", revenue: 800, quantity: 1, date: "2024-02-15", status: "Cancelled" },
  { id: 7, product: "Desk Chair", category: "Home", revenue: 300, quantity: 2, date: "2024-03-03", status: "Completed" },
  { id: 8, product: "Jeans", category: "Clothing", revenue: 60, quantity: 8, date: "2024-03-10", status: "Completed" },
  { id: 9, product: "Tablet", category: "Electronics", revenue: 500, quantity: 2, date: "2024-03-20", status: "Pending" },
  { id: 10, product: "Blender", category: "Home", revenue: 70, quantity: 6, date: "2024-04-05", status: "Completed" },
  { id: 11, product: "Monitor", category: "Electronics", revenue: 400, quantity: 3, date: "2024-04-12", status: "Completed" },
  { id: 12, product: "Jacket", category: "Clothing", revenue: 120, quantity: 4, date: "2024-04-18", status: "Completed" },
  { id: 13, product: "Microwave", category: "Home", revenue: 150, quantity: 2, date: "2024-05-02", status: "Completed" },
  { id: 14, product: "Keyboard", category: "Electronics", revenue: 100, quantity: 5, date: "2024-05-15", status: "Completed" },
  { id: 15, product: "Sofa", category: "Home", revenue: 800, quantity: 1, date: "2024-05-22", status: "Pending" },
  { id: 16, product: "Watch", category: "Electronics", revenue: 250, quantity: 3, date: "2024-06-01", status: "Completed" },
  { id: 17, product: "Sneakers", category: "Clothing", revenue: 110, quantity: 6, date: "2024-06-08", status: "Completed" },
  { id: 18, product: "Air Purifier", category: "Home", revenue: 200, quantity: 2, date: "2024-06-15", status: "Completed" },
]

// Revenue grouped by month for the line chart
export const monthlyRevenue = [
  { month: "Jan", revenue: 1375 },
  { month: "Feb", revenue: 880 },
  { month: "Mar", revenue: 860 },
  { month: "Apr", revenue: 580 },
  { month: "May", revenue: 1050 },
  { month: "Jun", revenue: 560 },
]

// Revenue by category for the bar chart
export const categoryRevenue = [
  { category: "Electronics", revenue: 3400 },
  { category: "Clothing", revenue: 405 },
  { category: "Home", revenue: 1600 },
]