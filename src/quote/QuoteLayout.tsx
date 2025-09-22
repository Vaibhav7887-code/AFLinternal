import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Search, LayoutDashboard, Bell, Layers3, FileText, ChevronDown, BookOpenText, SquareStack, CircleHelp } from 'lucide-react';

const steps = [
	{ key: 'upload', label: 'Upload Design', num: 1 },
	{ key: 'generate', label: 'Generate Quote', num: 2 },
	{ key: 'submit', label: 'Download', num: 3 },
];

function SidebarItem({ to = '#', icon: Icon, label, active = false, exact = false }: { to?: string; icon: any; label: string; active?: boolean; exact?: boolean }) {
	return (
		<NavLink to={to} end={exact} className={({ isActive }) => `ds-sidebar-link ${active || isActive ? 'ds-sidebar-link-active' : ''}`}>
			<Icon size={16} className={`${active ? 'text-green-600' : 'text-gray-400'}`} />
			<span>{label}</span>
		</NavLink>
	);
}

export function QuoteLayout() {
	const { pathname } = useLocation();
	const activeIndex = steps.findIndex((s) => pathname.includes(s.key));
	const inQuote = pathname.startsWith('/quote/');
	return (
		<div className="h-screen grid" style={{ gridTemplateColumns: '256px 1fr' }}>
			<aside className="bg-white border-r border-gray-200 flex flex-col">
				<div className="h-14 flex items-center px-4 font-semibold">AFL Internal</div>
				<nav className="px-2 py-2 text-sm space-y-1">
					<SidebarItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" exact />
					<SidebarItem to="/notifications" icon={Bell} label="Notifications" exact />
					<SidebarItem to="/quote/upload" icon={Layers3} label="Quote Generation" active={inQuote} />
					<SidebarItem to="/change-orders" icon={FileText} label="Change Orders" exact />
					<SidebarItem to="/design-edits" icon={SquareStack} label="Design edits" exact />
					<SidebarItem to="/ngmr-budget" icon={BookOpenText} label="NGMR Budget update" exact />
				</nav>
				<div className="mt-auto p-3 text-xs text-gray-500">Marketing Team</div>
			</aside>
			<main className="flex flex-col min-w-0 bg-gray-50">
				{/* Top bar */}
				<header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
					<div className="w-[420px]">
						<div className="relative">
							<Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
							<input placeholder="Search" className="ds-input w-full pl-10 pr-20" />
							<span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-gray-500 border rounded px-1">Ctrl + F</span>
						</div>
					</div>
					<div className="flex items-center gap-6 text-sm">
						<button className="text-gray-600 hover:text-gray-800 inline-flex items-center gap-1"><CircleHelp size={16}/> Help Center</button>
						<div className="flex items-center gap-2">
							<div className="h-7 w-7 rounded-full bg-gray-200 grid place-items-center text-gray-700 text-xs">K</div>
							<span>Khushboo</span>
							<ChevronDown size={16} className="text-gray-500"/>
						</div>
					</div>
				</header>

				{/* Stepper - only show for quote routes */}
				{inQuote && (
					<div className="bg-white border-b border-gray-200 px-6">
						<div className="flex items-center gap-2 text-sm py-3">
							{steps.map((s, i) => {
								const active = i === activeIndex;
								const done = i < activeIndex;
								return (
									<div key={s.key} className="flex items-center">
										<div className={`h-6 w-6 grid place-items-center rounded-full text-xs font-medium ${done ? 'bg-green-600 text-white' : active ? 'border border-green-600 text-green-600' : 'border text-gray-500'}`}>{s.num}</div>
										<div className={`ml-2 ${active || done ? 'text-green-600' : 'text-gray-700'}`}>{s.label}</div>
										{i<steps.length-1 && <div className="mx-3 w-24 h-px bg-gray-200"/>}
									</div>
								);
							})}
						</div>
					</div>
				)}

				<div className="p-8 overflow-auto flex-1">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
