import { useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, CheckCircle } from 'lucide-react';
import { useDemoStore } from '../stores/useDemoStore';
import { Button, ProgressBar, Input } from '../components/ui';

export function UploadStep() {
	const navigate = useNavigate();
	const inputRef = useRef<HTMLInputElement>(null);
	const { 
		upload, 
		currentProjectCode, 
		currentUnits,
		startUpload, 
		simulateUpload, 
		resetUpload 
	} = useDemoStore();

	const onFiles = useCallback(async (files: FileList | null) => {
		if (!files || files.length === 0) return;
		const file = files[0];
		
		// Accept any PDF file for demo
		if (!file.name.toLowerCase().endsWith('.pdf')) {
			// Handle error state if needed
			return;
		}
		
		startUpload(file);
		await simulateUpload();
		
		// Auto-navigate to generate step after successful upload
		setTimeout(() => {
			navigate('/quote/generate');
		}, 1000);
	}, [startUpload, simulateUpload, navigate]);

	const onDrop = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		onFiles(e.dataTransfer.files);
	}, [onFiles]);

	const onDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	const handleClearUpload = () => {
		resetUpload();
	};

	const renderUploadArea = () => {
		if (upload.status === 'success') {
			return (
				<div className="rounded-md border border-dashed border-green-400 bg-green-50 p-16 flex flex-col items-center justify-center text-center">
					<CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
					<div className="font-medium text-green-800">Upload Complete!</div>
					<div className="text-sm text-green-600 mt-2">{upload.fileName}</div>
					<div className="text-xs text-green-600">Processing completed successfully</div>
					<div className="mt-4 space-x-3">
						<Button variant="secondary" size="sm" onClick={handleClearUpload}>
							Clear Upload
						</Button>
						<Button variant="primary" size="sm" onClick={() => navigate('/quote/generate')}>
							Continue to Quote
						</Button>
					</div>
				</div>
			);
		}

		if (upload.status === 'uploading' || upload.status === 'processing') {
			return (
				<div className="rounded-md border border-dashed border-blue-400 bg-blue-50 p-16 flex flex-col items-center justify-center text-center">
					<div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
						<UploadIcon className="h-8 w-8 text-blue-600" />
					</div>
					<div className="font-medium text-blue-800 mb-2">
						{upload.status === 'uploading' ? 'Uploading...' : 'Processing...'}
					</div>
					<div className="text-sm text-blue-600 mb-4">{upload.fileName}</div>
					<div className="w-64">
						<ProgressBar 
							value={upload.status === 'uploading' ? upload.progress : 100} 
							color="blue"
							showLabel
							label={upload.status === 'uploading' ? 'Upload Progress' : 'Processing PDF'}
						/>
					</div>
					{upload.status === 'processing' && (
						<div className="text-xs text-blue-600 mt-2">Extracting items from design...</div>
					)}
				</div>
			);
		}

		return (
			<div 
				className="rounded-md border border-dashed border-gray-300 p-16 flex flex-col items-center justify-center text-center hover:border-gray-400 transition-colors cursor-pointer"
				onDrop={onDrop}
				onDragOver={onDragOver}
				onClick={() => inputRef.current?.click()}
			>
				<UploadIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
				<div className="font-medium text-gray-900">Click to upload or drag and drop</div>
				<div className="text-sm text-gray-500 mt-1">PDF (max. 800×400px)</div>
				<div className="my-4 h-px bg-gray-200 w-80 mx-auto" />
				<Button 
					variant="secondary" 
					icon={UploadIcon}
					onClick={(e) => {
						e.stopPropagation();
						inputRef.current?.click();
					}}
				>
					Upload from computer
				</Button>
				<input 
					ref={inputRef} 
					type="file" 
					accept="application/pdf" 
					className="hidden" 
					onChange={(e) => onFiles(e.target.files)} 
				/>
			</div>
		);
	};

	return (
		<div className="max-w-4xl mx-auto">
			<div className="grid grid-cols-2 gap-6 mb-8">
				<Input 
					label="Project Code"
					value={currentProjectCode}
					readOnly
					className="w-40"
				/>
				<Input 
					label="Units"
					value={currentUnits.toString()}
					readOnly
					className="w-20"
				/>
			</div>

			{renderUploadArea()}

			{upload.error && (
				<div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
					<div className="text-sm text-red-600">{upload.error}</div>
				</div>
			)}
		</div>
	);
}
