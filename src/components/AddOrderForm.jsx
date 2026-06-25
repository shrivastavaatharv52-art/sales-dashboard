import { useState } from "react"

function AddOrderForm({ onAdd, darkMode, categories =[] }) {
  const [form, setForm] = useState({
    product: "",
    category: "",
    revenue: "",
    quantity: "",
    status: "Completed",
  })

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" })
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!form.product.trim()) newErrors.product = "Product name is required"
    if (!form.revenue) newErrors.revenue = "Revenue is required"
    else if (Number(form.revenue) <= 0) newErrors.revenue = "Revenue must be greater than 0"
    if (!form.quantity) newErrors.quantity = "Quantity is required"
    else if (Number(form.quantity) <= 0) newErrors.quantity = "Quantity must be greater than 0"
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Run validation
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Submit if valid
    onAdd({
      product: form.product.trim(),
      category: form.category,
      revenue: Number(form.revenue),
      quantity: Number(form.quantity),
      date: new Date().toISOString().split("T")[0],
      status: form.status,
    })

    // Reset form and show success message
    setForm({ product: "", category: "Electronics", revenue: "", quantity: "", status: "Completed" })
    setErrors({})
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const inputClass = (field) =>
    `border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 w-full
    ${errors[field] ? "border-red-400 focus:ring-red-300" : "focus:ring-red-400"}
    ${darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : ""}`

  return (
    <div>
      {/* Success message */}
      {success && (
        <div className="mb-4 px-4 py-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
          ✓ Order added successfully
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Product */}
        <div>
          <input
            name="product"
            placeholder="Product name"
            value={form.product}
            onChange={handleChange}
            className={inputClass("product")}
          />
          {errors.product && <p className="text-red-500 text-xs mt-1">{errors.product}</p>}
        </div>

        {/* Category */}
        <div>
  <input
    name="category"
    placeholder="Category"
    value={form.category}
    onChange={handleChange}
    list="category-options"
    className={inputClass("category")}
  />
  <datalist id="category-options">
    {categories.map((cat) => (
      <option key={cat} value={cat} />
    ))}
  </datalist>
</div>

        {/* Revenue */}
        <div>
          <input
            name="revenue"
            type="number"
            placeholder="Revenue ($)"
            value={form.revenue}
            onChange={handleChange}
            className={inputClass("revenue")}
          />
          {errors.revenue && <p className="text-red-500 text-xs mt-1">{errors.revenue}</p>}
        </div>

        {/* Quantity */}
        <div>
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            className={inputClass("quantity")}
          />
          {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
        </div>

        {/* Status */}
        <div>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={inputClass("status")}
          >
            <option>Completed</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-red-500 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-600 transition-all"
        >
          Add Order
        </button>

      </form>
    </div>
  )
}

export default AddOrderForm