import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { HelpButton } from '@/components/HelpButton';

const BuyPayId = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('Frank');
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    if (!fullName.trim() || !email.trim()) {
      return;
    }
    
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('Payment initiated! This would connect to actual payment gateway.');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Purple Header */}
      <header className="bg-purple-600 px-4 py-5">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/home')}
            className="text-white"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-white">Buy PAY ID</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 py-6">
        {/* Amount Field */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-900 mb-3">
            Amount
          </label>
          <Input
            value="₦6,500"
            disabled
            className="h-14 text-lg text-gray-400 bg-gray-50 border-gray-200 rounded-xl"
          />
        </div>

        {/* Full Name Field */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-900 mb-3">
            Full Name
          </label>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="h-14 text-lg text-gray-900 bg-white border-gray-200 rounded-xl"
          />
        </div>

        {/* Email Field */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-900 mb-3">
            Your Email Address
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="h-14 text-lg text-gray-900 bg-white border-gray-200 rounded-xl"
          />
        </div>

        {/* Pay Button */}
        <Button 
          onClick={handlePay}
          disabled={!fullName.trim() || !email.trim() || isProcessing}
          className="w-full h-14 text-lg font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-lg disabled:opacity-50"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            'Pay'
          )}
        </Button>

        {/* Footer Text */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Your PAY ID will be displayed on the app once your payment is confirmed.
          </p>
          <p className="text-gray-900 font-semibold">
            PayGo Financial Services LTD
          </p>
        </div>
      </main>

      {/* Help Button */}
      <HelpButton />
    </div>
  );
};

export default BuyPayId;