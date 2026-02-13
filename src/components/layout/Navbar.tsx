import { motion } from 'framer-motion';
import { Menu, X, User, LogOut, Settings, Bell } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/store';
import { Button } from '@/components/ui/Button';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  isTerminal?: boolean;
}

export function Navbar({ onNavigate, currentPage, isTerminal = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  const publicLinks = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Blog', href: 'blog' },
  ];

  const terminalLinks = [
    { name: 'Dashboard', href: 'terminal' },
    { name: 'Macro Analysis', href: 'macro' },
    { name: 'News', href: 'news' },
    { name: '⚙️ Admin Panel', href: 'admin' },
  ];

  const links = isTerminal ? terminalLinks : publicLinks;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'bg-gray-900/80 backdrop-blur-xl border-b border-white/10'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="ml-3 text-xl font-semibold text-white">TradePro</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => onNavigate(link.href)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  currentPage === link.href
                    ? 'text-white bg-white/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.full_name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className="text-sm text-white">{user?.full_name}</span>
                  </button>
                  
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl bg-gray-800 border border-white/10 shadow-xl overflow-hidden"
                    >
                      <button
                        onClick={() => { onNavigate('profile'); setUserMenuOpen(false); }}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-white/5"
                      >
                        <User className="w-4 h-4 mr-3" />
                        Profile
                      </button>
                      <button
                        onClick={() => { onNavigate('admin'); setUserMenuOpen(false); }}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-white/5"
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Admin Panel
                      </button>
                      <button
                        onClick={() => { logout(); onNavigate('home'); setUserMenuOpen(false); }}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-400 hover:bg-white/5 border-t border-white/10"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => onNavigate('login')}>
                  Sign In
                </Button>
                <Button onClick={() => onNavigate('terminal')}>
                  Data Terminal
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-gray-900/95 border-t border-white/10"
        >
          <div className="px-4 py-4 space-y-2">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => { onNavigate(link.href); setMobileMenuOpen(false); }}
                className={cn(
                  'block w-full text-left px-4 py-3 rounded-lg text-sm font-medium',
                  currentPage === link.href
                    ? 'text-white bg-white/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                {link.name}
              </button>
            ))}
            {!isAuthenticated && (
              <div className="pt-4 space-y-2">
                <Button variant="secondary" className="w-full" onClick={() => onNavigate('login')}>
                  Sign In
                </Button>
                <Button className="w-full" onClick={() => onNavigate('terminal')}>
                  Data Terminal
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
