import { LogOut, Code2, TrendingUp } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import ProgressBar from '../ui/ProgressBar';

const Navbar = ({ solved = 0, total = 0 }) => {
  const { user, logout } = useAuth();

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  return (
    <header className="fixed top-0 left-0 right-0 z-30 h-14 bg-gray-950 border-b border-gray-800 flex items-center px-5 gap-4">
      <div className="flex items-center gap-2 min-w-max">
        <Code2 className="h-5 w-5 text-sky-400" />
        <span className="font-semibold text-gray-100 tracking-tight">DSA Sheet</span>
      </div>

      <div className="h-5 w-px bg-gray-800" />

      <div className="flex items-center gap-3 flex-1 min-w-0">
        <TrendingUp className="h-4 w-4 text-gray-500 shrink-0" />
        <div className="w-44">
          <ProgressBar solved={solved} total={total} size="sm" showLabel={false} />
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap">
          <span className="text-gray-200 font-medium">{solved}</span> / {total} solved
        </span>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-xs font-semibold text-sky-300">
            {initials}
          </div>
          <span className="text-sm text-gray-300 hidden sm:block">{user?.name}</span>
        </div>
        <button
          onClick={logout}
          title="Sign out"
          className="p-1.5 rounded-md text-gray-500 hover:text-gray-200 hover:bg-gray-800 transition-colors"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
