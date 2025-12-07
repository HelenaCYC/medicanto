import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Glossary } from './features/Glossary';
import { StudySession } from './features/StudySession';
import { Quiz } from './features/Quiz';
import { Admin } from './features/Admin';
import { DataService } from './services/dataService';
import { MedicalTerm, AppMode } from './types';
import { CATEGORIES } from './constants';
import { Brain, TrendingUp, Trophy, Lock, ShieldCheck, ChevronRight } from 'lucide-react';

const App = () => {
  const [currentMode, setCurrentMode] = useState<AppMode>(AppMode.HOME);
  const [terms, setTerms] = useState<MedicalTerm[]>([]);
  
  // Admin Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState(false);

  // Load data on mount
  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setTerms(DataService.getTerms());
  };

  const handleAdminLogin = (e: React.FormEvent) => {
      e.preventDefault();
      // Simple hardcoded PIN for MVP. In production, use environment variables or auth provider.
      if (adminPin === '1234') {
          setIsAdminLoggedIn(true);
          setPinError(false);
          setAdminPin('');
      } else {
          setPinError(true);
      }
  };

  const renderContent = () => {
    switch (currentMode) {
      case AppMode.HOME:
        return (
          <div className="space-y-8">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Student</h1>
              <p className="text-slate-500">Ready to master your medical interpretation skills today?</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                     <Brain className="opacity-80" />
                     <h3 className="font-semibold text-lg">Daily Flashcards</h3>
                  </div>
                  <p className="text-blue-100 mb-6 text-sm">Review 10 high-priority terms for your upcoming clinical rotation.</p>
                  <button 
                    onClick={() => setCurrentMode(AppMode.FLASHCARDS)}
                    className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 rounded-lg font-medium transition-colors"
                  >
                    Start Session
                  </button>
               </div>

               <div className="bg-white border rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4 text-purple-600">
                     <TrendingUp />
                     <h3 className="font-semibold text-lg text-slate-800">Progress</h3>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                     <span className="text-4xl font-bold text-slate-900">{terms.filter(t => !t.isHard).length}</span>
                     <span className="text-slate-400 mb-1">/ {terms.length} Terms</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full">
                     <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${(terms.filter(t => !t.isHard).length / terms.length) * 100}%` }}
                     ></div>
                  </div>
               </div>

               <div className="bg-white border rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4 text-orange-500">
                     <Trophy />
                     <h3 className="font-semibold text-lg text-slate-800">Quiz Streak</h3>
                  </div>
                  <p className="text-slate-600 mb-4 text-sm">You've completed quizzes 3 days in a row. Keep it up!</p>
                  <button 
                    onClick={() => setCurrentMode(AppMode.QUIZ)}
                    className="text-orange-600 font-semibold text-sm hover:underline"
                  >
                    Take a Quiz →
                  </button>
               </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4">Browse Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setCurrentMode(AppMode.GLOSSARY)}
                    className="p-4 bg-white border rounded-xl hover:border-blue-300 hover:shadow-md transition-all text-left group"
                  >
                    <div className="w-10 h-10 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-50 group-hover:text-blue-600">
                       {/* Placeholder for dynamic icon mapping */}
                       <div className="font-bold text-lg">{cat.name[0]}</div>
                    </div>
                    <h4 className="font-semibold text-slate-800 mb-1">{cat.name}</h4>
                    <p className="text-xs text-slate-400">{cat.count} terms</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case AppMode.GLOSSARY:
        return <Glossary terms={terms} onUpdate={refreshData} />;
      case AppMode.FLASHCARDS:
        return <StudySession terms={terms} />;
      case AppMode.QUIZ:
        return <Quiz />;
      case AppMode.ADMIN:
        if (!isAdminLoggedIn) {
            return (
                <div className="max-w-md mx-auto mt-20">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border text-center">
                        <div className="w-16 h-16 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Admin Access</h2>
                        <p className="text-slate-500 mb-6">Enter PIN to access the admin panel.</p>
                        
                        <form onSubmit={handleAdminLogin} className="space-y-4">
                            <input 
                                type="password" 
                                className={`w-full text-center text-2xl tracking-widest p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none ${pinError ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}
                                placeholder="••••"
                                maxLength={4}
                                value={adminPin}
                                onChange={(e) => setAdminPin(e.target.value)}
                                autoFocus
                            />
                            {pinError && <p className="text-red-500 text-sm font-medium">Incorrect PIN</p>}
                            <button 
                                type="submit"
                                className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
                            >
                                Unlock
                            </button>
                        </form>
                        <button 
                            onClick={() => setCurrentMode(AppMode.PROFILE)}
                            className="mt-4 text-slate-400 text-sm hover:text-slate-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )
        }
        return <Admin onUpdate={refreshData} />;
      case AppMode.PROFILE:
        return (
            <div className="max-w-md mx-auto mt-10 space-y-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm border text-center">
                    <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 overflow-hidden relative">
                        <img src="https://picsum.photos/200/200" alt="Profile" className="w-full h-full object-cover"/>
                    </div>
                    <h2 className="text-xl font-bold">Dr. Student</h2>
                    <p className="text-slate-500">Medical Interpreter Trainee</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                    <div className="p-4 border-b bg-slate-50 font-medium text-slate-700">Statistics</div>
                    <div className="p-4 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Hard Terms Marked</span>
                            <span className="font-bold bg-orange-100 text-orange-700 px-3 py-1 rounded-full">{terms.filter(t => t.isHard).length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Total Terms Learned</span>
                            <span className="font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{terms.length}</span>
                        </div>
                    </div>
                </div>

                {/* Secret Admin Entry */}
                <div className="pt-8 flex justify-center">
                    <button 
                        onClick={() => setCurrentMode(AppMode.ADMIN)}
                        className="group flex items-center gap-2 text-slate-300 hover:text-slate-500 transition-colors text-sm px-4 py-2"
                    >
                        <ShieldCheck size={16} />
                        <span>Admin Portal</span>
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                </div>
            </div>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <Layout currentMode={currentMode} onNavigate={setCurrentMode}>
      {renderContent()}
    </Layout>
  );
};

export default App;