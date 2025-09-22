import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface QuoteItem {
	id: string;
	name: string;
	quantity: number;
	type: string;
	unitCost: number;
	totalCost: number;
}

const mockExtractedItems: QuoteItem[] = [
	{ id: '1', name: 'Place/Splice', quantity: 12, type: 'A32', unitCost: 540, totalCost: 6480 },
	{ id: '2', name: 'FIP', quantity: 12, type: 'A32', unitCost: 104.50, totalCost: 1254 },
	{ id: '3', name: 'MDU', quantity: 30, type: 'A32', unitCost: 17.50, totalCost: 525 },
	{ id: '4', name: 'Civil design', quantity: 1, type: 'A32', unitCost: 1500, totalCost: 1500 },
	{ id: '5', name: 'Gpon design', quantity: 1, type: 'A32', unitCost: 1750, totalCost: 1750 },
	{ id: '6', name: 'UG. Cable', quantity: 120, type: 'A32', unitCost: 11.50, totalCost: 1380 },
	{ id: '7', name: 'New splice', quantity: 1, type: 'A32', unitCost: 850, totalCost: 850 },
	{ id: '8', name: 'Splitters', quantity: 4, type: 'A32', unitCost: 1100, totalCost: 4400 },
	{ id: '9', name: '1890444', quantity: 4, type: 'A50', unitCost: 575, totalCost: 2300 },
	{ id: '10', name: '2376061', quantity: 1, type: 'A50', unitCost: 635, totalCost: 635 },
	{ id: '11', name: '2143887', quantity: 143, type: 'A50', unitCost: 0.87, totalCost: 124.41 },
	{ id: '12', name: '2030938', quantity: 3, type: 'A50', unitCost: 1350, totalCost: 4050 },
	{ id: '13', name: '2381385', quantity: 7, type: 'A50', unitCost: 1275, totalCost: 8925 },
	{ id: '14', name: '72FIB CTP', quantity: 1, type: 'A50', unitCost: 335, totalCost: 335 }
];

export function GenerateQuoteStep() {
	const navigate = useNavigate();
	const [items, setItems] = useState(mockExtractedItems);
	const [searchTerm, setSearchTerm] = useState('');

	// Calculate totals
	const gponTotal = items.filter(item => item.type === 'A32').reduce((sum, item) => sum + item.totalCost, 0);
	const materialsTotal = items.filter(item => item.type === 'A50').reduce((sum, item) => sum + item.totalCost, 0);
	const totalQuote = items.reduce((sum, item) => sum + item.totalCost, 0);

	const handleQuantityChange = (id: string, newQuantity: number) => {
		setItems(prevItems => 
			prevItems.map(item => 
				item.id === id 
					? { ...item, quantity: newQuantity, totalCost: newQuantity * item.unitCost }
					: item
			)
		);
	};

	const handleDeleteItem = (id: string) => {
		setItems(prevItems => prevItems.filter(item => item.id !== id));
	};

	const filteredItems = items.filter(item => 
		item.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="grid grid-cols-2 gap-6 h-full">
			{/* Left Panel - Quote Items */}
			<div className="flex flex-col">
				{/* Project Info */}
				<div className="grid grid-cols-2 gap-4 mb-6">
					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">Project Code</label>
						<input 
							value="NGMR-12345" 
							readOnly 
							className="px-3 py-2 border border-gray-200 rounded-md text-sm w-full bg-gray-50" 
						/>
					</div>
					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">Units</label>
						<input 
							value="12" 
							readOnly 
							className="px-3 py-2 border border-gray-200 rounded-md text-sm w-20 bg-gray-50" 
						/>
					</div>
				</div>

				{/* Quote Section */}
				<div className="bg-white border border-gray-200 rounded-lg flex-1 flex flex-col">
					{/* Quote Header */}
					<div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
						<h3 className="text-lg font-medium">Quote</h3>
						<button className="px-3 py-1.5 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-colors">
							+ Add Items
						</button>
					</div>

					{/* Search and Filters */}
					<div className="px-4 py-3 border-b border-gray-200 flex items-center gap-3">
						<div className="flex-1 relative">
							<svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
							<input
								type="text"
								placeholder="Search"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm"
							/>
						</div>
						<button className="px-3 py-2 border border-gray-200 rounded-md text-sm hover:bg-gray-50">
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 2v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
							</svg>
						</button>
						<button className="px-3 py-2 border border-gray-200 rounded-md text-sm hover:bg-gray-50">
							Sort By
						</button>
					</div>

					{/* Items Table */}
					<div className="flex-1 overflow-auto">
						<table className="w-full">
							<thead className="bg-gray-50 border-b border-gray-200">
								<tr className="text-xs text-gray-600">
									<th className="text-left px-4 py-3 w-8"></th>
									<th className="text-left px-4 py-3">Name</th>
									<th className="text-left px-4 py-3 w-20">Quantity</th>
									<th className="text-left px-4 py-3 w-16">Type</th>
									<th className="text-left px-4 py-3 w-20">Per/cost</th>
									<th className="text-left px-4 py-3 w-20">Total</th>
									<th className="text-left px-4 py-3 w-12"></th>
								</tr>
							</thead>
							<tbody>
								{filteredItems.map((item) => (
									<tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
										<td className="px-4 py-3">
											<input type="checkbox" className="rounded" />
										</td>
										<td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
										<td className="px-4 py-3">
											<input
												type="number"
												value={item.quantity}
												onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
												className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
											/>
										</td>
										<td className="px-4 py-3">
											<span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
												item.type === 'A32' ? 'bg-purple-100 text-purple-800' : 'bg-yellow-100 text-yellow-800'
											}`}>
												{item.type}
											</span>
										</td>
										<td className="px-4 py-3 text-sm text-gray-900">${item.unitCost.toFixed(2)}</td>
										<td className="px-4 py-3 text-sm font-medium text-gray-900">${item.totalCost.toFixed(2)}</td>
										<td className="px-4 py-3">
											<button 
												onClick={() => handleDeleteItem(item.id)}
												className="text-gray-400 hover:text-red-600"
											>
												<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
												</svg>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{/* Right Panel - PDF Preview & Summary */}
			<div className="flex flex-col gap-6">
				{/* PDF Preview */}
				<div className="bg-white border border-gray-200 rounded-lg flex-1">
					<div className="h-full flex items-center justify-center bg-gray-50 rounded-lg">
						<div className="text-center">
							<div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-lg flex items-center justify-center">
								<svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
								</svg>
							</div>
							<p className="text-sm text-gray-600">PDF Preview</p>
							<p className="text-xs text-gray-500">NGMR-12345_A2.pdf</p>
						</div>
					</div>
				</div>

				{/* Quote Summary */}
				<div className="bg-white border border-gray-200 rounded-lg p-6">
					<h3 className="text-lg font-medium mb-4">Total Quote</h3>
					
					<div className="space-y-3 mb-4">
						<div className="flex justify-between text-sm">
							<span className="text-gray-600">GPON:</span>
							<span className="font-medium">${gponTotal.toLocaleString()}</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-gray-600">Materials:</span>
							<span className="font-medium">${materialsTotal.toLocaleString()}</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-gray-600">Civil:</span>
							<span className="font-medium">$20,083.24</span>
						</div>
					</div>

					<div className="border-t pt-3 mb-6">
						<div className="flex justify-between items-center">
							<span className="text-lg font-medium">Total:</span>
							<span className="text-3xl font-bold">{totalQuote.toLocaleString()}</span>
						</div>
					</div>

					<div className="flex gap-3">
						<button 
							onClick={() => navigate('/quote/submit')}
							className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
						>
							Submit
						</button>
						<button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
							Download
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
