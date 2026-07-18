import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { MdSend, MdAutoAwesome } from 'react-icons/md';
import { sendChatMessage } from '../../services/chatService';
import ChatMessage from '../../components/chatbot/ChatMessage';
import TypingIndicator from '../../components/chatbot/TypingIndicator';

const SUGGESTED_QUESTIONS = [
  'How can I save more money each month?',
  'Am I spending too much on food?',
  'Should I invest in mutual funds or stocks?',
  'How much emergency fund do I need?',
];

export default function AIChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  const handleSend = async (text) => {
    const message = (text ?? input).trim();
    if (!message || sending) return;

    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    setInput('');
    setSending(true);

    try {
      const reply = await sendChatMessage(message);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      toast.error('Failed to get a response');
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Sorry, I couldn't process that. Please try again." },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] animate-fadeIn">
      <div className="mb-4">
        <h1 className="text-xl font-bold">AI Finance Chatbot</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Ask anything about your finances, budgets, or investments
        </p>
      </div>

      <div className="glass-card flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white mb-4">
                <MdAutoAwesome size={26} />
              </div>
              <p className="font-semibold mb-1">Ask your AI finance assistant</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                Get personalized advice based on your real spending and goals
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-left text-xs px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <ChatMessage key={i} role={m.role} content={m.content} />
          ))}
          {sending && <TypingIndicator />}
          <div ref={scrollRef} />
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 p-4 flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your finances..."
            rows={1}
            className="input-field resize-none flex-1"
          />
          <button
            onClick={() => handleSend()}
            disabled={sending || !input.trim()}
            className="btn-primary h-11 w-11 !p-0 flex items-center justify-center shrink-0"
          >
            <MdSend size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}