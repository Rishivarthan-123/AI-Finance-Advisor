import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { formatDate } from '../../utils/formatters';

const healthTone = {
  Excellent: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10',
  Good: 'text-primary-600 bg-primary-50 dark:bg-primary-500/10',
  Average: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10',
  Poor: 'text-rose-600 bg-rose-50 dark:bg-rose-500/10',
};

export default function PredictionHistoryList({ history }) {
  const [openId, setOpenId] = useState(null);

  if (!history || history.length === 0) {
    return <div className="glass-card p-8 text-center text-sm text-slate-400">No predictions yet.</div>;
  }

  return (
    <div className="space-y-3">
      {history.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="glass-card overflow-hidden">
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    healthTone[item.financial_health] || healthTone.Average
                  }`}
                >
                  {item.financial_health}
                </span>
                <span className="text-sm font-medium">Score: {item.financial_score}/100</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
                  {formatDate(item.prediction_date)}
                </span>
              </div>
              <MdKeyboardArrowDown
                size={20}
                className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 border-t border-slate-100 dark:border-slate-800 pt-3 text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                {item.gemini_summary}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}