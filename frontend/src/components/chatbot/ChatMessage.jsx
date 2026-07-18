import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { MdPerson, MdAutoAwesome } from 'react-icons/md';

export default function ChatMessage({ role, content }) {
  const isUser = role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
          isUser
            ? 'bg-primary-600 text-white'
            : 'bg-gradient-to-br from-primary-500 to-primary-700 text-white'
        }`}
      >
        {isUser ? <MdPerson size={16} /> : <MdAutoAwesome size={16} />}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
          isUser
            ? 'bg-primary-600 text-white rounded-tr-sm'
            : 'bg-slate-100 dark:bg-slate-800 rounded-tl-sm'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1.5 prose-p:text-inherit">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
}