import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = { 'Mutual Funds': '#6366f1', Stocks: '#22c55e', 'Fixed Deposit': '#f59e0b', 'Gold ETF': '#eab308', Bonds: '#0ea5e9' };

export default function AllocationPieChart({ plan }) {
  const data = [
    { name: 'Mutual Funds', value: plan.mutual_funds },
    { name: 'Stocks', value: plan.stocks },
    { name: 'Fixed Deposit', value: plan.fixed_deposit },
    { name: 'Gold ETF', value: plan.gold },
    { name: 'Bonds', value: plan.bonds },
  ].filter((d) => d.value > 0);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={2}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={COLORS[entry.name]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}