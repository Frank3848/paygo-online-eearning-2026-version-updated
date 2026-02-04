import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, X, CreditCard, Phone, Wallet, Zap, HelpCircle, Eye, EyeOff, Users, ChevronRight, ChevronLeft, ArrowUpRight, Bell, LogOut, Check, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { HelpButton } from '@/components/HelpButton';
import { UpgradeDrawer } from '@/components/UpgradeDrawer';
import paygoLogo from '@/assets/paygo-logo.png';
import promoTransactWin from '@/assets/promo-transact-win.jpg';
import promoBasketball from '@/assets/promo-basketball.jpg';
import promoAirtime from '@/assets/promo-airtime.jpg';
import {
  CreditCardIcon,
  TvIcon,
  AirtimeChartIcon,
  DataCabinetIcon,
  HeadphonesIcon,
  GlobeIcon,
  MoneyBagIcon,
  ProfileIcon
} from '@/components/QuickActionIcons';

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
  { IconComponent: CreditCardIcon, label: 'Buy PAY ID', route: '/buy-pay-id' },
  { IconComponent: TvIcon, label: 'Watch', route: '/watch' },
  { IconComponent: AirtimeChartIcon, label: 'Airtime', route: '/airtime' },
  { IconComponent: DataCabinetIcon, label: 'Data', route: '/data' },
  { IconComponent: HeadphonesIcon, label: 'Support', route: '/support' },
  { IconComponent: GlobeIcon, label: 'Group', route: '/communities' },
  { IconComponent: MoneyBagIcon, label: 'Earn More', route: '/earn-more' },
  { IconComponent: ProfileIcon, label: 'Profile', route: '/profile' },
];

const promotions = [
  {
    id: 1,
    image: promoTransactWin,
  },
  {
    id: 2,
    image: promoBasketball,
  },
  {
    id: 3,
    image: promoAirtime,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(() => {
    // Check if user has completed onboarding before
    return localStorage.getItem('onboardingComplete') !== 'true';
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [showBalance, setShowBalance] = useState(true);
  const [currentPromo, setCurrentPromo] = useState(0);
  const [showUpgradeDrawer, setShowUpgradeDrawer] = useState(false);
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('walletBalance');
    return saved ? parseFloat(saved) : 180000;
  });
  const totalSteps = 5;

  // Initialize balance in localStorage if not set
  useEffect(() => {
    if (!localStorage.getItem('walletBalance')) {
      localStorage.setItem('walletBalance', '180000');
    }
  }, []);

  // Listen for balance changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('walletBalance');
      if (saved) setBalance(parseFloat(saved));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowOnboarding(false);
      localStorage.setItem('onboardingComplete', 'true');
    }
  };

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('onboardingComplete', 'true');
  };

  // Auto-rotate promotions every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promotions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextPromo = () => {
    setCurrentPromo((prev) => (prev + 1) % promotions.length);
  };

  const prevPromo = () => {
    setCurrentPromo((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  const currentStepData = onboardingSteps[currentStep - 1];
  const StepIcon = currentStepData?.icon || Gift;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="py-4 flex justify-center bg-white">
        <img 
          src={paygoLogo} 
          alt="PayGo Logo" 
          className="h-12 w-auto object-contain animate-swing"
        />
      </header>

      {/* Main Content - Dashboard */}
      <main className="flex-1 px-4 pb-24">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-5 text-white mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/profile')}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <User className="h-5 w-5 text-white" />
              </button>
              <div>
                <p className="text-base font-medium">Hi, Frank 👋</p>
                <p className="text-white/80 text-sm">Welcome back!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-white/80" />
              <button 
                onClick={() => navigate('/register')}
                className="text-white text-sm font-medium flex items-center gap-1"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
          
          <div className="mb-1">
            <p className="text-white/80 text-sm mb-1">Your Balance</p>
            <div className="flex items-center gap-3">
              <p className="text-3xl font-bold">
                {showBalance ? `₦${balance.toLocaleString()}.00` : '••••••••'}
              </p>
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="text-white/80 hover:text-white"
              >
                {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <p className="text-white/80 text-sm mt-1">
              Weekly Rewards: <span className="text-white font-medium">₦180,000.00</span>
            </p>
          </div>

          <div className="flex gap-3 mt-4">
            <Button 
              variant="secondary" 
              className="flex-1 bg-purple-500/50 hover:bg-purple-500/70 text-white border-0 rounded-full h-11"
              onClick={() => setShowUpgradeDrawer(true)}
            >
              <Check className="h-4 w-4 mr-2" />
              Upgrade
            </Button>
            <Button 
              variant="secondary" 
              className="flex-1 bg-purple-500/50 hover:bg-purple-500/70 text-white border-0 rounded-full h-11"
              onClick={() => navigate('/transfer')}
            >
              <ArrowUpRight className="h-4 w-4 mr-2" />
              Transfer
            </Button>
          </div>
        </div>

        {/* Quick Actions - 8 items in 2 rows */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {quickActions.map((action, index) => (
            <button 
              key={index} 
              className="flex flex-col items-center gap-2"
              onClick={() => action.route && navigate(action.route)}
            >
              <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center shadow-sm">
                <action.IconComponent />
              </div>
              <span className="text-xs text-gray-600 font-medium text-center">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Current Promotions */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Current Promotions</h3>
          
          <div className="relative rounded-2xl overflow-hidden shadow-lg bg-purple-500">
            {/* Promo Image */}
            <img 
              src={promotions[currentPromo].image} 
              alt={`Promotion ${currentPromo + 1}`}
              className="w-full h-auto object-contain"
            />

            {/* Navigation Arrows */}
            <button 
              onClick={prevPromo}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <button 
              onClick={nextPromo}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {promotions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPromo(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentPromo ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Onboarding Modal */}
      <Dialog open={showOnboarding} onOpenChange={handleCloseOnboarding}>
        <DialogContent className="p-0 border-0 max-w-sm mx-auto overflow-hidden bg-transparent shadow-none">
          <div className="bg-white rounded-2xl overflow-hidden">
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-orange-400 via-pink-500 to-pink-600 p-6 relative">
              <button 
                onClick={handleCloseOnboarding}
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

      {/* Upgrade Drawer */}
      <UpgradeDrawer open={showUpgradeDrawer} onOpenChange={setShowUpgradeDrawer} />
    </div>
  );
};

export default Home;
