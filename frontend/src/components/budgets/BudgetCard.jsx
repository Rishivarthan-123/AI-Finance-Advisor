import { MdEdit, MdDeleteOutline, MdWarningAmber } from 'react-icons/md';
import { formatCurrency } from '../../utils/formatters';

export default function BudgetCard({ budget, status, onEdit, onDelete }) {
  const utilization = status?.utilization ?? 0;
  const spent = status?.spent ?? 0;
  const remaining = status?.remaining ?? budget.budget_amount;

  const barColor =
    utilization >= 100 ? 'bg-rose-500' : utilization >= 80 ? 'bg-amber-500' : 'bg-primary-500';

  const isOverBudget = utilization >= 100;
  const isNearLimit = utilization >= 80 && utilization < 100;

  return (
    <div className="glass-card p-5 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold">{budget.category}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {budget.month}/{budget.year}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(budget)}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-500/10"
          >
            <MdEdit size={16} />
          </button>
          <button
            onClick={() => onDelete(budget)}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10"
          >
            <MdDeleteOutline size={16} />
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-slate-500 dark:text-slate-400">
            {formatCurrency(spent)} of {formatCurrency(budget.budget_amount)}
          </span>
          <span className="font-semibold">{utilization}%</span>
        </div>
        <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${barColor} transition-all duration-500 rounded-full`}
            style={{ width: `${Math.min(utilization, 100)}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400">
          Remaining: {formatCurrency(Math.max(remaining, 0))}
        </span>
        {(isOverBudget || isNearLimit) && (
          <span
            className={`flex items-center gap-1 font-medium ${
              isOverBudget ? 'text-rose-600' : 'text-amber-600'
            }`}
          >
            <MdWarningAmber size={14} />
            {isOverBudget ? 'Over budget' : 'Near limit'}
          </span>
        )}
      </div>
    </div>
  );
}