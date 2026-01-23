import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HelpButton } from '@/components/HelpButton';

const BuyPayIdPreparing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fullName, email, amount } = location.state || { fullName: '', email: '', amount: 6500 };

  useEffect(() => {
    // Simulate preparing payment account
    const timer = setTimeout(() => {
      navigate('/buy-pay-id/payment', { 
        state: { fullName, email, amount } 
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, fullName, email, amount]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Purple Header */}
      <header className="bg-[hsl(var(--paygo-purple))] px-4 py-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/buy-pay-id')}
            className="text-white"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-white">Buy PAY ID</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 bg-[#f8f9fb]">
        {/* Purple Circular Spinner */}
        <div className="relative w-32 h-32 mb-8">
          <svg className="w-full h-full animate-spin" style={{ animationDuration: '2s' }} viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#e8dcf8"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="hsl(273, 82%, 56%)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="62.83 188.49"
              transform="rotate(-90 50 50)"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          Preparing Payment<br />Account
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 text-center mb-8">
          Please wait while we set up your payment...
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gray-800 rounded-full animate-pulse"
            style={{ width: '50%' }}
          />
        </div>

        {/* Footer */}
        <div className="mt-auto pb-8">
          <p className="text-gray-900 font-semibold text-center">
            PayGo Financial Services LTD
          </p>
        </div>
      </main>

      {/* Help Button */}
      <HelpButton />
    </div>
  );
};

export default BuyPayIdPreparing;
