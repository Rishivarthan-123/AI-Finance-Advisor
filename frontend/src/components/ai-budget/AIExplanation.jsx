import ReactMarkdown from 'react-markdown';
import { MdAutoAwesome } from 'react-icons/md';

export default function AIExplanation({ text }) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <MdAutoAwesome className="text-primary-600" size={20} />
        <h2 className="font-semibold">AI Financial Report</h2>
      </div>
      <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:mt-4 prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-li:text-slate-600 dark:prose-li:text-slate-300">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
}