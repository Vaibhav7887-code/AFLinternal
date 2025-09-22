import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { isValidNGMR } from '../data/mockBudget';

export default function NGMRBudgetEntry() {
  const navigate = useNavigate();
  const [ngmrCode, setNgmrCode] = useState('4847');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ngmrCode.trim()) {
      setError('Please enter an NGMR code');
      return;
    }

    if (!isValidNGMR(ngmrCode.trim())) {
      setError('Invalid NGMR format. Please enter 4-6 digits.');
      return;
    }

    setError('');
    navigate(`/ngmr-budget/${ngmrCode.trim()}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNgmrCode(value);
    if (error) {
      setError('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center py-16">
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">NGMR Budget</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="ngmr" className="block text-sm font-medium text-gray-700 mb-2">
                Enter NGMR
              </label>
              <div className="relative">
                <input
                  id="ngmr"
                  type="text"
                  value={ngmrCode}
                  onChange={handleInputChange}
                  placeholder="e.g., 4847"
                  className={`w-full px-4 py-3 text-center text-3xl font-bold border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    error ? 'border-red-300' : 'border-gray-300'
                  }`}
                  maxLength={6}
                />
                {error && (
                  <div className="absolute -bottom-6 left-0 text-sm text-red-600">
                    {error}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                View Budget Update
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">Recent NGMRs:</p>
            <div className="flex justify-center gap-2">
              {['4847', '12345', '5658'].map((code) => (
                <button
                  key={code}
                  onClick={() => {
                    setNgmrCode(code);
                    setError('');
                  }}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
