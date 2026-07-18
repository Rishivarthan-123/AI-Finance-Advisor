import { MdOutlineEventNote } from 'react-icons/md';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function UpcomingBills({ bills }) {
  if (!bills || bills.length === 0) {
    return <div className="py-10 text-center text-sm text-slate-400">No upcoming bills.</div>;
  }

  return (
    <div className="space-y-2">
      {bills.map((bill, i) => (
        <div
          key={i}
          className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-500/10 flex items-center justify-center shrink-0">
              <MdOutlineEventNote size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{bill.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Due {formatDate(bill.due_date)}
              </p>
            </div>
          </div>
          <p className="text-sm font-semibold shrink-0">{formatCurrency(bill.amount)}</p>
        </div>
      ))}
    </div>
  );
}