import { UrlAnalysis } from './types';
import { isValidUrl, normalizeUrl } from './urlValidator';
import { parseUrl } from './urlParser';

export async function analyzeUrl(inputUrl: string): Promise<UrlAnalysis> {
  if (!inputUrl?.trim()) {
    throw new Error('Please enter a URL to analyze.');
  }

  if (!isValidUrl(inputUrl)) {
    throw new Error('Please enter a valid URL (e.g., example.com or https://example.com).');
  }

  try {
    const url = normalizeUrl(inputUrl);
    const components = parseUrl(url);

    return {
      originalUrl: inputUrl,
      finalUrl: url,
      redirectCount: 0,
      isSecure: components.protocol === 'https:',
      ...components,
      status: 200,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to analyze URL';
    throw new Error(`URL Analysis Error: ${message}`);
  }
}