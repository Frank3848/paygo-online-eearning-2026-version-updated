import { useNavigate, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TransferSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount } = location.state || { amount: '0' };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Success Icon */}
      <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-8 shadow-lg">
        <Check className="h-16 w-16 text-white" strokeWidth={3} />
      </div>

      {/* Success Text */}
      <h1 className="text-2xl font-bold text-purple-600 mb-2">Transfer Successful!</h1>
      <p className="text-muted-foreground text-center mb-6">
        Your transfer of ₦{Number(amount).toLocaleString()} has been processed successfully.
      </p>

      {/* Success Badge */}
      <div className="bg-purple-100 text-purple-600 px-6 py-2 rounded-full mb-8 flex items-center gap-2">
        <span>🎉</span>
        <span className="font-medium">Success</span>
      </div>

      {/* Back Button */}
      <Button
        onClick={() => navigate('/home')}
        className="w-full max-w-sm h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white shadow-lg"
      >
        Back to Dashboard
      </Button>
    </div>
  );
};

export default TransferSuccess;
