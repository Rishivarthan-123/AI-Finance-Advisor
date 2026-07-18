import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MdAutoAwesome,
  MdInsights,
  MdTrendingUp,
  MdPieChart,
  MdNotificationsActive,
  MdChatBubbleOutline,
  MdArrowForward,
} from 'react-icons/md';

const FEATURES = [
  { icon: MdInsights, title: 'AI Financial Health', desc: 'Get a real-time score and prediction based on your actual spending patterns.' },
  { icon: MdAutoAwesome, title: 'Smart Budget Plans', desc: 'AI-generated budgets tailored to your income, goals, and habits.' },
  { icon: MdTrendingUp, title: 'Investment Guidance', desc: 'Personalized portfolio allocation across mutual funds, stocks, gold, and more.' },
  { icon: MdPieChart, title: 'Deep Analytics', desc: 'Visualize spending trends, category breakdowns, and monthly patterns.' },
  { icon: MdNotificationsActive, title: 'Bill Reminders', desc: 'Never miss a due date with smart, automatic reminders.' },
  { icon: MdChatBubbleOutline, title: 'AI Chat Advisor', desc: 'Ask anything about your finances and get instant, contextual answers.' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark overflow-hidden">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 sm:px-12 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold">
            F
          </div>
          <span className="font-bold text-lg">Finlytic</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600">
            Log In
          </Link>
          <Link to="/register" className="btn-primary text-sm">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center px-6 pt-16 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-600 text-xs font-semibold mb-5">
            AI-Powered Personal Finance
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Take control of your money with{' '}
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              AI-driven insights
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-5 text-lg max-w-xl mx-auto">
            Track spending, generate smart budgets, predict your financial health, and get personalized investment advice — all in one place.
          </p>
          <div className="flex items-center justify-center gap-3 mt-8">
            <Link to="/register" className="btn-primary flex items-center gap-2 px-6 py-3">
              Start for free <MdArrowForward size={18} />
            </Link>
            <Link to="/login" className="btn-secondary px-6 py-3">
              Log In
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-card p-6"
            >
              <div className="h-11 w-11 rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 flex items-center justify-center mb-4">
                <Icon size={20} />
              </div>
              <h3 className="font-semibold mb-1.5">{title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="glass-card p-10 text-center bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <h2 className="text-2xl font-bold mb-2">Ready to master your finances?</h2>
          <p className="text-primary-100 mb-6">Join Finlytic and get AI-backed clarity on every rupee.</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors"
          >
            Create your free account <MdArrowForward size={18} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Finlytic. Built for smarter financial decisions.
      </footer>
    </div>
  );
}