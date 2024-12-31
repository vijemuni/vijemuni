import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { UrlInput } from './components/UrlInput';
import { AnalysisResult } from './components/AnalysisResult';
import { analyzeUrl } from './services/urlAnalyzer';
import { analyzeUrlWithGemini } from './services/gemini';
import type { UrlAnalysis } from './services/types';

export default function App() {
  const [analysis, setAnalysis] = useState<UrlAnalysis | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setAiAnalysis('');

    try {
      const [urlAnalysis, geminiAnalysis] = await Promise.all([
        analyzeUrl(url).catch(err => {
          throw new Error(`URL Analysis: ${err.message}`);
        }),
        analyzeUrlWithGemini(url).catch(err => {
          throw new Error(`AI Analysis: ${err.message}`);
        })
      ]);

      setAnalysis(urlAnalysis);
      setAiAnalysis(geminiAnalysis);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Analysis failed';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield size={40} className="text-blue-500" />
            <h1 className="text-4xl font-bold text-gray-900">Link Analyzer</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Analyze any URL to check its security, redirects, and get detailed insights powered by AI
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <UrlInput onAnalyze={handleAnalyze} isLoading={isLoading} />
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg max-w-2xl w-full">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="text-gray-600">Analyzing URL...</span>
            </div>
          )}

          {analysis && !isLoading && (
            <AnalysisResult analysis={analysis} aiAnalysis={aiAnalysis} />
          )}
        </div>
      </div>
    </div>
  );
}