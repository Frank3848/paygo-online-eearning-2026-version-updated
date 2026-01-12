import { useState } from 'react';
import { Gift, X, CreditCard, Phone, Wallet, Zap, HelpCircle, Eye, EyeOff, Users, ChevronRight, ChevronLeft, Wifi, ArrowDownLeft, ArrowUpRight, Bell, User, LogOut, Headphones, Globe, Tv, BarChart3, Archive, CircleDollarSign, Check } from 'lucide-react';
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
  { icon: CreditCard, label: 'Buy PAY ID', color: 'bg-amber-400' },
  { icon: Tv, label: 'Watch', color: 'bg-blue-600' },
  { icon: BarChart3, label: 'Airtime', color: 'bg-teal-500' },
  { icon: Archive, label: 'Data', color: 'bg-slate-400' },
  { icon: Headphones, label: 'Support', color: 'bg-purple-600' },
  { icon: Globe, label: 'Group', color: 'bg-blue-500' },
  { icon: CircleDollarSign, label: 'Earn More', color: 'bg-amber-500' },
  { icon: User, label: 'Profile', color: 'bg-blue-500' },
];

const promotions = [
  {
    id: 1,
    title: 'Transact & Win',
    subtitle: 'Locations: Cheers Gold Crest Mall | Chrismar Hotel | Hot Spot Pub & Grill',
    description: 'All customers who pay with PayGo in store will stand a chance to win great prizes.',
  },
  {
    id: 2,
    title: 'Refer & Earn',
    subtitle: 'Share your referral code with friends',
    description: 'Earn ₦500 for every friend that signs up and purchases a PAY ID.',
  },
  {
    id: 3,
    title: 'Weekly Rewards',
    subtitle: 'Complete tasks to earn bonus',
    description: 'Complete daily transactions to unlock weekly bonus rewards.',
  },
];

const Home = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [showBalance, setShowBalance] = useState(true);
  const [currentPromo, setCurrentPromo] = useState(0);
  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowOnboarding(false);
    }
  };

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
      {/* Notification Banner */}
      <div className="bg-red-500 text-white text-center py-2 px-4 text-sm">
        Dear User, We're currently experiencing issues w...
      </div>

      {/* Header */}
      <header className="py-4 flex justify-center bg-white">
        <img 
          src={paygoLogo} 
          alt="PayGo Logo" 
          className="h-12 w-auto object-contain"
        />
      </header>

      {/* Main Content - Dashboard */}
      <main className="flex-1 px-4 pb-24">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-5 text-white mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-base font-medium">Hi, Frank 👋</p>
                <p className="text-white/80 text-sm">Welcome back!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-white/80" />
              <button className="text-white text-sm font-medium flex items-center gap-1">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
          
          <div className="mb-1">
            <p className="text-white/80 text-sm mb-1">Your Balance</p>
            <div className="flex items-center gap-3">
              <p className="text-3xl font-bold">
                {showBalance ? '₦180,000.00' : '••••••••'}
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
            >
              <Check className="h-4 w-4 mr-2" />
              Upgrade
            </Button>
            <Button 
              variant="secondary" 
              className="flex-1 bg-purple-500/50 hover:bg-purple-500/70 text-white border-0 rounded-full h-11"
            >
              <ArrowUpRight className="h-4 w-4 mr-2" />
              Transfer
            </Button>
          </div>
        </div>

        {/* Quick Actions - 8 items in 2 rows */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {quickActions.map((action, index) => (
            <button key={index} className="flex flex-col items-center gap-2">
              <div className={`w-14 h-14 ${action.color} rounded-xl flex items-center justify-center`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs text-gray-600 font-medium text-center">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Current Promotions */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Current Promotions</h3>
          
          <div className="relative rounded-2xl overflow-hidden" style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)'
          }}>
            {/* Background overlay pattern */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
            
            {/* Promo Content */}
            <div className="relative p-5 text-white min-h-[180px] flex flex-col justify-center">
              <h4 className="text-3xl font-bold mb-2 text-pink-200">{promotions[currentPromo].title}</h4>
              <p className="text-yellow-300 text-sm mb-2 font-medium">{promotions[currentPromo].subtitle}</p>
              <p className="text-white/90 text-sm">{promotions[currentPromo].description}</p>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={prevPromo}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/40"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <button 
              onClick={nextPromo}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/40"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {promotions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPromo(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentPromo ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
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
