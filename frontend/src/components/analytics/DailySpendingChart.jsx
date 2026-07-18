import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

export default function DailySpendingChart({ data }) {
  const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  if (sorted.length === 0) {
    return <div className="h-64 flex items-center justify-center text-sm text-slate-400">No daily spending yet.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={sorted} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ borderRadius: 12, fontSize: 13, border: 'none' }} />
        <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={2} fill="url(#spendingGradient)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}