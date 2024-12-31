export interface UrlAnalysis {
  originalUrl: string;
  finalUrl: string;
  redirectCount: number;
  isSecure: boolean;
  protocol: string;
  domain: string;
  path: string;
  queryParams: Record<string, string>;
  status: number;
}

export interface UrlComponents {
  protocol: string;
  domain: string;
  path: string;
  queryParams: Record<string, string>;
}