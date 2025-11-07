## Gemini Chatbot UI

This example shows how to build a lightweight chatbot interface with [Next.js](https://nextjs.org), [`@ai-sdk/react`](https://github.com/vercel/ai), and a Mastra agent that talks to Google Gemini.

You get a single-page interface with streaming replies, Markdown-friendly rendering, and bilingual (VN/EN) instructions so Gemini can answer however your users prefer.

## Quick start

1. Install dependencies from the repo root (needed once):

   ```bash
   pnpm install
   ```

2. Inside this example (`examples/ai-sdk-useChat`), create `.env.local` and add your Gemini key:

   ```bash
   GOOGLE_API_KEY=your_google_ai_studio_key
   ```

   Get an API key from [ai.google.dev](https://ai.google.dev/gemini-api/docs/api-key).

3. Run the dev server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) and start chatting.

## How it works

- `app/page.tsx` renders a simple UI powered by `useChat` from `@ai-sdk/react`.
- `app/api/chat/route.ts` forwards messages to `geminiChatAgent`.
- `src/mastra/agents/index.ts` defines that agent with the `google('gemini-2.0-flash-001')` model, so you can customize tone or tools in one place.

Feel free to tweak the styling, change the prompt, or swap in another Gemini model variant depending on latency/cost requirements.
