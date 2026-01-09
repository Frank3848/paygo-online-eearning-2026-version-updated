import { NeedHelp } from '@/components/NeedHelp';
import { HelpButton } from '@/components/HelpButton';
import paygoLogo from '@/assets/paygo-logo.png';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <img 
          src={paygoLogo} 
          alt="PayGo Logo" 
          className="h-10 w-auto object-contain"
        />
        <NeedHelp />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
        <div className="animate-[slide-in-right_0.5s_ease-out] text-center">
          <h1 className="text-3xl font-semibold text-foreground mb-4">
            Welcome to PayGo!
          </h1>
          <p className="text-muted-foreground mb-8">
            Your account has been created successfully.
          </p>
          <div className="w-full max-w-md p-6 bg-card rounded-2xl border border-input-border">
            <p className="text-foreground">
              Start exploring your dashboard and manage your payments.
            </p>
          </div>
        </div>
      </main>

      {/* Help Button */}
      <HelpButton />
    </div>
  );
};

export default Dashboard;
