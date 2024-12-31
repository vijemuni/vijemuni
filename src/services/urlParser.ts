import { UrlComponents } from './types';

export function parseUrl(url: string): UrlComponents {
  const parsedUrl = new URL(url);
  const queryParams: Record<string, string> = {};
  
  parsedUrl.searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  return {
    protocol: parsedUrl.protocol,
    domain: parsedUrl.hostname,
    path: parsedUrl.pathname,
    queryParams,
  };
}