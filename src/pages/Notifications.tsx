export default function Notifications() {
	const mockNotifications = [
		{
			id: '1',
			type: 'quote',
			title: 'Quote Q-456 requires review',
			description: 'NGMR-12345 quote submitted for approval',
			timestamp: '2 hours ago',
			read: false,
			severity: 'info'
		},
		{
			id: '2',
			type: 'change_order',
			title: 'Change Order CO #7 pending approval',
			description: 'Awaiting manager approval for $2,450 change order',
			timestamp: '4 hours ago',
			read: false,
			severity: 'warning'
		},
		{
			id: '3',
			type: 'budget',
			title: 'Budget Alert: NGMR-4847 exceeds planned cost',
			description: 'Project budget exceeded by $2,500',
			timestamp: '6 hours ago',
			read: false,
			severity: 'critical'
		},
		{
			id: '4',
			type: 'system',
			title: 'File processing complete',
			description: 'NGMR-12345_A2.pdf processed successfully - 15 items extracted',
			timestamp: '1 day ago',
			read: true,
			severity: 'success'
		}
	];

	const getSeverityColor = (severity: string) => {
		switch (severity) {
			case 'critical': return 'bg-red-100 text-red-800';
			case 'warning': return 'bg-orange-100 text-orange-800';
			case 'success': return 'bg-green-100 text-green-800';
			default: return 'bg-blue-100 text-blue-800';
		}
	};

	return (
		<div className="max-w-4xl mx-auto">
			<div className="mb-6">
				<h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
				<p className="text-gray-600">Stay updated with your project activities</p>
			</div>

			{/* Filter Tabs */}
			<div className="mb-6">
				<div className="border-b border-gray-200">
					<nav className="-mb-px flex space-x-8">
						<button className="border-green-500 text-green-600 border-b-2 py-2 px-1 text-sm font-medium">
							All ({mockNotifications.length})
						</button>
						<button className="border-transparent text-gray-500 hover:text-gray-700 border-b-2 py-2 px-1 text-sm font-medium">
							Unread ({mockNotifications.filter(n => !n.read).length})
						</button>
						<button className="border-transparent text-gray-500 hover:text-gray-700 border-b-2 py-2 px-1 text-sm font-medium">
							Quotes
						</button>
						<button className="border-transparent text-gray-500 hover:text-gray-700 border-b-2 py-2 px-1 text-sm font-medium">
							Change Orders
						</button>
					</nav>
				</div>
			</div>

			{/* Notifications List */}
			<div className="space-y-4">
				{mockNotifications.map((notification) => (
					<div 
						key={notification.id}
						className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
							!notification.read ? 'border-l-4 border-l-green-500' : ''
						}`}
					>
						<div className="flex items-start justify-between">
							<div className="flex-1">
								<div className="flex items-center space-x-2 mb-1">
									<h3 className="text-sm font-medium text-gray-900">
										{notification.title}
									</h3>
									<span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(notification.severity)}`}>
										{notification.severity}
									</span>
									{!notification.read && (
										<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
											New
										</span>
									)}
								</div>
								<p className="text-sm text-gray-600 mb-2">
									{notification.description}
								</p>
								<div className="flex items-center justify-between">
									<span className="text-xs text-gray-400">
										{notification.timestamp}
									</span>
									<div className="flex space-x-2">
										<button className="text-xs text-green-600 hover:text-green-800 font-medium">
											View Details
										</button>
										{!notification.read && (
											<button className="text-xs text-gray-600 hover:text-gray-800">
												Mark as Read
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Action Buttons */}
			<div className="mt-6 flex justify-between">
				<button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
					Mark All as Read
				</button>
				<button className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700">
					Clear All Read
				</button>
			</div>
		</div>
	);
}
