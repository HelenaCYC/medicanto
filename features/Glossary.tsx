import React, { useState, useMemo } from 'react';
import { Search, Volume2, AlertCircle, CheckCircle } from 'lucide-react';
import { MedicalTerm, Difficulty, ReportedError } from '../types';
import { DataService } from '../services/dataService';
import { generatePronunciation } from '../services/geminiService';
import { AdBanner } from '../components/AdBanner';

interface GlossaryProps {
  terms: MedicalTerm[];
  onUpdate: () => void;
}

export const Glossary: React.FC<GlossaryProps> = ({ terms, onUpdate }) => {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [reportingTerm, setReportingTerm] = useState<string | null>(null);
  const [reportText, setReportText] = useState('');
  
  const categories = ['All', ...Array.from(new Set(terms.map(t => t.category)))];

  const filteredTerms = useMemo(() => {
    return terms.filter(t => {
      const matchesSearch = 
        t.english.toLowerCase().includes(search.toLowerCase()) || 
        t.cantonese.includes(search) ||
        t.category.toLowerCase().includes(search.toLowerCase());
      const matchesCat = filterCat === 'All' || t.category === filterCat;
      return matchesSearch && matchesCat;
    });
  }, [terms, search, filterCat]);

  const handleReport = (termId: string) => {
    if (!reportText.trim()) return;
    const term = terms.find(t => t.id === termId);
    if (!term) return;

    const report: ReportedError = {
        id: Date.now().toString(),
        termId: term.id,
        termEnglish: term.english,
        reportText: reportText,
        timestamp: Date.now(),
        status: 'Pending'
    };
    DataService.reportError(report);
    setReportingTerm(null);
    setReportText('');
    alert("Thank you! Report submitted to admin.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Medical Glossary</h2>
          <p className="text-slate-500">Database of {terms.length} terms</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search terms..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
            />
          </div>
          <select 
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">English</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Cantonese</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Pronunciation</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Category</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredTerms.map((term) => (
                <tr key={term.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{term.english}</td>
                  <td className="px-6 py-4 text-slate-700 font-medium">{term.cantonese}</td>
                  <td className="px-6 py-4 text-slate-500 italic">{term.pronunciation}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      {term.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => generatePronunciation(term)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="Play Pronunciation"
                      >
                        <Volume2 size={16} />
                      </button>
                      
                      <div className="relative">
                        <button 
                          onClick={() => setReportingTerm(reportingTerm === term.id ? null : term.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Report Issue"
                        >
                          <AlertCircle size={16} />
                        </button>
                        
                        {/* Report Popover */}
                        {reportingTerm === term.id && (
                          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border p-4 z-10">
                            <h4 className="text-xs font-semibold uppercase text-slate-500 mb-2">Report Error</h4>
                            <textarea
                              className="w-full text-sm border rounded p-2 mb-2 h-20 outline-none focus:border-blue-500"
                              placeholder="What is incorrect?"
                              value={reportText}
                              onChange={(e) => setReportText(e.target.value)}
                            />
                            <div className="flex justify-end gap-2">
                                <button 
                                    onClick={() => setReportingTerm(null)}
                                    className="text-xs text-slate-500 hover:text-slate-800"
                                >Cancel</button>
                                <button 
                                    onClick={() => handleReport(term.id)}
                                    className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                >Submit</button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredTerms.length === 0 && (
            <div className="p-8 text-center text-slate-500">
                No terms found matching your search.
            </div>
        )}
      </div>

      <div className="mt-8">
        <AdBanner slotId="9876543210" className="h-24 w-full" />
      </div>
    </div>
  );
};