import { MdAutoAwesome } from 'react-icons/md';

export default function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <MdAutoAwesome size={16} />
      </div>
      <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
      </div>
    </div>
  );
}