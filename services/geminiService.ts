import { GoogleGenAI, Modality, Type } from "@google/genai";
import { MedicalTerm, QuizQuestion } from "../types";

// Helper to decode base64 audio
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const generatePronunciation = async (term: MedicalTerm): Promise<void> => {
  if (!process.env.API_KEY) {
    console.error("API Key not found");
    alert("Please set your API Key to use AI features.");
    return;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const textToSay = `The Cantonese translation for ${term.english} is ${term.cantonese}. Example: ${term.exampleCan}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: textToSay }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (base64Audio) {
      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
      const outputNode = outputAudioContext.createGain();
      outputNode.connect(outputAudioContext.destination);
      
      const audioBytes = decode(base64Audio);
      const audioBuffer = await decodeAudioData(
        audioBytes,
        outputAudioContext,
        24000,
        1,
      );
      
      const source = outputAudioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(outputNode);
      source.start();
    }
  } catch (error) {
    console.error("TTS Error:", error);
    alert("Failed to generate audio. Please try again.");
  }
};

export const generateQuizQuestions = async (category: string, difficulty: string): Promise<QuizQuestion[]> => {
  if (!process.env.API_KEY) return [];

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Generate 3 multiple choice questions for a medical glossary quiz. 
  Focus on the category: "${category}" and difficulty level: "${difficulty}". 
  The questions should test knowledge of English to Cantonese medical interpretation.
  Return JSON only.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING }
            },
            required: ["id", "question", "options", "correctIndex", "explanation"]
          }
        }
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as QuizQuestion[];
    }
    return [];
  } catch (error) {
    console.error("Quiz Gen Error:", error);
    return [];
  }
};