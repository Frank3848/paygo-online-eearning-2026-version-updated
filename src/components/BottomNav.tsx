import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ArrowUpRight, User, Zap, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', route: '/home' },
  { icon: ArrowUpRight, label: 'Transfer', route: '/transfer' },
  { icon: Zap, label: 'Earn', route: '/earn-more' },
  { icon: Headphones, label: 'Support', route: '/support' },
  { icon: User, label: 'Profile', route: '/profile' },
];

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-2xl border-t border-purple-100/60" />
      
      <div className="relative flex items-center justify-around px-2 pt-2 pb-4 max-w-lg mx-auto">
        {navItems.map(({ icon: Icon, label, route }) => {
          const isActive = location.pathname === route;
          return (
            <button
              key={route}
              onClick={() => navigate(route)}
              className="relative flex flex-col items-center gap-1 min-w-[56px] group"
            >
              {/* Active pill glow */}
              {isActive && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-purple-500 shadow-[0_0_8px_2px_rgba(139,92,246,0.5)]" />
              )}

              {/* Icon container */}
              <div className={cn(
                "w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300",
                isActive
                  ? "bg-gradient-to-br from-purple-500 to-violet-600 shadow-[0_6px_16px_rgba(139,92,246,0.45)] scale-110"
                  : "bg-transparent group-active:scale-95"
              )}>
                <Icon className={cn(
                  "transition-all duration-300",
                  isActive ? "h-5 w-5 text-white" : "h-5 w-5 text-gray-400 group-hover:text-purple-400"
                )} />
              </div>

              {/* Label */}
              <span className={cn(
                "text-[10px] font-semibold tracking-wide transition-all duration-300",
                isActive ? "text-purple-600" : "text-gray-400 group-hover:text-purple-400"
              )}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
