import { motion } from 'framer-motion';
import { MdInsights } from 'react-icons/md';

const healthTone = {
  Excellent: { text: 'text-emerald-600', ring: '#10b981' },
  Good: { text: 'text-primary-600', ring: '#6366f1' },
  Average: { text: 'text-amber-600', ring: '#f59e0b' },
  Poor: { text: 'text-rose-600', ring: '#f43f5e' },
};

export default function PredictionResultCard({ prediction }) {
  const tone = healthTone[prediction.financial_health] || healthTone.Average;
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (prediction.financial_score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 flex flex-col sm:flex-row items-center gap-6"
    >
      <div className="relative h-28 w-28 shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" strokeWidth="8" className="stroke-slate-100 dark:stroke-slate-800" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            strokeWidth="8"
            stroke={tone.ring}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{prediction.financial_score}</span>
          <span className="text-[10px] text-slate-400">/ 100</span>
        </div>
      </div>

      <div className="flex-1 text-center sm:text-left">
        <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
          <MdInsights className={tone.text} size={20} />
          <span className={`font-bold text-lg ${tone.text}`}>{prediction.financial_health}</span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Confidence: {prediction.confidence}%
        </p>
      </div>
    </motion.div>
  );
}