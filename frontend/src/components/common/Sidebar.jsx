import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MdSpaceDashboard,
  MdReceiptLong,
  MdPieChart,
  MdAutoAwesome,
  MdInsights,
  MdTrendingUp,
  MdBarChart,
  MdNotificationsActive,
  MdChatBubbleOutline,
  MdUploadFile,
  MdPerson,
  MdSettings,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: MdSpaceDashboard },
  { to: '/transactions', label: 'Transactions', icon: MdReceiptLong },
  { to: '/statements', label: 'Statement Upload', icon: MdUploadFile },
  { to: '/budgets', label: 'Budgets', icon: MdPieChart },
  { to: '/ai-budget', label: 'AI Budget Planner', icon: MdAutoAwesome },
  { to: '/prediction', label: 'Financial Health', icon: MdInsights },
  { to: '/investment', label: 'Investments', icon: MdTrendingUp },
  { to: '/analytics', label: 'Analytics', icon: MdBarChart },
  { to: '/reminders', label: 'Bill Reminders', icon: MdNotificationsActive },
  { to: '/chatbot', label: 'AI Chatbot', icon: MdChatBubbleOutline },
];

const bottomItems = [
  { to: '/profile', label: 'Profile', icon: MdPerson },
  { to: '/settings', label: 'Settings', icon: MdSettings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 84 : 256 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="relative shrink-0 min-h-screen border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-panel-dark flex flex-col"
    >
      <div className="flex items-center gap-2 px-5 h-16 border-b border-slate-200 dark:border-slate-800">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
          F
        </div>

        {!collapsed && (
          <span className="font-bold text-lg tracking-tight whitespace-nowrap">
            Finlytic
          </span>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`
            }
          >
            <Icon size={20} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-200 dark:border-slate-800 py-4 px-3 space-y-1">
        {bottomItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`
            }
          >
            <Icon size={20} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </div>

      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-card flex items-center justify-center"
      >
        {collapsed ? <MdChevronRight /> : <MdChevronLeft />}
      </button>
    </motion.aside>
  );
}