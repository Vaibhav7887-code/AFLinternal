import { Routes, Route, Navigate } from 'react-router-dom';
import { SimpleLayout } from './components/SimpleLayout';
import { QuoteLayout } from './components/QuoteLayout';
import Dashboard from './pages/Dashboard';
import Notifications from './pages/Notifications';
import ChangeOrders from './pages/ChangeOrders';
import ChangeOrderDetail from './pages/ChangeOrderDetail';
import NGMRBudgetEntry from './pages/NGMRBudgetEntry';
import NGMRBudgetOverview from './pages/NGMRBudgetOverview';
import DesignEdits from './pages/DesignEdits';
import { SimpleUploadStep } from './quote/SimpleUploadStep';
import { GenerateQuoteStep } from './quote/GenerateQuoteStep';
import { SubmitStep } from './quote/SubmitStep';

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/dashboard" replace />} />
			<Route element={<SimpleLayout />}>
				{/* Dashboard and Main Pages */}
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/notifications" element={<Notifications />} />
				<Route path="/change-orders" element={<ChangeOrders />} />
				<Route path="/change-orders/:id" element={<ChangeOrderDetail />} />
				<Route path="/design-edits" element={<DesignEdits />} />
				<Route path="/ngmr-budget" element={<NGMRBudgetEntry />} />
				<Route path="/ngmr-budget/:ngmrId" element={<NGMRBudgetOverview />} />
				
				{/* Quote Generation Workflow */}
				<Route element={<QuoteLayout />}>
					<Route path="/quote/upload" element={<SimpleUploadStep />} />
					<Route path="/quote/generate" element={<GenerateQuoteStep />} />
					<Route path="/quote/submit" element={<SubmitStep />} />
				</Route>
			</Route>
		</Routes>
	);
}
