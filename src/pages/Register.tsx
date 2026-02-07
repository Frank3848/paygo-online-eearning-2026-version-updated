import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CountrySelect } from '@/components/CountrySelect';
import { NeedHelp } from '@/components/NeedHelp';
import { HelpButton } from '@/components/HelpButton';
import paygoLogo from '@/assets/paygo-logo.png';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register:', formData);
    // Handle registration logic here
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
        <div className="w-full max-w-md animate-[slide-in-right_0.5s_ease-out]">
          {/* Logo - Left aligned */}
          <div className="mb-8">
            <img 
              src={paygoLogo} 
              alt="PayGo Logo" 
              className="h-20 w-auto object-contain rounded-xl animate-swing"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Register to continue
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <Input
              type="text"
              placeholder="Enter Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="h-14 bg-card border-input-border placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-0"
            />
            
            <Input
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="h-14 bg-card border-input-border placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-0"
            />
            
            <CountrySelect
              value={formData.country}
              onValueChange={(value) => handleInputChange('country', value)}
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
              Register
            </Button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-sm text-center">
            <Link to="/login" className="text-link font-medium hover:underline">
              Already have an account? Login
            </Link>
          </p>
        </div>
      </main>

      {/* Help Button */}
      <HelpButton />
    </div>
  );
};

export default Register;
