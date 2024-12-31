import { GoogleGenerativeAI } from '@google/generative-ai';
import { isValidUrl, normalizeUrl } from './urlValidator';

const genAI = new GoogleGenerativeAI("AIzaSyCGSJu63nwwqzoT4WzBnNu-SqpUFf3kP0k");

const createAnalysisPrompt = (url: string) => `
Analyze this URL: ${url}

Provide a detailed security analysis with the following sections:

SECURITY ASSESSMENT
[Provide a clear verdict if the URL is safe or potentially harmful]

PURPOSE & LEGITIMACY
[Explain the website's purpose and intended use]

SECURITY CONCERNS
[List any identified security risks or concerns]

RECOMMENDED PRECAUTIONS
[List specific actions users should take]

Important: Format the response without using asterisks or markdown. Use clear section headings and proper spacing between paragraphs.
`.trim();

export async function analyzeUrlWithGemini(inputUrl: string): Promise<string> {
  if (!inputUrl?.trim()) {
    throw new Error('Please enter a URL for AI analysis.');
  }

  if (!isValidUrl(inputUrl)) {
    throw new Error('Please enter a valid URL for AI analysis.');
  }

  try {
    const url = normalizeUrl(inputUrl);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(createAnalysisPrompt(url));
    const response = await result.response;
    
    // Format the response with proper spacing and styling
    return response.text()
      .replace(/\*\*/g, '') // Remove any asterisks
      .replace(/\*/g, '')   // Remove single asterisks
      .split('\n')          // Split into lines
      .map(line => line.trim()) // Trim each line
      .filter(line => line)     // Remove empty lines
      .join('\n\n');           // Join with double newlines for better spacing
  } catch (error) {
    const message = error instanceof Error ? error.message : 'AI analysis failed';
    throw new Error(`AI Analysis Error: ${message}`);
  }
}