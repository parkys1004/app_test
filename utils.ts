
import { GoogleGenAI } from "@google/genai";

// --- Encryption Helper (Simple Base64 for Local Storage Obfuscation as requested) ---
export const encryptKey = (key: string) => btoa(key);
export const decryptKey = (encoded: string) => atob(encoded);

// --- Configuration ---
export const getGenAI = () => {
  const savedKey = localStorage.getItem('suno_pro_api_key');
  const apiKey = savedKey ? decryptKey(savedKey) : process.env.API_KEY;
  return new GoogleGenAI({ apiKey: apiKey as string });
};

// Helper to map UI ratio to API supported ratio
export const getApiAspectRatio = (ratio: string) => {
    const validRatios = ['1:1', '3:4', '4:3', '9:16', '16:9'];
    if (validRatios.includes(ratio)) return ratio;
    // Fallback mapping
    if (ratio === '4:5') return '3:4'; // Closest vertical
    if (ratio === '1.91:1') return '16:9'; // Closest landscape
    if (ratio === '21:9') return '16:9'; // Closest landscape
    if (ratio === '1:2') return '9:16'; // Closest vertical
    return '1:1';
};
