import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TRANSACTION_TYPES, INCOME_CATEGORIES, EXPENSE_CATEGORIES, PAYMENT_METHODS } from '../../utils/constants';

export default function TransactionForm({ initialData, onSubmit, submitting }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      title: '',
      amount: '',
      type: 'Expense',
      category: '',
      payment_method: '',
      description: '',
      transaction_date: new Date().toISOString().slice(0, 10),
    },
  });

  const type = watch('type');
  const categories = type === 'Income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const submit = async (data) => {
    try {
      await onSubmit(data);
    } catch (err) {
      const resErrors = err?.response?.data?.errors;
      if (resErrors) {
        Object.entries(resErrors).forEach(([field, message]) => {
          setError(field, { type: 'server', message });
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1.5">Title</label>
          <input
            className="input-field"
            placeholder="e.g. Grocery shopping"
            {...register('title', { required: 'Title is required', maxLength: 100 })}
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Type</label>
          <select className="input-field" {...register('type', { required: true })}>
            {TRANSACTION_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Amount</label>
          <input
            type="number"
            step="0.01"
            className="input-field"
            placeholder="0.00"
            {...register('amount', {
              required: 'Amount is required',
              min: { value: 0.01, message: 'Must be greater than zero' },
            })}
          />
          {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Category</label>
          <select className="input-field" {...register('category', { required: 'Category is required' })}>
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Payment Method</label>
          <select
            className="input-field"
            {...register('payment_method', { required: 'Payment method is required' })}
          >
            <option value="">Select method</option>
            {PAYMENT_METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          {errors.payment_method && (
            <p className="text-xs text-red-500 mt-1">{errors.payment_method.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Date</label>
          <input
            type="date"
            className="input-field"
            {...register('transaction_date', { required: 'Date is required' })}
          />
          {errors.transaction_date && (
            <p className="text-xs text-red-500 mt-1">{errors.transaction_date.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1.5">Description (optional)</label>
          <textarea
            className="input-field resize-none"
            rows={2}
            maxLength={500}
            {...register('description')}
          />
        </div>
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? 'Saving...' : initialData ? 'Update Transaction' : 'Add Transaction'}
      </button>
    </form>
  );
}