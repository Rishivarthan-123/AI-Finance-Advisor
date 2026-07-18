import { motion } from 'framer-motion';
import { MdSavings, MdPieChart } from 'react-icons/md';
import { formatCurrency } from '../../utils/formatters';

export default function RecommendationCard({ recommendation }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 bg-gradient-to-br from-primary-600 to-primary-800 text-white"
    >
      <div className="flex items-center gap-2 mb-4">
        <MdPieChart size={20} />
        <h2 className="font-semibold">AI Recommendation</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-primary-100 text-xs">Recommended Budget</p>
          <p className="text-2xl font-bold">{formatCurrency(recommendation.recommended_budget)}</p>
        </div>
        <div>
          <p className="text-primary-100 text-xs flex items-center gap-1">
            <MdSavings size={14} /> Recommended Savings
          </p>
          <p className="text-2xl font-bold">{formatCurrency(recommendation.recommended_savings)}</p>
        </div>
        <div>
          <p className="text-primary-100 text-xs">Savings Percentage</p>
          <p className="text-2xl font-bold">{recommendation.saving_percentage}%</p>
        </div>
      </div>
    </motion.div>
  );
}