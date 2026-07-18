import { useForm } from 'react-hook-form';
import { RISK_LEVELS } from '../../utils/constants';

export default function PredictionForm({ onSubmit, submitting, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const numField = (name, label, opts = {}) => (
    <div key={name}>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        type="number"
        step="0.01"
        className="input-field"
        {...register(name, { required: `${label} is required`, min: { value: 0, message: 'Cannot be negative' }, ...opts })}
      />
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name].message}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {numField('age', 'Age', { min: { value: 18, message: 'Must be 18+' }, max: { value: 100, message: 'Must be under 100' } })}

        <div>
          <label className="block text-sm font-medium mb-1.5">Occupation</label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. Software Engineer"
            {...register('occupation', { required: 'Occupation is required' })}
          />
          {errors.occupation && <p className="text-xs text-red-500 mt-1">{errors.occupation.message}</p>}
        </div>

        {numField('monthly_income', 'Monthly Income')}
        {numField('monthly_expense', 'Monthly Expense')}
        {numField('savings', 'Savings')}
        {numField('debt', 'Debt')}
        {numField('emi', 'Monthly EMI')}
        {numField('investment_amount', 'Investment Amount')}
        {numField('transaction_count', 'Transaction Count (this month)')}
        {numField('budget_utilization', 'Budget Utilization (%)', { max: { value: 200, message: 'Enter a realistic %' } })}
        {numField('savings_rate', 'Savings Rate (%)', { max: { value: 100, message: 'Max 100%' } })}

        <div>
          <label className="block text-sm font-medium mb-1.5">Risk Level</label>
          <select className="input-field" {...register('risk_level', { required: true })}>
            {RISK_LEVELS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? 'Analyzing...' : 'Predict Financial Health'}
      </button>
    </form>
  );
}