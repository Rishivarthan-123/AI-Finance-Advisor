import { MdSecurity, MdAutorenew } from 'react-icons/md';
import { formatCurrency } from '../../utils/formatters';

export default function InvestmentSummaryCards({ plan }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="glass-card p-5 flex items-center gap-4">
        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shrink-0">
          <MdSecurity size={20} />
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Emergency Fund Target</p>
          <p className="text-xl font-bold">{formatCurrency(plan.emergency_fund)}</p>
          <p className="text-[11px] text-slate-400">6 months of income</p>
        </div>
      </div>
      <div className="glass-card p-5 flex items-center gap-4">
        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shrink-0">
          <MdAutorenew size={20} />
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Recommended Monthly SIP</p>
          <p className="text-xl font-bold">{formatCurrency(plan.monthly_sip)}</p>
        </div>
      </div>
    </div>
  );
}