import React, { useState, useMemo } from 'react';
import { Plus, Check, Trash2, Edit2, Search, Save, X } from 'lucide-react';
import { DataService } from '../services/dataService';
import { MedicalTerm, Difficulty } from '../types';

interface AdminProps {
    onUpdate: () => void;
}

export const Admin: React.FC<AdminProps> = ({ onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'manage' | 'reports'>('editor');
  
  // Editor State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<MedicalTerm>>({
      difficulty: Difficulty.MEDIUM,
      category: 'General Clinical'
  });

  // Manage Tab State
  const [searchTerm, setSearchTerm] = useState('');
  
  const reports = DataService.getReports();
  const allTerms = DataService.getTerms();

  // Filter terms for the Manage View
  const filteredTerms = useMemo(() => {
      return allTerms.filter(t => 
        t.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [allTerms, searchTerm]);

  const handleSaveTerm = () => {
      if (!formData.english || !formData.cantonese) return alert("Required fields missing");
      
      const term: MedicalTerm = {
          id: editingId || Date.now().toString(),
          english: formData.english!,
          cantonese: formData.cantonese!,
          pronunciation: formData.pronunciation || '',
          category: formData.category || 'General',
          exampleEn: formData.exampleEn || '',
          exampleCan: formData.exampleCan || '',
          difficulty: formData.difficulty || Difficulty.MEDIUM,
          isHard: false
      };
      
      DataService.saveTerm(term);
      onUpdate();
      resetForm();
      alert(editingId ? "Term updated successfully!" : "Term added successfully!");
  };

  const handleEditClick = (term: MedicalTerm) => {
      setEditingId(term.id);
      setFormData(term);
      setActiveTab('editor');
  };

  const handleDeleteClick = (id: string) => {
      if (window.confirm("Are you sure you want to delete this term?")) {
          DataService.deleteTerm(id);
          onUpdate();
      }
  };

  const handleResolve = (id: string) => {
      DataService.resolveReport(id);
      onUpdate(); 
  };

  const resetForm = () => {
      setEditingId(null);
      setFormData({ difficulty: Difficulty.MEDIUM, category: 'General Clinical' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Tabs */}
        <div className="flex gap-1 md:gap-4 border-b overflow-x-auto">
            <button 
                onClick={() => setActiveTab('editor')}
                className={`pb-3 px-4 font-medium whitespace-nowrap transition-colors ${activeTab === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
                {editingId ? 'Edit Term' : 'Add Term'}
            </button>
            <button 
                onClick={() => { setActiveTab('manage'); resetForm(); }}
                className={`pb-3 px-4 font-medium whitespace-nowrap transition-colors ${activeTab === 'manage' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
                Manage Database
            </button>
            <button 
                onClick={() => { setActiveTab('reports'); resetForm(); }}
                className={`pb-3 px-4 font-medium whitespace-nowrap transition-colors ${activeTab === 'reports' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
                Reports ({reports.filter(r => r.status === 'Pending').length})
            </button>
        </div>

        {/* EDITOR TAB */}
        {activeTab === 'editor' && (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">{editingId ? 'Edit Existing Term' : 'Add New Term'}</h2>
                    {editingId && (
                        <button onClick={resetForm} className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1">
                            <X size={14} /> Cancel Edit
                        </button>
                    )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">English Term</label>
                        <input 
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.english || ''}
                            onChange={e => setFormData({...formData, english: e.target.value})}
                            placeholder="e.g. Hypertension"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Cantonese Translation</label>
                        <input 
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.cantonese || ''}
                            onChange={e => setFormData({...formData, cantonese: e.target.value})}
                            placeholder="e.g. 高血壓"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Pronunciation (Jyutping)</label>
                        <input 
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.pronunciation || ''}
                            onChange={e => setFormData({...formData, pronunciation: e.target.value})}
                            placeholder="e.g. gou1 hyut3 aat3"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                        <select 
                             className="w-full border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                             value={formData.category}
                             onChange={e => setFormData({...formData, category: e.target.value})}
                        >
                            <option>General Clinical</option>
                            <option>Symptoms</option>
                            <option>Body Parts</option>
                            <option>Vital Signs</option>
                            <option>Pain Scale</option>
                            <option>Directions & Instructions</option>
                            <option>Emergency & Trauma</option>
                            <option>Nursing / Home Care</option>
                            <option>Lab & Diagnostics</option>
                            <option>Medications</option>
                            <option>Chronic Diseases</option>
                            <option>Mental Health</option>
                            <option>Hospital Departments</option>
                            <option>Admin & Insurance</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Example Sentence (English)</label>
                        <input 
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.exampleEn || ''}
                            onChange={e => setFormData({...formData, exampleEn: e.target.value})}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Example Sentence (Cantonese)</label>
                        <input 
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.exampleCan || ''}
                            onChange={e => setFormData({...formData, exampleCan: e.target.value})}
                        />
                    </div>
                    
                    <div className="md:col-span-2 mt-4">
                        <button 
                            onClick={handleSaveTerm}
                            className={`w-full text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg
                                ${editingId ? 'bg-green-600 hover:bg-green-700 shadow-green-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'}
                            `}
                        >
                            {editingId ? <Save size={20} /> : <Plus size={20} />}
                            {editingId ? 'Update Term' : 'Save New Term'}
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* MANAGE DATABASE TAB */}
        {activeTab === 'manage' && (
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden animate-fade-in">
                <div className="p-4 border-b bg-slate-50 flex items-center gap-2">
                    <Search className="text-slate-400 w-5 h-5" />
                    <input 
                        className="bg-transparent border-none outline-none w-full text-sm font-medium"
                        placeholder="Search for medications, symptoms..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                </div>
                <div className="max-h-[600px] overflow-y-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b sticky top-0">
                            <tr>
                                <th className="px-6 py-3 font-semibold text-slate-600">English</th>
                                <th className="px-6 py-3 font-semibold text-slate-600">Category</th>
                                <th className="px-6 py-3 font-semibold text-slate-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filteredTerms.map(term => (
                                <tr key={term.id} className="hover:bg-slate-50 group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-800">{term.english}</div>
                                        <div className="text-slate-500 text-xs">{term.cantonese}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600">
                                            {term.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => handleEditClick(term)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteClick(term.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredTerms.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="p-8 text-center text-slate-500">
                                        No terms found matching "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* REPORTS TAB */}
        {activeTab === 'reports' && (
            <div className="space-y-4 animate-fade-in">
                {reports.length === 0 && (
                    <div className="bg-white p-10 rounded-2xl shadow-sm border text-center text-slate-500">
                        <Check className="w-12 h-12 mx-auto mb-4 text-green-300" />
                        No pending reports. Great job!
                    </div>
                )}
                {reports.map(report => (
                    <div key={report.id} className={`p-4 rounded-xl border ${report.status === 'Resolved' ? 'bg-slate-50 opacity-70' : 'bg-white shadow-sm'}`}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                    {report.termEnglish}
                                    <span className="text-xs font-normal text-slate-400">ID: {report.termId}</span>
                                </h4>
                                <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg mt-2 inline-block">
                                    <span className="font-bold text-red-800">User Report:</span> {report.reportText}
                                </div>
                                <p className="text-xs text-slate-400 mt-2">{new Date(report.timestamp).toLocaleDateString()}</p>
                            </div>
                            {report.status === 'Pending' && (
                                <button 
                                    onClick={() => handleResolve(report.id)}
                                    className="flex items-center gap-1 bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-200 transition-colors"
                                >
                                    <Check size={16} /> Mark Resolved
                                </button>
                            )}
                            {report.status === 'Resolved' && (
                                <span className="px-3 py-1 bg-slate-200 text-slate-500 rounded-full text-xs font-bold">Resolved</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};