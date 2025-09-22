import { useNavigate } from 'react-router-dom';

export function SubmitStep() {
	const navigate = useNavigate();

	return (
		<div className="max-w-4xl mx-auto text-center">
			<div className="bg-white border border-gray-200 rounded-lg p-8">
				{/* Success Icon */}
				<div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
					<svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
					</svg>
				</div>

				{/* Success Message */}
				<h2 className="text-2xl font-bold text-gray-900 mb-2">Quote Submitted Successfully!</h2>
				<p className="text-gray-600 mb-8">Your quote for NGMR-12345 has been submitted for review.</p>

				{/* Quote Summary */}
				<div className="bg-gray-50 rounded-lg p-6 mb-8">
					<div className="grid grid-cols-3 gap-6 text-center">
						<div>
							<div className="text-sm text-gray-600">Project Code</div>
							<div className="text-lg font-semibold">NGMR-12345</div>
						</div>
						<div>
							<div className="text-sm text-gray-600">Total Items</div>
							<div className="text-lg font-semibold">14</div>
						</div>
						<div>
							<div className="text-sm text-gray-600">Total Amount</div>
							<div className="text-lg font-semibold">$45,823</div>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex justify-center gap-4">
					<button 
						onClick={() => navigate('/dashboard')}
						className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
					>
						Back to Dashboard
					</button>
					<button className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
						Download Quote
					</button>
					<button 
						onClick={() => navigate('/quote/upload')}
						className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
					>
						Create New Quote
					</button>
				</div>
			</div>
		</div>
	);
}