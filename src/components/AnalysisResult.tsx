import React from 'react';
import { Shield, AlertTriangle, Link, Server, Globe } from 'lucide-react';
import type { UrlAnalysis } from '../services/types';
import { StatusCard } from './StatusCard';
import { TechnicalDetails } from './TechnicalDetails';
import { AiAnalysisCard } from './AiAnalysisCard';

interface AnalysisResultProps {
  analysis: UrlAnalysis;
  aiAnalysis: string;
}

export function AnalysisResult({ analysis, aiAnalysis }: AnalysisResultProps) {
  return (
    <div className="w-full max-w-3xl space-y-8 animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.01] duration-300">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Globe className="text-white animate-spin-slow" />
            URL Analysis Results
          </h2>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-4 animate-slide-up">
            <StatusCard 
              icon={Link} 
              title="Original URL" 
              value={analysis.originalUrl} 
            />
            <StatusCard 
              icon={Server} 
              title="Final URL" 
              value={analysis.finalUrl} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-up" style={{ '--delay': '200ms' } as React.CSSProperties}>
            <StatusCard
              type={analysis.isSecure ? 'success' : 'error'}
              icon={Shield}
              title="Security Status"
              value={analysis.isSecure ? "Secure (HTTPS)" : "Not Secure (HTTP)"}
            />
            
            {analysis.redirectCount > 0 && (
              <StatusCard
                type="warning"
                icon={AlertTriangle}
                title="Redirects Detected"
                value={`${analysis.redirectCount} redirect${analysis.redirectCount > 1 ? 's' : ''} found`}
              />
            )}
          </div>

          <TechnicalDetails analysis={analysis} />
        </div>
      </div>

      {aiAnalysis && <AiAnalysisCard aiAnalysis={aiAnalysis} />}
    </div>
  );
}