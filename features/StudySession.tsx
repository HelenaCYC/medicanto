import React, { useState, useEffect } from 'react';
import { Volume2, RotateCw, Check, X, ArrowRight, Star } from 'lucide-react';
import { MedicalTerm } from '../types';
import { DataService } from '../services/dataService';
import { generatePronunciation } from '../services/geminiService';

interface StudySessionProps {
  terms: MedicalTerm[];
}

export const StudySession: React.FC<StudySessionProps> = ({ terms }) => {
  const [deck, setDeck] = useState<MedicalTerm[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Shuffle terms for the deck
    const shuffled = [...terms].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
  }, [terms]);

  const currentTerm = deck[currentIndex];

  const handleNext = (markHard: boolean) => {
    if (markHard && currentTerm) {
      DataService.toggleHard(currentTerm.id);
    }
    
    setIsFlipped(false);
    setTimeout(() => {
        if (currentIndex < deck.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setIsFinished(true);
        }
    }, 200);
  };

  const handleRestart = () => {
      const shuffled = [...terms].sort(() => Math.random() - 0.5);
      setDeck(shuffled);
      setCurrentIndex(0);
      setIsFinished(false);
      setIsFlipped(false);
  };

  if (deck.length === 0) return <div>Loading...</div>;

  if (isFinished) {
      return (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <Check size={48} />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Session Complete!</h2>
              <p className="text-slate-600 mb-8">You've reviewed {deck.length} terms.</p>
              <button 
                onClick={handleRestart}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
              >
                  Start New Session
              </button>
          </div>
      )
  }

  return (
    <div className="max-w-xl mx-auto flex flex-col h-[calc(100vh-140px)] justify-center">
        <div className="flex justify-between items-center mb-6 px-2">
            <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                Card {currentIndex + 1} / {deck.length}
            </span>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase">
                {currentTerm.category}
            </span>
        </div>

        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] mb-8 group cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
             <div className={`card-flip w-full h-full duration-500 ${isFlipped ? 'flipped' : ''}`}>
                 <div className="card-inner w-full h-full shadow-xl rounded-2xl">
                     {/* Front */}
                     <div className="card-front bg-white rounded-2xl border flex flex-col items-center justify-center p-8 absolute backface-hidden">
                        <h3 className="text-4xl font-bold text-slate-800 text-center leading-tight mb-4">
                            {currentTerm.english}
                        </h3>
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mt-4">Tap to reveal</p>
                     </div>

                     {/* Back */}
                     <div className="card-back bg-slate-900 text-white rounded-2xl flex flex-col items-center justify-center p-8 absolute backface-hidden [transform:rotateY(180deg)]">
                        <h3 className="text-4xl font-bold text-white mb-2">{currentTerm.cantonese}</h3>
                        <p className="text-blue-300 text-xl italic mb-6">{currentTerm.pronunciation}</p>
                        
                        <div className="w-full bg-slate-800 p-4 rounded-lg mb-6 text-left">
                            <p className="text-slate-400 text-xs uppercase mb-1">Example</p>
                            <p className="text-white text-sm mb-1">{currentTerm.exampleCan}</p>
                            <p className="text-slate-400 text-xs">{currentTerm.exampleEn}</p>
                        </div>

                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                generatePronunciation(currentTerm);
                            }}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                        >
                            <Volume2 size={16} />
                            Play Audio
                        </button>
                     </div>
                 </div>
             </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <button 
                onClick={() => handleNext(true)}
                className="flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-orange-100 bg-orange-50 text-orange-600 font-semibold hover:bg-orange-100 transition-colors"
            >
                <Star size={20} />
                Mark Hard
            </button>
            <button 
                onClick={() => handleNext(false)}
                className="flex items-center justify-center gap-2 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-colors"
            >
                Next Card
                <ArrowRight size={20} />
            </button>
        </div>
    </div>
  );
};