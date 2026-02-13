import { useState, useEffect } from 'react';
import { useAuthStore, useUIStore } from './store';
import { mockAdminUser } from './data/mockData';

// Layout
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AIChat } from './components/AIChat';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { LoginPage } from './pages/LoginPage';
import { TerminalPage } from './pages/TerminalPage';
import { MacroPage } from './pages/MacroPage';
import { ReportPage } from './pages/ReportPage';
import { NewsPage } from './pages/NewsPage';
import { AdminPage } from './pages/AdminPage';
import { RiskCalculatorPage } from './pages/RiskCalculatorPage';

import type { ReportModule } from './types';

export function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user, setUser, isAuthenticated } = useAuthStore();
  const { setCurrentPage: setUICurrentPage } = useUIStore();

  // Determine if we're in terminal mode (authenticated area)
  const isTerminalMode = isAuthenticated && [
    'terminal', 'macro', 'reports', 'news', 'admin', 'profile',
    'money_flow', 'oi_analyzer', 'gold_intelligence', 'forex_intelligence',
    'btc_intelligence', 'sp500_report', 'expert_learning', 'risk_calculator'
  ].includes(currentPage);

  const handleNavigate = (page: string) => {
    // If navigating to terminal without being authenticated, auto-login for demo
    if (page === 'terminal' && !isAuthenticated) {
      setUser(mockAdminUser); // Login as admin by default so admin panel is accessible
    }
    
    // If navigating to admin, ensure user is admin
    if (page === 'admin') {
      if (!isAuthenticated) {
        setUser(mockAdminUser);
      } else if (user && user.role !== 'super_admin') {
        setUser(mockAdminUser);
      }
    }

    setCurrentPage(page);
    setUICurrentPage(page);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setUICurrentPage(currentPage);
  }, [currentPage, setUICurrentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'blog':
        return <BlogPage />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'terminal':
        return <TerminalPage onNavigate={handleNavigate} />;
      case 'macro':
        return <MacroPage />;
      case 'news':
        return <NewsPage />;
      case 'admin':
        return <AdminPage />;
      case 'risk_calculator':
        return <RiskCalculatorPage />;
      case 'money_flow':
      case 'oi_analyzer':
      case 'gold_intelligence':
      case 'forex_intelligence':
      case 'btc_intelligence':
      case 'sp500_report':
      case 'expert_learning':
        return <ReportPage module={currentPage as ReportModule} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar 
        onNavigate={handleNavigate} 
        currentPage={currentPage}
        isTerminal={isTerminalMode}
      />
      
      <main>
        {renderPage()}
      </main>

      {/* Footer only on public pages */}
      {!isTerminalMode && currentPage !== 'login' && <Footer />}

      {/* AI Chat - only when authenticated */}
      {isAuthenticated && <AIChat />}
    </div>
  );
}
