import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const MONTH_NAMES = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function MonthlyExpenseChart({ data }) {
  const sorted = [...data]
    .sort((a, b) => a.month - b.month)
    .map((d) => ({ ...d, label: MONTH_NAMES[d.month] }));

  if (sorted.length === 0) {
    return <div className="h-64 flex items-center justify-center text-sm text-slate-400">No expense data yet.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={sorted} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ borderRadius: 12, fontSize: 13, border: 'none' }} />
        <Line type="monotone" dataKey="expense" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}