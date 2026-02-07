import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NeedHelp } from '@/components/NeedHelp';
import { HelpButton } from '@/components/HelpButton';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import paygoLogo from '@/assets/paygo-logo.png';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: 'Login failed',
            description: 'Invalid email or password. Please try again.',
            variant: 'destructive',
          });
        } else if (error.message.includes('Email not confirmed')) {
          toast({
            title: 'Email not verified',
            description: 'Please check your inbox and verify your email first.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Login failed',
            description: error.message,
            variant: 'destructive',
          });
        }
        return;
      }

      if (data.session) {
        toast({
          title: 'Welcome back!',
          description: 'Login successful.',
        });
        navigate('/dashboard');
      }
    } catch (err) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const inputClass = (field: string) =>
    `h-14 bg-card border-input-border placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-0 ${
      errors[field] ? 'border-destructive' : ''
    }`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex justify-end p-4">
        <NeedHelp />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
        <div className="w-full max-w-md animate-[slide-in-right_0.5s_ease-out]">
          {/* Logo - Right aligned */}
          <div className="mb-8">
            <img 
              src={paygoLogo} 
              alt="PayGo Logo" 
              className="h-20 w-auto object-contain rounded-xl animate-swing"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Login to continue
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={inputClass('email')}
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <Input
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={inputClass('password')}
              />
              {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-14 text-base font-medium rounded-xl"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-sm text-center">
            <Link to="/" className="text-link font-medium hover:underline">
              Don't have an account? Register
            </Link>
          </p>
        </div>
      </main>

      {/* Help Button */}
      <HelpButton />
    </div>
  );
};

export default Login;
