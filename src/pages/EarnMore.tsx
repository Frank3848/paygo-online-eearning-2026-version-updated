import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HelpButton } from '@/components/HelpButton';

const EarnMore = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    window.open('https://bluepay.example.com/signup', '_blank');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Earn More</h1>
      </header>

      {/* Content - Gradient Background */}
      <main className="flex-1 bg-gradient-to-br from-purple-400 via-purple-500 to-pink-400 flex flex-col items-center justify-center px-6 py-12">
        {/* Main Title */}
        <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">BluePay</h2>
        
        {/* Description */}
        <div className="text-center space-y-6 mb-10">
          <p className="text-white text-xl font-medium leading-relaxed">
            Take your earnings to the next level with BluePay.
          </p>
          
          <p className="text-white/90 text-lg leading-relaxed">
            Access exclusive features and higher earning opportunities.
          </p>
          
          <p className="text-white/90 text-lg leading-relaxed">
            Join thousands of users already maximizing their income.
          </p>
        </div>

        {/* Sign Up Button */}
        <Button 
          onClick={handleSignUp}
          className="w-full max-w-sm h-16 text-xl font-bold rounded-2xl bg-purple-500/80 hover:bg-purple-600/90 text-white shadow-xl border-0 backdrop-blur-sm"
        >
          Sign Up Now
          <ExternalLink className="h-5 w-5 ml-2" />
        </Button>
      </main>

      <HelpButton />
    </div>
  );
};

export default EarnMore;
