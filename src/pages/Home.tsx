import { useState } from 'react';
import { Gift, X, CreditCard, Phone, Wallet, Zap, HelpCircle, Eye, EyeOff, Users, ChevronRight, Wifi, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { HelpButton } from '@/components/HelpButton';
import paygoLogo from '@/assets/paygo-logo.png';

const onboardingSteps = [
  {
    icon: Gift,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Welcome Bonus',
    description: (
      <>
        You've received a welcome bonus of{' '}
        <span className="font-semibold text-foreground">₦180,000</span>! This amount is already in 
        your account and can be withdrawn after purchasing a PAY ID.
      </>
    ),
    showQuickLinks: false,
  },
  {
    icon: CreditCard,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'Get Your PAY ID',
    description: (
      <>
        To withdraw funds, you'll need to purchase a PAY ID for{' '}
        <span className="font-semibold text-foreground">₦6,500</span>. This is a one-time purchase that unlocks all features of the app.
      </>
    ),
    showQuickLinks: false,
  },
  {
    icon: Phone,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'Airtime & Data',
    description: (
      <>
        You can purchase airtime and data for all major networks directly from the app. Simply select the service, enter the phone number, choose your plan, and complete your purchase.
      </>
    ),
    showQuickLinks: false,
  },
  {
    icon: Wallet,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    title: 'Withdrawal Process',
    description: (
      <>
        To withdraw your funds, tap the "Withdraw" button on your dashboard, enter your bank details and PAY ID, and submit your request. Withdrawals are processed within 24 hours.
      </>
    ),
    showQuickLinks: false,
  },
  {
    icon: Zap,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    title: 'Earn More',
    description: (
      <>
        Explore our app to discover ways to earn more! Refer friends to earn{' '}
        <span className="font-semibold text-foreground">₦500</span> per referral, join our communities, and take advantage of special promotions.
      </>
    ),
    showQuickLinks: true,
  },
];

const quickActions = [
  { icon: CreditCard, label: 'Pay ID', color: 'bg-blue-500' },
  { icon: Wifi, label: 'Data', color: 'bg-purple-500' },
  { icon: Phone, label: 'Airtime', color: 'bg-green-500' },
  { icon: Users, label: 'Referral', color: 'bg-orange-500' },
];

const transactions = [
  { 
    type: 'credit', 
    title: 'Welcome Bonus', 
    amount: '+₦180,000', 
    date: 'Today, 10:30 AM',
    icon: ArrowDownLeft,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
];

const Home = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [showBalance, setShowBalance] = useState(true);
  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowOnboarding(false);
    }
  };

  const currentStepData = onboardingSteps[currentStep - 1];
  const StepIcon = currentStepData?.icon || Gift;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-center">
        <img 
          src={paygoLogo} 
          alt="PayGo Logo" 
          className="h-12 w-auto object-contain"
        />
      </header>

      {/* Main Content - Dashboard */}
      <main className="flex-1 px-4 pb-24">
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-2xl p-5 text-white mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg">👋</span>
              </div>
              <p className="text-base font-medium">Hi, Frank 👋</p>
            </div>
          </div>
          
          <div className="mb-1">
            <p className="text-white/80 text-sm mb-1">Available Balance</p>
            <div className="flex items-center gap-3">
              <p className="text-3xl font-bold">
                {showBalance ? '₦180,000' : '••••••'}
              </p>
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="text-white/80 hover:text-white"
              >
                {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <Button 
              variant="secondary" 
              className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0 rounded-xl h-11"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Withdraw
            </Button>
            <Button 
              variant="secondary" 
              className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0 rounded-xl h-11"
            >
              <ArrowUpRight className="h-4 w-4 mr-2" />
              Fund
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {quickActions.map((action, index) => (
            <button key={index} className="flex flex-col items-center gap-2">
              <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs text-muted-foreground font-medium">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Transaction History */}
        <div className="bg-card rounded-2xl p-4 border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
            <button className="text-sm text-primary flex items-center gap-1">
              See All <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {transactions.length > 0 ? (
            <div className="space-y-3">
              {transactions.map((tx, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${tx.iconBg} rounded-full flex items-center justify-center`}>
                      <tx.icon className={`h-5 w-5 ${tx.iconColor}`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{tx.title}</p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <p className={`font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.amount}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Wallet className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No transactions yet</p>
            </div>
          )}
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
              {/* Step Icon */}
              <div className={`w-20 h-20 ${currentStepData?.iconBg || 'bg-purple-100'} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <StepIcon className={`h-10 w-10 ${currentStepData?.iconColor || 'text-purple-600'}`} />
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-4">
                {currentStepData?.title || 'Welcome'}
              </h3>

              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                {currentStepData?.description || 'Welcome to PayGo!'}
              </p>

              {/* Quick Links for Step 5 */}
              {currentStepData?.showQuickLinks && (
                <div className="flex justify-center gap-8 mb-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-pink-500 rounded-full" />
                    </div>
                    <span className="text-sm text-muted-foreground">Communities</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                      <HelpCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <span className="text-sm text-muted-foreground">Support</span>
                  </div>
                </div>
              )}

              {/* Next/Get Started Button */}
              <Button 
                onClick={handleNext}
                className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 hover:from-orange-500 hover:via-orange-600 hover:to-pink-600 text-white shadow-lg"
              >
                {isLastStep ? 'Get Started →' : 'Next →'}
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
