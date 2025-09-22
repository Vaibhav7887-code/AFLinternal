import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const catalog: Record<string, { id: string; name: string; quantity: number; type: string; unitCost: number }[]> = {
	'NGMR-12345_A2.pdf': [
		{ id: '1', name: 'Place/Splice', quantity: 12, type: 'A32', unitCost: 540 },
		{ id: '2', name: 'FIP', quantity: 12, type: 'A32', unitCost: 104.5 },
		{ id: '3', name: 'MDU', quantity: 30, type: 'A32', unitCost: 17.5 },
		{ id: '4', name: 'Civil design', quantity: 1, type: 'A32', unitCost: 1500 },
		{ id: '5', name: 'UG. Cable', quantity: 120, type: 'A32', unitCost: 11.5 },
	],
	'NGMR-12345_A1.pdf': [
		{ id: '1', name: 'Splitters', quantity: 4, type: 'A32', unitCost: 1100 },
		{ id: '2', name: 'New splice', quantity: 1, type: 'A32', unitCost: 850 },
	],
	'quote-drawing.pdf': [
		{ id: '1', name: 'GPON design', quantity: 1, type: 'A32', unitCost: 1750 },
	],
};

export function GenerateStep() {
	const navigate = useNavigate();
	// In a pure prototype we don't persist filename; assume first key for demo.
	const filename = Object.keys(catalog)[0];
	const extracted = useMemo(() => catalog[filename] || [], [filename]);
	const total = extracted.reduce((s, it) => s + it.quantity * it.unitCost, 0);

	return (
		<div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
			<div className="border rounded bg-white overflow-hidden">
				<div className="p-3 border-b font-medium">Quote</div>
				<div className="divide-y">
					<div className="grid grid-cols-6 px-3 py-2 text-xs text-gray-500">
						<div className="col-span-2">Name</div>
						<div>Quantity</div>
						<div>Type</div>
						<div>Per/cost</div>
						<div>Total</div>
					</div>
					{extracted.map((it)=> (
						<div key={it.id} className="grid grid-cols-6 px-3 py-2 text-sm">
							<div className="col-span-2">{it.name}</div>
							<div>{it.quantity}</div>
							<div>{it.type}</div>
							<div>${it.unitCost.toFixed(2)}</div>
							<div>${(it.quantity * it.unitCost).toFixed(2)}</div>
						</div>
					))}
				</div>
			</div>
			<div className="flex flex-col">
				<div className="border rounded p-4 bg-white">
					<div className="text-sm text-gray-600">Total Quote</div>
					<div className="text-4xl font-semibold">{total.toLocaleString()}</div>
				</div>
				<div className="mt-auto flex justify-end gap-3">
					<button onClick={()=>navigate('/quote/submit')} className="px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700">Submit</button>
				</div>
			</div>
		</div>
	);
}
