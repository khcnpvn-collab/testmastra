import { google } from '@ai-sdk/google';
import { Agent } from '@mastra/core/agent';

const geminiModel = google('gemini-2.0-flash-001', {
  apiKey: process.env.GOOGLE_API_KEY,
});

export const geminiChatAgent = new Agent({
  id: 'gemini-chat-agent',
  name: 'Gemini Chatbot',
  instructions: `
    You are a concise, friendly chatbot that helps users brainstorm ideas, explain concepts, and answer questions in Vietnamese or English.

    - Prefer short paragraphs or bullet points so the UI stays tidy.
    - Use Markdown for emphasis and code where it helps readability.
    - If you are unsure, say so and offer next steps instead of making up facts.
    - Keep the tone warm and encouraging.
  `,
  model: geminiModel,
});
