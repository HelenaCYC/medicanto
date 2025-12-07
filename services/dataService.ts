import { MedicalTerm, ReportedError } from "../types";
import { SEED_TERMS } from "../constants";

// Changed key to v2 to ensure users get the new dataset without manual clearing
const TERMS_KEY = 'medicanto_terms_v2';
const REPORTS_KEY = 'medicanto_reports_v2';

export const DataService = {
  getTerms: (): MedicalTerm[] => {
    const stored = localStorage.getItem(TERMS_KEY);
    if (!stored) {
      localStorage.setItem(TERMS_KEY, JSON.stringify(SEED_TERMS));
      return SEED_TERMS;
    }
    return JSON.parse(stored);
  },

  saveTerm: (term: MedicalTerm): void => {
    const terms = DataService.getTerms();
    const existingIndex = terms.findIndex(t => t.id === term.id);
    
    if (existingIndex >= 0) {
      terms[existingIndex] = term;
    } else {
      terms.push(term);
    }
    localStorage.setItem(TERMS_KEY, JSON.stringify(terms));
  },

  deleteTerm: (id: string): void => {
    const terms = DataService.getTerms();
    const filteredTerms = terms.filter(t => t.id !== id);
    localStorage.setItem(TERMS_KEY, JSON.stringify(filteredTerms));
  },

  toggleHard: (id: string): void => {
    const terms = DataService.getTerms();
    const term = terms.find(t => t.id === id);
    if (term) {
      term.isHard = !term.isHard;
      DataService.saveTerm(term);
    }
  },

  reportError: (report: ReportedError): void => {
    const reports = JSON.parse(localStorage.getItem(REPORTS_KEY) || '[]');
    reports.push(report);
    localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  },

  getReports: (): ReportedError[] => {
    return JSON.parse(localStorage.getItem(REPORTS_KEY) || '[]');
  },
  
  resolveReport: (id: string) => {
      const reports = DataService.getReports();
      const updated = reports.map(r => r.id === id ? { ...r, status: 'Resolved' } : r);
      localStorage.setItem(REPORTS_KEY, JSON.stringify(updated));
  }
};