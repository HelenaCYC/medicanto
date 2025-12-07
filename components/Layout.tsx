import React, { useState } from 'react';
import { Book, Brain, GraduationCap, LayoutGrid, Menu, Search, Settings, User, X } from 'lucide-react';
import { AppMode } from '../types';
import { AdBanner } from './AdBanner';

interface LayoutProps {
  currentMode: AppMode;
  onNavigate: (mode: AppMode) => void;
  children: React.ReactNode;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
      active 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ currentMode, onNavigate, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Admin link removed from public navigation
  const navItems = [
    { mode: AppMode.HOME, label: 'Home', icon: LayoutGrid },
    { mode: AppMode.GLOSSARY, label: 'Glossary', icon: Book },
    { mode: AppMode.FLASHCARDS, label: 'Study Deck', icon: Brain },
    { mode: AppMode.QUIZ, label: 'Quiz Mode', icon: GraduationCap },
    { mode: AppMode.PROFILE, label: 'Profile', icon: User },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full h-16 bg-white border-b z-20 flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-blue-600">
          <Brain className="w-8 h-8" />
          <span className="font-bold text-xl tracking-tight">MediCanto</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col p-4">
          <div className="hidden lg:flex items-center gap-2 px-2 mb-8 text-blue-600">
            <Brain className="w-8 h-8" />
            <span className="font-bold text-xl tracking-tight">MediCanto</span>
          </div>

          <div className="space-y-2 flex-1">
            {navItems.map((item) => (
              <NavItem
                key={item.mode}
                icon={item.icon}
                label={item.label}
                active={currentMode === item.mode}
                onClick={() => {
                  onNavigate(item.mode);
                  setIsMobileMenuOpen(false);
                }}
              />
            ))}
          </div>

          <div className="mt-4 mb-4">
            <AdBanner slotId="1234567890" className="h-48 w-full" />
          </div>

          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="text-sm font-semibold text-blue-800 mb-1">Daily Goal</h4>
            <div className="w-full bg-blue-200 h-2 rounded-full mb-2">
              <div className="bg-blue-600 h-2 rounded-full w-[60%]"></div>
            </div>
            <p className="text-xs text-blue-600">6/10 Terms Mastered</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-hidden flex flex-col pt-16 lg:pt-0 w-full relative">
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};