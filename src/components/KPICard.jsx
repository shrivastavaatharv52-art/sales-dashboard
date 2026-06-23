// KPICard recieves a title, value, and colour as props from App.jsx

function KPICard({ title, value, colour }) {
    return (
        <div className={'bg-white rounded-xl shadow p-6 border-l-4 ${color}'} >
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
    )
}

export default KPICard