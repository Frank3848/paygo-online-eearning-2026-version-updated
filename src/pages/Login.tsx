import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NeedHelp } from '@/components/NeedHelp';
import { HelpButton } from '@/components/HelpButton';
import paygoLogo from '@/assets/paygo-logo.png';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', formData);
    // Handle login logic here
    navigate('/dashboard');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex justify-end p-4">
        <NeedHelp />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src={paygoLogo} 
            alt="PayGo Logo" 
            className="h-20 w-auto object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-foreground mb-8">
          Login to continue
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <Input
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="h-14 bg-card border-input-border placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-0"
          />
          
          <Input
            type="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="h-14 bg-card border-input-border placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-0"
          />
          
          <Button 
            type="submit" 
            className="w-full h-14 text-base font-medium rounded-xl"
          >
            Login
          </Button>
        </form>

        {/* Forgot Password Link */}
        <Link 
          to="/forgot-password" 
          className="mt-4 text-sm text-link font-medium hover:underline"
        >
          Forgot Password?
        </Link>

        {/* Register Link */}
        <p className="mt-6 text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/" className="text-link font-medium hover:underline">
            Register
          </Link>
        </p>
      </main>

      {/* Help Button */}
      <HelpButton />
    </div>
  );
};

export default Login;
