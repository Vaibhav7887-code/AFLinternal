import { useNavigate } from 'react-router-dom';

export default function SimpleDashboard() {
	const navigate = useNavigate();
	return (
		<div className="max-w-7xl mx-auto space-y-6">
			<div>
				<h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
				<p className="text-gray-600">Welcome back! Here's what's happening with your projects.</p>
			</div>

			{/* Simple Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<div className="bg-white border border-gray-200 rounded-lg p-4">
					<div className="text-sm font-medium text-gray-600">Active Projects</div>
					<div className="text-2xl font-bold text-gray-900">15</div>
				</div>
				<div className="bg-white border border-gray-200 rounded-lg p-4">
					<div className="text-sm font-medium text-gray-600">Pending Approvals</div>
					<div className="text-2xl font-bold text-gray-900">7</div>
				</div>
				<div className="bg-white border border-gray-200 rounded-lg p-4">
					<div className="text-sm font-medium text-gray-600">This Month Quotes</div>
					<div className="text-2xl font-bold text-gray-900">23</div>
				</div>
				<div className="bg-white border border-gray-200 rounded-lg p-4">
					<div className="text-sm font-medium text-gray-600">Avg Quote Value</div>
					<div className="text-2xl font-bold text-gray-900">$32,500</div>
				</div>
			</div>

			{/* Simple Actions */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="bg-white border border-gray-200 rounded-lg p-6">
					<h3 className="text-lg font-medium text-gray-900">Start New Quote</h3>
					<p className="text-sm text-gray-500 mt-1">Upload design and generate cost estimate</p>
					<button 
						className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
						onClick={() => navigate('/quote/upload')}
					>
						Upload Design
					</button>
				</div>
				<div className="bg-white border border-gray-200 rounded-lg p-6">
					<h3 className="text-lg font-medium text-gray-900">View Change Orders</h3>
					<p className="text-sm text-gray-500 mt-1">Manage and review change order requests</p>
					<button 
						className="mt-4 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
						onClick={() => navigate('/change-orders')}
					>
						View All COs
					</button>
				</div>
			</div>
		</div>
	);
}
