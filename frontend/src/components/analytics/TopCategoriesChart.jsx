import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#f43f5e', '#0ea5e9'];

export default function TopCategoriesChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="h-64 flex items-center justify-center text-sm text-slate-400">No expenses yet.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
        <XAxis type="number" tick={{ fontSize: 12 }} />
        <YAxis type="category" dataKey="category" tick={{ fontSize: 12 }} width={90} />
        <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ borderRadius: 12, fontSize: 13, border: 'none' }} />
        <Bar dataKey="amount" radius={[0, 6, 6, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}