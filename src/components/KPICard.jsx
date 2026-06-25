// KPICard receives a title, value, and color as props from App.jsx

function KPICard({ title, value, color }) {
    return (
        <div className={`bg-white dark:bg-slate-900 rounded-xl shadow p-6 border-l-4 ${color}`} >
            <p className="text-sm text-gray-500 dark:text-slate-400">{title}</p>
            <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{value}</p>
        </div>
    )
}

export default KPICard