import { useState } from 'react';
import { Gift, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { HelpButton } from '@/components/HelpButton';
import paygoLogo from '@/assets/paygo-logo.png';

const Home = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowOnboarding(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-center">
        <img 
          src={paygoLogo} 
          alt="PayGo Logo" 
          className="h-16 w-auto object-contain"
        />
      </header>

      {/* Main Content - Placeholder for actual home content */}
      <main className="flex-1 px-4">
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">👋</span>
            </div>
            <div>
              <p className="text-lg font-semibold">Hi, Frank 👋</p>
            </div>
          </div>
        </div>
      </main>

      {/* Onboarding Modal */}
      <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
        <DialogContent className="p-0 border-0 max-w-sm mx-auto overflow-hidden bg-transparent shadow-none">
          <div className="bg-white rounded-2xl overflow-hidden">
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-orange-400 via-pink-500 to-pink-600 p-6 relative">
              <button 
                onClick={() => setShowOnboarding(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome to PayGo, Frank!
              </h2>
              <p className="text-white/90 text-sm mb-4">
                Step {currentStep} of {totalSteps}
              </p>
              {/* Progress Bar */}
              <div className="flex gap-2">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div 
                    key={index}
                    className={`h-1.5 flex-1 rounded-full ${
                      index < currentStep 
                        ? 'bg-white' 
                        : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 text-center">
              {/* Gift Icon */}
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="h-10 w-10 text-purple-600" />
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-4">
                Welcome Bonus
              </h3>

              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                You've received a welcome bonus of{' '}
                <span className="font-semibold text-foreground">₦180,000</span>! This amount is already in 
                your account and can be withdrawn after purchasing a PAY ID.
              </p>

              {/* Next Button */}
              <Button 
                onClick={handleNext}
                className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 hover:from-orange-500 hover:via-orange-600 hover:to-pink-600 text-white shadow-lg"
              >
                Next →
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Help Button */}
      <HelpButton />
    </div>
  );
};

export default Home;
