import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

export default function BudgetUtilizationChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-slate-400">
        No budgets set yet.
      </div>
    );
  }

  const barColor = (utilization) => {
    if (utilization >= 100) return '#f43f5e';
    if (utilization >= 80) return '#f59e0b';
    return '#6366f1';
  };

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
        <XAxis dataKey="category" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} unit="%" />
        <Tooltip
          formatter={(value) => [`${value}%`, 'Utilization']}
          contentStyle={{ borderRadius: 12, fontSize: 13, border: 'none' }}
        />
        <Bar dataKey="utilization" radius={[6, 6, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={index} fill={barColor(entry.utilization)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}