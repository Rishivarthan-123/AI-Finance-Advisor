import { Link } from "react-router-dom";
import {
  MdAddCircle,
  MdAccountBalanceWallet,
  MdPsychology,
  MdAutoAwesome,
  MdTrendingUp,
  MdChat,
  MdUploadFile,
  MdNotificationsActive,
  MdArrowForward,
} from "react-icons/md";

const actions = [
  {
    title: "Add Transaction",
    description: "Record a new income or expense",
    icon: MdAddCircle,
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/20",
    path: "/transactions/add",
  },
  {
    title: "Add Budget",
    description: "Create or update a budget",
    icon: MdAccountBalanceWallet,
    color: "text-green-600",
    bg: "bg-green-100 dark:bg-green-900/20",
    path: "/budgets/add",
  },
  {
    title: "Financial Prediction",
    description: "Generate AI financial health score",
    icon: MdPsychology,
    color: "text-purple-600",
    bg: "bg-purple-100 dark:bg-purple-900/20",
    path: "/prediction",
  },
  {
    title: "AI Budget Planner",
    description: "Create an AI-powered budget plan",
    icon: MdAutoAwesome,
    color: "text-amber-600",
    bg: "bg-amber-100 dark:bg-amber-900/20",
    path: "/ai-budget",
  },
  {
    title: "Investment Advice",
    description: "View AI investment suggestions",
    icon: MdTrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-900/20",
    path: "/investment",
  },
  {
    title: "AI Chat",
    description: "Ask finance-related questions",
    icon: MdChat,
    color: "text-cyan-600",
    bg: "bg-cyan-100 dark:bg-cyan-900/20",
    path: "/chatbot",
  },
  {
    title: "Upload Statement",
    description: "Import your bank statement",
    icon: MdUploadFile,
    color: "text-orange-600",
    bg: "bg-orange-100 dark:bg-orange-900/20",
    path: "/statements",
  },
  {
    title: "Bill Reminders",
    description: "Manage upcoming bill payments",
    icon: MdNotificationsActive,
    color: "text-red-600",
    bg: "bg-red-100 dark:bg-red-900/20",
    path: "/reminders",
  },
];

export default function QuickActions() {
  return (
    <div className="glass-card p-6">

      <div className="flex items-center justify-between mb-5">

        <div>
          <h2 className="text-xl font-semibold">
            Quick Actions
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Quickly access the most frequently used features.
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.path}
              className="group rounded-2xl border border-slate-200 dark:border-slate-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${action.bg}`}
              >
                <Icon
                  className={`text-2xl ${action.color}`}
                />
              </div>

              <h3 className="font-semibold mb-2">
                {action.title}
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400 leading-6">
                {action.description}
              </p>

              <div className="flex items-center gap-1 mt-5 text-primary-600 font-medium text-sm">

                Open

                <MdArrowForward className="transition-transform group-hover:translate-x-1" />

              </div>

            </Link>
          );
        })}

      </div>

    </div>
  );
}