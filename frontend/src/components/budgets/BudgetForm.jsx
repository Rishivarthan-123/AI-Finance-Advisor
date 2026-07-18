import { useForm } from 'react-hook-form';
import { EXPENSE_CATEGORIES } from '../../utils/constants';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function BudgetForm({ initialData, onSubmit, submitting }) {
  const now = new Date();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      category: '',
      budget_amount: '',
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1.5">Category</label>
        <select className="input-field" {...register('category', { required: 'Category is required' })}>
          <option value="">Select category</option>
          {EXPENSE_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Budget Amount</label>
        <input
          type="number"
          step="0.01"
          className="input-field"
          placeholder="0.00"
          {...register('budget_amount', {
            required: 'Budget amount is required',
            min: { value: 1, message: 'Must be greater than zero' },
          })}
        />
        {errors.budget_amount && (
          <p className="text-xs text-red-500 mt-1">{errors.budget_amount.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Month</label>
          <select className="input-field" {...register('month', { required: true })}>
            {MONTHS.map((m, i) => (
              <option key={m} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Year</label>
          <input
            type="number"
            className="input-field"
            {...register('year', { required: true })}
          />
        </div>
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? 'Saving...' : initialData ? 'Update Budget' : 'Add Budget'}
      </button>
    </form>
  );
}