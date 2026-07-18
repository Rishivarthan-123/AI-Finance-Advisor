import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function RecentTransactions({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-slate-400">No transactions yet.</div>
    );
  }

  return (
    <div className="space-y-2">
      {transactions.map((tx) => {
        const isIncome = tx.type === 'Income';
        return (
          <div
            key={tx.id}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${
                  isIncome
                    ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10'
                    : 'bg-rose-100 text-rose-600 dark:bg-rose-500/10'
                }`}
              >
                {isIncome ? <MdArrowDownward size={16} /> : <MdArrowUpward size={16} />}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{tx.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {tx.category} · {formatDate(tx.transaction_date)}
                </p>
              </div>
            </div>
            <p
              className={`text-sm font-semibold shrink-0 ${
                isIncome ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {isIncome ? '+' : '-'}
              {formatCurrency(tx.amount)}
            </p>
          </div>
        );
      })}
    </div>
  );
}