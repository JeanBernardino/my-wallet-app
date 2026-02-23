import { useAuth } from '../hooks';
import { Button } from './Button';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm shadow-lg border-b-4 border-[#009900]">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Menu Button & Breadcrumb */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg text-[#006600] hover:bg-[#ccffcc]/50 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Breadcrumb */}
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-[#006600] font-medium">Dashboard</span>
              <svg
                className="w-4 h-4 text-[#66cc66]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-[#003300] font-semibold">Início</span>
            </div>
          </div>

          {/* Right Section - Search, Notifications & User */}
          <div className="flex items-center gap-3">
            {/* Search Bar (Hidden on mobile) */}
            <div className="hidden md:flex items-center gap-2 bg-[#ccffcc]/30 rounded-xl px-4 py-2 min-w-[200px] lg:min-w-[300px]">
              <svg
                className="w-5 h-5 text-[#006600]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Buscar transações..."
                className="bg-transparent flex-1 text-[#003300] placeholder-[#006600]/50 outline-none text-sm"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg text-[#006600] hover:bg-[#ccffcc]/50 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {/* Notification Badge */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* User Menu */}
            <div className="flex items-center gap-3 pl-3 border-l border-[#ccffcc]">
              {user?.photoURL && (
                <div className="relative">
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-10 h-10 rounded-full ring-2 ring-[#66cc66] shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#009900] rounded-full border-2 border-white"></div>
                </div>
              )}
              <div className="hidden lg:block">
                <p className="text-sm font-semibold text-[#003300]">
                  {user?.displayName || 'Usuário'}
                </p>
                <p className="text-xs text-[#006600]">
                  {user?.email}
                </p>
              </div>
              <Button
                onClick={logout}
                className="hidden sm:flex bg-gradient-to-r from-[#006600] to-[#003300] hover:from-[#003300] hover:to-[#006600] text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-sm"
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
