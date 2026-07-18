import { MdEdit, MdDeleteOutline, MdCheckCircleOutline, MdOutlineEventNote } from 'react-icons/md';
import { formatCurrency, formatDate } from '../../utils/formatters';

const statusTone = {
  Pending: 'text-primary-600 bg-primary-50 dark:bg-primary-500/10',
  Paid: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10',
  Overdue: 'text-rose-600 bg-rose-50 dark:bg-rose-500/10',
};

export default function ReminderCard({ reminder, onEdit, onDelete, onMarkPaid }) {
  return (
    <div className="glass-card p-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 flex items-center justify-center shrink-0">
          <MdOutlineEventNote size={18} />
        </div>
        <div className="min-w-0">
          <p className="font-medium truncate">{reminder.title}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {reminder.category} · Due {formatDate(reminder.due_date)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusTone[reminder.status] || statusTone.Pending}`}>
          {reminder.status}
        </span>
        <span className="font-semibold text-sm hidden sm:inline">{formatCurrency(reminder.amount)}</span>
        {reminder.status !== 'Paid' && (
          <button
            onClick={() => onMarkPaid(reminder)}
            title="Mark as paid"
            className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
          >
            <MdCheckCircleOutline size={18} />
          </button>
        )}
        <button
          onClick={() => onEdit(reminder)}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-500/10"
        >
          <MdEdit size={16} />
        </button>
        <button
          onClick={() => onDelete(reminder)}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10"
        >
          <MdDeleteOutline size={16} />
        </button>
      </div>
    </div>
  );
}