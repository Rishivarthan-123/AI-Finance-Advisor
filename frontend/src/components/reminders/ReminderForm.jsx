import { useForm } from 'react-hook-form';

export default function ReminderForm({ initialData, onSubmit, submitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      title: '',
      amount: '',
      category: '',
      due_date: new Date().toISOString().slice(0, 10),
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1.5">Bill Title</label>
        <input
          className="input-field"
          placeholder="e.g. Electricity Bill"
          {...register('title', { required: 'Title is required' })}
        />
        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Amount</label>
          <input
            type="number"
            step="0.01"
            className="input-field"
            {...register('amount', {
              required: 'Amount is required',
              min: { value: 0.01, message: 'Must be greater than zero' },
            })}
          />
          {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Category</label>
          <input
            className="input-field"
            placeholder="e.g. Utilities"
            {...register('category', { required: 'Category is required' })}
          />
          {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Due Date</label>
        <input
          type="date"
          className="input-field"
          {...register('due_date', { required: 'Due date is required' })}
        />
        {errors.due_date && <p className="text-xs text-red-500 mt-1">{errors.due_date.message}</p>}
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? 'Saving...' : initialData ? 'Update Reminder' : 'Add Reminder'}
      </button>
    </form>
  );
}