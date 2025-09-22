import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { HelpCircle, ChevronDown, Bell } from 'lucide-react';
import { NotificationsPanel } from './NotificationsPanel';

export function SimpleLayout() {
	const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
	
	return (
		<div className="h-screen flex">
			{/* Sidebar */}
			<aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
				<div className="h-14 flex items-center px-4 font-semibold border-b border-gray-200">
					AFL Internal
				</div>
				<nav className="flex-1 px-2 py-2 space-y-1">
					<NavLink 
						to="/dashboard" 
						className={({ isActive }) => `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
							isActive ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-100'
						}`}
					>
						Dashboard
					</NavLink>
					<NavLink 
						to="/quote/upload" 
						className={({ isActive }) => `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
							isActive ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-100'
						}`}
					>
						Quote Generation
					</NavLink>
					<NavLink 
						to="/change-orders" 
						className={({ isActive }) => `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
							isActive ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-100'
						}`}
					>
						Change Orders
					</NavLink>
					
					{/* Design edits with submenu indicator */}
					<div>
						<NavLink 
							to="/design-edits" 
							className={({ isActive }) => `flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
								isActive ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-100'
							}`}
						>
							<span>Design edits</span>
							<ChevronDown className="w-4 h-4" />
						</NavLink>
					</div>
					
					<NavLink 
						to="/ngmr-budget" 
						className={({ isActive }) => `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
							isActive ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-100'
						}`}
					>
						NGMR Budget update
					</NavLink>
				</nav>
			</aside>
			
			{/* Main Content */}
			<main className="flex-1 flex flex-col bg-gray-50">
				<header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
					<div className="flex items-center">
						<input 
							placeholder="Search" 
							className="px-3 py-2 border border-gray-200 rounded-md text-sm w-96" 
						/>
					</div>
					<div className="flex items-center space-x-4">
						{/* Notifications */}
						<button
							onClick={() => setIsNotificationsOpen(true)}
							className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
							title="Notifications"
						>
							<Bell className="w-5 h-5" />
							{/* Notification badge */}
							<span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
								<span className="text-xs text-white font-medium">2</span>
							</span>
						</button>
						
						{/* Help Center */}
						<a 
							href="mailto:khushboovansia.afkglobal.com"
							className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
							title="Help Center"
						>
							<HelpCircle className="w-5 h-5 mr-1" />
							<span className="text-sm">Help Center</span>
						</a>
						
						<span className="text-sm text-gray-700">Khushboo</span>
						<div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm">
							K
						</div>
					</div>
				</header>
				
				<div className="flex-1 p-8 overflow-auto">
					<Outlet />
				</div>
			</main>
			
			{/* Notifications Panel */}
			<NotificationsPanel 
				isOpen={isNotificationsOpen}
				onClose={() => setIsNotificationsOpen(false)}
			/>
		</div>
	);
}
