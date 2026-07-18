import { MdAccountBalanceWallet, MdTrendingDown, MdSavings, MdInsights } from 'react-icons/md';
import { formatCurrency } from '../../utils/formatters';

const healthTone = {
  Excellent: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10',
  Good: 'text-primary-600 bg-primary-50 dark:bg-primary-500/10',
  Average: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10',
  Poor: 'text-rose-600 bg-rose-50 dark:bg-rose-500/10',
};

export default function BudgetSnapshotGrid({ snapshot }) {
  const items = [
    { label: 'Monthly Income', value: formatCurrency(snapshot.monthly_income), icon: MdAccountBalanceWallet },
    { label: 'Total Expense', value: formatCurrency(snapshot.total_expense), icon: MdTrendingDown },
    { label: 'Current Savings', value: formatCurrency(snapshot.current_savings), icon: MdSavings },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map(({ label, value, icon: Icon }) => (
        <div key={label} className="glass-card p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 flex items-center justify-center shrink-0">
            <Icon size={18} />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
            <p className="font-bold">{value}</p>
          </div>
        </div>
      ))}
      <div className="glass-card p-4 flex items-center gap-3 sm:col-span-3">
        <div className="h-10 w-10 rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 flex items-center justify-center shrink-0">
          <MdInsights size={18} />
        </div>
        <div className="flex-1 flex items-center justify-between flex-wrap gap-2">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Financial Health</p>
            <span
              className={`inline-block mt-0.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                healthTone[snapshot.financial_health] || healthTone.Average
              }`}
            >
              {snapshot.financial_health}
            </span>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 dark:text-slate-400">Financial Score</p>
            <p className="font-bold">{snapshot.financial_score}</p>
          </div>
        </div>
      </div>
    </div>
  );
}