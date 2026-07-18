import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const COLORS = ['#22c55e', '#f43f5e'];

export default function IncomeExpensePie({ income, expense }) {
  const data = [
    { name: 'Income', value: income },
    { name: 'Expense', value: expense },
  ];

  if (income === 0 && expense === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-slate-400">
        No transactions yet.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}