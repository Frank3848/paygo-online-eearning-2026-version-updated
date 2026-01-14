import { useState } from 'react';
import { ArrowLeft, CreditCard, Building2, Smartphone, Check, Shield, Clock, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import paygoLogo from '@/assets/paygo-logo.png';

const paymentMethods = [
  {
    id: 'card',
    name: 'Card Payment',
    description: 'Pay with Debit/Credit Card',
    icon: CreditCard,
    color: 'bg-blue-500',
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    description: 'Transfer to our bank account',
    icon: Building2,
    color: 'bg-green-500',
  },
  {
    id: 'ussd',
    name: 'USSD',
    description: 'Pay with USSD code',
    icon: Smartphone,
    color: 'bg-purple-500',
  },
];

const benefits = [
  { icon: Gift, text: 'Unlock ₦180,000 welcome bonus' },
  { icon: Shield, text: 'Secure transactions guaranteed' },
  { icon: Clock, text: 'Instant activation' },
];

const BuyPayId = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = () => {
    if (!selectedMethod) return;
    
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to success or handle payment
      alert('Payment initiated! This would connect to actual payment gateway.');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <button 
            onClick={() => navigate('/home')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <img 
            src={paygoLogo} 
            alt="PayGo Logo" 
            className="h-10 w-auto object-contain"
          />
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6">
        {/* Price Card */}
        <div className="bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 rounded-2xl p-6 text-white mb-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <CreditCard className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Buy PAY ID</h1>
              <p className="text-white/80 text-sm">One-time purchase</p>
            </div>
          </div>
          
          <div className="bg-white/20 rounded-xl p-4 mb-4">
            <p className="text-white/80 text-sm mb-1">Amount to Pay</p>
            <p className="text-4xl font-bold">₦6,500</p>
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <benefit.icon className="h-3.5 w-3.5 text-white" />
                </div>
                <p className="text-white/90 text-sm">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Select Payment Method</h2>
          
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  selectedMethod === method.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center`}>
                  <method.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900">{method.name}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === method.id
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-gray-300'
                }`}>
                  {selectedMethod === method.id && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-500 text-center mb-6">
          By proceeding, you agree to our Terms of Service and Privacy Policy. 
          This is a one-time purchase and is non-refundable.
        </p>

        {/* Purchase Button */}
        <Button 
          onClick={handlePurchase}
          disabled={!selectedMethod || isProcessing}
          className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 hover:from-orange-500 hover:via-orange-600 hover:to-pink-600 text-white shadow-lg disabled:opacity-50"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            'Pay ₦6,500'
          )}
        </Button>
      </main>
    </div>
  );
};

export default BuyPayId;