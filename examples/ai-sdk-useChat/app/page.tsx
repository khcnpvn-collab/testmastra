'use client';

import { FormEvent, useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';

const roleLabel: Record<string, string> = {
  user: 'Bạn',
  assistant: 'Gemini',
};

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
  });

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim() || isLoading) return;
    handleSubmit(event);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-neutral-900 px-4 py-10 text-neutral-50">
      <div className="flex w-full max-w-2xl flex-1 flex-col gap-4 rounded-3xl border border-white/10 bg-neutral-900/70 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur">
        <header className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">Gemini</p>
          <h1 className="mt-1 text-3xl font-semibold">Simple Chatbot</h1>
          <p className="mt-1 text-sm text-neutral-400">Hỏi gì cũng được – Gemini sẽ trả lời bằng tiếng Việt hoặc tiếng Anh.</p>
        </header>

        <div
          ref={scrollAreaRef}
          className="flex-1 space-y-4 overflow-y-auto rounded-2xl border border-white/5 bg-neutral-950/30 p-4"
        >
          {messages.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-sm text-neutral-400">
              💬 Xin chào! Hãy gõ câu hỏi của bạn ở bên dưới để bắt đầu trò chuyện với Gemini.
            </div>
          )}

          {messages.map(message => {
            const isUser = message.role === 'user';
            return (
              <div key={message.id} className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  {roleLabel[message.role] ?? message.role}
                </span>
                <div
                  className={`whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${
                    isUser
                      ? 'ml-auto bg-emerald-500/80 text-neutral-950'
                      : 'mr-auto border border-white/5 bg-white/5 text-neutral-100'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="text-xs font-medium uppercase tracking-[0.35em] text-neutral-500">Gemini đang suy nghĩ…</div>
          )}
        </div>

        {error && (
          <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error.message || 'Đã xảy ra lỗi, hãy thử lại nhé.'}
          </p>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <label htmlFor="chat-input" className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
            Tin nhắn của bạn
          </label>
          <textarea
            id="chat-input"
            rows={2}
            className="w-full resize-none rounded-2xl border border-white/10 bg-neutral-900/80 px-4 py-3 text-sm text-neutral-100 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/30"
            value={input}
            placeholder="Ví dụ: Giải thích lý thuyết lượng tử bằng ngôn ngữ dễ hiểu…"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-2xl bg-emerald-400/80 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Đang gửi…' : 'Gửi cho Gemini'}
          </button>
        </form>
      </div>
    </main>
  );
}
