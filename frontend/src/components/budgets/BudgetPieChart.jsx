import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#f43f5e', '#0ea5e9', '#a855f7', '#14b8a6'];

export default function BudgetPieChart({ status }) {
  const data = status.filter((s) => s.budget > 0).map((s) => ({ name: s.category, value: s.budget }));

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-slate-400">
        No budgets to display.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}