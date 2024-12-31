import React from 'react';
import type { UrlAnalysis } from '../services/types';

interface TechnicalDetailsProps {
  analysis: UrlAnalysis;
}

export function TechnicalDetails({ analysis }: TechnicalDetailsProps) {
  const details = [
    { label: 'Domain', value: analysis.domain },
    { label: 'Path', value: analysis.path || '/' },
    { label: 'Protocol', value: analysis.protocol },
    { label: 'Status', value: analysis.status }
  ];

  return (
    <div className="border-t pt-6 animate-slide-up" style={{ '--delay': '400ms' } as React.CSSProperties}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {details.map((detail, index) => (
          <div 
            key={index} 
            className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:shadow-md hover:bg-gray-100"
          >
            <span className="text-sm font-medium text-gray-500">{detail.label}</span>
            <p className="text-gray-900 mt-1">{detail.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}