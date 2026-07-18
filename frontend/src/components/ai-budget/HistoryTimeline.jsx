import { useState } from 'react';
import { MdKeyboardArrowDown, MdSchedule } from 'react-icons/md';
import { formatCurrency } from '../../utils/formatters';

export default function HistoryTimeline({ history }) {
  const [openId, setOpenId] = useState(null);

  if (!history || history.length === 0) {
    return (
      <div className="glass-card p-8 text-center text-sm text-slate-400">
        No past AI budget plans yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {history.map((plan) => {
        const isOpen = openId === plan.id;
        return (
          <div key={plan.id} className="glass-card overflow-hidden">
            <button
              onClick={() => setOpenId(isOpen ? null : plan.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary-50 dark:bg-primary-500/10 text-primary-600 flex items-center justify-center shrink-0">
                  <MdSchedule size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Budget: {formatCurrency(plan.recommended_budget)} · Savings:{' '}
                    {formatCurrency(plan.recommended_savings)}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{plan.created_at}</p>
                </div>
              </div>
              <MdKeyboardArrowDown
                size={20}
                className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-0 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                {plan.ai_explanation}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}