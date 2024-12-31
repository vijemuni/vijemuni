import React from 'react';
import { Shield } from 'lucide-react';

interface AiAnalysisCardProps {
  aiAnalysis: string;
}

export function AiAnalysisCard({ aiAnalysis }: AiAnalysisCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.01] duration-300 animate-slide-up" style={{ '--delay': '600ms' } as React.CSSProperties}>
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Shield className="text-white animate-pulse" />
          AI Security Analysis
        </h2>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          {aiAnalysis.split('\n\n').map((section, index) => {
            if (section.includes(':')) {
              const [title, ...content] = section.split(':');
              return (
                <div 
                  key={index} 
                  className="bg-gray-50 rounded-lg p-4 transition-all duration-300 hover:shadow-md hover:bg-gray-100"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {title.trim()}
                  </h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {content.join(':').trim()}
                    </p>
                  </div>
                </div>
              );
            }
            return (
              <div key={index} className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">{section}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}