import React, { useState, useEffect } from 'react';
import { generateQuizQuestions } from '../services/geminiService';
import { QuizQuestion } from '../types';
import { Sparkles, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { AdBanner } from '../components/AdBanner';

export const Quiz = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  const [config, setConfig] = useState({
      category: 'Nursing',
      difficulty: 'Medium'
  });

  const startQuiz = async () => {
    setLoading(true);
    const qs = await generateQuizQuestions(config.category, config.difficulty);
    setQuestions(qs);
    setLoading(false);
    setStarted(true);
    setCurrentQIndex(0);
    setScore(0);
    setShowResult(false);
  };

  const handleAnswer = (index: number) => {
      setSelectedOption(index);
      setShowResult(true);
      if (index === questions[currentQIndex].correctIndex) {
          setScore(s => s + 1);
      }
  };

  const nextQuestion = () => {
      setSelectedOption(null);
      setShowResult(false);
      setCurrentQIndex(prev => prev + 1);
  };

  if (!started) {
      return (
          <div className="max-w-md mx-auto mt-10">
              <div className="bg-white p-8 rounded-2xl shadow-sm border text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Sparkles size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">AI Quiz Generator</h2>
                  <p className="text-slate-500 mb-8">Customize your quiz session to practice specific scenarios.</p>

                  <div className="space-y-4 text-left mb-8">
                      <div>
                          <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Category</label>
                          <select 
                            className="w-full border rounded-lg p-3 bg-slate-50"
                            value={config.category}
                            onChange={(e) => setConfig({...config, category: e.target.value})}
                          >
                              <option>Nursing</option>
                              <option>Emergency</option>
                              <option>Cardiology</option>
                              <option>General</option>
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Difficulty</label>
                          <select 
                             className="w-full border rounded-lg p-3 bg-slate-50"
                             value={config.difficulty}
                             onChange={(e) => setConfig({...config, difficulty: e.target.value})}
                          >
                              <option>Easy</option>
                              <option>Medium</option>
                              <option>Hard</option>
                          </select>
                      </div>
                  </div>

                  <button 
                    onClick={startQuiz}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all"
                  >
                      {loading ? 'Generating Questions...' : 'Start Quiz'}
                  </button>
              </div>
          </div>
      );
  }

  if (questions.length === 0) {
      return (
          <div className="text-center mt-20">
              <AlertTriangle className="mx-auto w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-lg font-bold">Generation Failed</h3>
              <p className="text-slate-500 mb-4">Could not generate questions. Check API Key.</p>
              <button onClick={() => setStarted(false)} className="text-blue-600 font-medium">Try Again</button>
          </div>
      )
  }

  if (currentQIndex >= questions.length) {
      return (
          <div className="max-w-md mx-auto mt-10 text-center">
               <div className="bg-white p-8 rounded-2xl shadow-sm border mb-6">
                   <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
                   <div className="text-6xl font-black text-blue-600 mb-2">{Math.round((score / questions.length) * 100)}%</div>
                   <p className="text-slate-500 mb-8">You got {score} out of {questions.length} correct.</p>
                   <button onClick={() => setStarted(false)} className="w-full bg-slate-900 text-white py-3 rounded-xl">Back to Menu</button>
               </div>
               
               <AdBanner slotId="5555555555" className="h-64 w-full" />
          </div>
      )
  }

  const currentQ = questions[currentQIndex];

  return (
    <div className="max-w-2xl mx-auto mt-8">
        <div className="mb-6 flex justify-between items-center">
            <span className="text-slate-500 font-medium">Question {currentQIndex + 1} of {questions.length}</span>
            <span className="text-blue-600 font-bold">Score: {score}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">{currentQ.question}</h3>

            <div className="space-y-3">
                {currentQ.options.map((opt, idx) => {
                    let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all ";
                    if (showResult) {
                        if (idx === currentQ.correctIndex) btnClass += "border-green-500 bg-green-50 text-green-700";
                        else if (idx === selectedOption) btnClass += "border-red-500 bg-red-50 text-red-700";
                        else btnClass += "border-slate-100 opacity-50";
                    } else {
                        btnClass += "border-slate-100 hover:border-blue-200 hover:bg-slate-50";
                    }

                    return (
                        <button 
                            key={idx}
                            disabled={showResult}
                            onClick={() => handleAnswer(idx)}
                            className={btnClass}
                        >
                            <div className="flex items-center justify-between">
                                <span>{opt}</span>
                                {showResult && idx === currentQ.correctIndex && <CheckCircle size={20} className="text-green-600"/>}
                                {showResult && idx === selectedOption && idx !== currentQ.correctIndex && <XCircle size={20} className="text-red-600"/>}
                            </div>
                        </button>
                    )
                })}
            </div>

            {showResult && (
                <div className="mt-6 pt-6 border-t animate-fade-in">
                    <p className="text-slate-700 bg-blue-50 p-4 rounded-lg text-sm">
                        <span className="font-bold text-blue-700 block mb-1">Explanation:</span>
                        {currentQ.explanation}
                    </p>
                    <div className="mt-6 flex justify-end">
                        <button 
                            onClick={nextQuestion}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
                        >
                            {currentQIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};