import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ArrowUpRight, User, Zap, HeadphonesIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', route: '/home' },
  { icon: ArrowUpRight, label: 'Transfer', route: '/transfer' },
  { icon: Zap, label: 'Earn', route: '/earn-more' },
  { icon: HeadphonesIcon, label: 'Support', route: '/support' },
  { icon: User, label: 'Profile', route: '/profile' },
];

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-purple-100 shadow-[0_-4px_24px_rgba(139,92,246,0.08)]">
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {navItems.map(({ icon: Icon, label, route }) => {
          const isActive = location.pathname === route;
          return (
            <button
              key={route}
              onClick={() => navigate(route)}
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 group"
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
                isActive
                  ? "bg-purple-600 shadow-[0_4px_12px_rgba(139,92,246,0.4)]"
                  : "bg-transparent group-hover:bg-purple-50"
              )}>
                <Icon className={cn(
                  "h-5 w-5 transition-colors duration-200",
                  isActive ? "text-white" : "text-gray-400 group-hover:text-purple-500"
                )} />
              </div>
              <span className={cn(
                "text-[10px] font-medium transition-colors duration-200",
                isActive ? "text-purple-600" : "text-gray-400 group-hover:text-purple-500"
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
