import { motion } from 'framer-motion';

export default function StatCard({ label, value, icon: Icon, tone = 'default', suffix = '' }) {
  const toneStyles = {
    default: 'from-primary-500 to-primary-700',
    green: 'from-emerald-500 to-emerald-700',
    red: 'from-rose-500 to-rose-700',
    amber: 'from-amber-500 to-amber-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-5 flex items-center gap-4"
    >
      <div
        className={`h-11 w-11 rounded-xl bg-gradient-to-br ${toneStyles[tone]} flex items-center justify-center text-white shrink-0`}
      >
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{label}</p>
        <p className="text-xl font-bold truncate">
          {value}
          {suffix}
        </p>
      </div>
    </motion.div>
  );
}