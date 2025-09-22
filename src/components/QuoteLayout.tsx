import { Outlet, useLocation } from 'react-router-dom';

const steps = [
	{ key: 'upload', label: 'Upload Design', num: 1 },
	{ key: 'generate', label: 'Generate Quote', num: 2 },
	{ key: 'submit', label: 'Submit', num: 3 },
];

export function QuoteLayout() {
	const { pathname } = useLocation();
	const activeIndex = steps.findIndex((s) => pathname.includes(s.key));
	const inQuote = pathname.startsWith('/quote/');

	if (!inQuote) {
		return <Outlet />;
	}

	return (
		<div className="flex flex-col h-full">
			{/* Stepper */}
			<div className="bg-white border-b border-gray-200 px-6 py-3">
				<div className="flex items-center gap-2 text-sm">
					{steps.map((step, i) => {
						const active = i === activeIndex;
						const done = i < activeIndex;
						const isLast = i === steps.length - 1;

						return (
							<div key={step.key} className="flex items-center">
								{/* Step Circle */}
								<div className={`h-6 w-6 grid place-items-center rounded-full text-xs font-medium transition-colors ${
									done ? 'bg-green-600 text-white' : 
									active ? 'border border-green-600 text-green-600' : 
									'border border-gray-300 text-gray-500'
								}`}>
									{done ? (
										<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
										</svg>
									) : (
										step.num
									)}
								</div>
								
								{/* Step Label */}
								<div className={`ml-2 transition-colors ${
									active || done ? 'text-green-600 font-medium' : 'text-gray-700'
								}`}>
									{step.label}
								</div>
								
								{/* Connector Line */}
								{!isLast && (
									<div className="mx-3 w-24 h-px bg-gray-200" />
								)}
							</div>
						);
					})}
				</div>
			</div>

			{/* Content */}
			<div className="flex-1 p-8 overflow-auto">
				<Outlet />
			</div>
		</div>
	);
}
