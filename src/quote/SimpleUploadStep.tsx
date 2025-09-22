import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function SimpleUploadStep() {
	const navigate = useNavigate();
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [uploadComplete, setUploadComplete] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFileSelect = useCallback(async (files: FileList | null) => {
		if (!files || files.length === 0) return;
		const selectedFile = files[0];
		
		if (!selectedFile.name.toLowerCase().endsWith('.pdf')) {
			alert('Please select a PDF file');
			return;
		}
		
		setFile(selectedFile);
		setUploading(true);
		setProgress(0);
		
		// Simulate upload progress
		for (let i = 0; i <= 100; i += 10) {
			await new Promise(resolve => setTimeout(resolve, 200));
			setProgress(i);
		}
		
		// Simulate processing
		await new Promise(resolve => setTimeout(resolve, 1000));
		
		setUploading(false);
		setUploadComplete(true);
		
		// Auto-navigate after success
		setTimeout(() => {
			navigate('/quote/generate');
		}, 2000);
	}, [navigate]);

	const handleDrop = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		handleFileSelect(e.dataTransfer.files);
	}, [handleFileSelect]);

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
	}, []);

	const handleReset = () => {
		setFile(null);
		setUploading(false);
		setProgress(0);
		setUploadComplete(false);
	};

	if (uploadComplete) {
		return (
			<div className="max-w-4xl mx-auto">
				<div className="grid grid-cols-2 gap-6 mb-8">
					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">Project Code</label>
						<input 
							value="NGMR-12345" 
							readOnly 
							className="px-3 py-2 border border-gray-200 rounded-md text-sm w-40 bg-gray-50" 
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

				<div className="rounded-md border border-dashed border-green-400 bg-green-50 p-16 flex flex-col items-center justify-center text-center">
					<div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
						<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
						</svg>
					</div>
					<div className="font-medium text-green-800 mb-2">Upload Complete!</div>
					<div className="text-sm text-green-600 mb-1">{file?.name}</div>
					<div className="text-xs text-green-600 mb-4">Processing completed successfully</div>
					<div className="space-x-3">
						<button 
							className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
							onClick={handleReset}
						>
							Upload Another
						</button>
						<button 
							className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
							onClick={() => navigate('/quote/generate')}
						>
							Continue to Quote
						</button>
					</div>
				</div>
			</div>
		);
	}

	if (uploading) {
		return (
			<div className="max-w-4xl mx-auto">
				<div className="grid grid-cols-2 gap-6 mb-8">
					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">Project Code</label>
						<input 
							value="NGMR-12345" 
							readOnly 
							className="px-3 py-2 border border-gray-200 rounded-md text-sm w-40 bg-gray-50" 
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

				<div className="rounded-md border border-dashed border-blue-400 bg-blue-50 p-16 flex flex-col items-center justify-center text-center">
					<div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
						<svg className="w-8 h-8 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
							<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
							<path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
						</svg>
					</div>
					<div className="font-medium text-blue-800 mb-2">
						{progress < 100 ? 'Uploading...' : 'Processing...'}
					</div>
					<div className="text-sm text-blue-600 mb-4">{file?.name}</div>
					<div className="w-64 mb-2">
						<div className="flex justify-between text-sm text-blue-600 mb-1">
							<span>{progress < 100 ? 'Upload Progress' : 'Processing PDF'}</span>
							<span>{progress}%</span>
						</div>
						<div className="w-full bg-blue-200 rounded-full h-2">
							<div 
								className="bg-blue-500 h-2 rounded-full transition-all duration-300"
								style={{ width: `${progress}%` }}
							/>
						</div>
					</div>
					{progress >= 100 && (
						<div className="text-xs text-blue-600">Extracting items from design...</div>
					)}
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto">
			<div className="grid grid-cols-2 gap-6 mb-8">
				<div>
					<label className="block text-xs font-medium text-gray-700 mb-1">Project Code</label>
					<input 
						value="NGMR-12345" 
						readOnly 
						className="px-3 py-2 border border-gray-200 rounded-md text-sm w-40 bg-gray-50" 
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

			<div 
				className="rounded-md border border-dashed border-gray-300 p-16 flex flex-col items-center justify-center text-center hover:border-gray-400 transition-colors cursor-pointer"
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				onClick={() => inputRef.current?.click()}
			>
				<svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
				</svg>
				<div className="font-medium text-gray-900 mb-1">Click to upload or drag and drop</div>
				<div className="text-sm text-gray-500 mb-4">PDF (max. 800×400px)</div>
				<button 
					className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
					onClick={(e) => {
						e.stopPropagation();
						inputRef.current?.click();
					}}
				>
					Upload from computer
				</button>
				<input 
					ref={inputRef} 
					type="file" 
					accept="application/pdf" 
					className="hidden" 
					onChange={(e) => handleFileSelect(e.target.files)} 
				/>
			</div>
		</div>
	);
}
