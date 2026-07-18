import { MdEdit, MdDeleteOutline, MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function TransactionTable({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-slate-400">
        No transactions match your filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <th className="py-3 px-3 font-medium">Title</th>
            <th className="py-3 px-3 font-medium">Category</th>
            <th className="py-3 px-3 font-medium">Payment</th>
            <th className="py-3 px-3 font-medium">Date</th>
            <th className="py-3 px-3 font-medium text-right">Amount</th>
            <th className="py-3 px-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => {
            const isIncome = tx.type === 'Income';
            return (
              <tr
                key={tx.id}
                className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isIncome
                          ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10'
                          : 'bg-rose-100 text-rose-600 dark:bg-rose-500/10'
                      }`}
                    >
                      {isIncome ? <MdArrowDownward size={14} /> : <MdArrowUpward size={14} />}
                    </div>
                    <span className="font-medium">{tx.title}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-400">{tx.category}</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-400">{tx.payment_method}</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                  {formatDate(tx.transaction_date)}
                </td>
                <td
                  className={`py-3 px-3 text-right font-semibold ${
                    isIncome ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {isIncome ? '+' : '-'}
                  {formatCurrency(tx.amount)}
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(tx)}
                      className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-500/10"
                    >
                      <MdEdit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(tx)}
                      className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                    >
                      <MdDeleteOutline size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}