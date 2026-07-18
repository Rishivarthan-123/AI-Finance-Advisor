import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdSave, MdEmail, MdPhone } from 'react-icons/md';
import { getProfile, updateProfile } from '../../services/profileService';
import { useAuth } from '../../context/AuthContext';
import { RISK_LEVELS, INVESTMENT_EXPERIENCE } from '../../utils/constants';

export default function Profile() {
  const { setUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      try {
        const data = await getProfile();
        setProfile(data);
        reset({
          age: data.age ?? '',
          occupation: data.occupation ?? '',
          monthly_income: data.monthly_income ?? '',
          savings_goal: data.savings_goal ?? '',
          risk_level: data.risk_level ?? 'Low',
          investment_experience: data.investment_experience ?? 'Beginner',
        });
      } catch {
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    })();
  }, [reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const updated = await updateProfile(data);
      setProfile(updated);
      setUser((prev) => {
        const merged = { ...prev, ...updated };
        localStorage.setItem('finlytic-user', JSON.stringify(merged));
        return merged;
      });
      toast.success('Profile updated');
    } catch (err) {
      const resErrors = err?.response?.data?.errors;
      if (resErrors) {
        Object.entries(resErrors).forEach(([field, message]) => {
          setError(field, { type: 'server', message });
        });
      } else {
        toast.error('Failed to update profile');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  const initials = profile?.fullname
    ? profile.fullname.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  return (
    <div className="space-y-6 animate-fadeIn max-w-3xl">
      <div>
        <h1 className="text-xl font-bold">Profile</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Keep this updated — it powers your AI recommendations
        </p>
      </div>

      <div className="glass-card p-6 flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-primary-600 text-white flex items-center justify-center text-xl font-bold shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-semibold text-lg">{profile.fullname}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <MdEmail size={14} /> {profile.email}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <MdPhone size={14} /> {profile.phone}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-6 space-y-4">
        <h2 className="font-semibold">Financial Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Age</label>
            <input
              type="number"
              className="input-field"
              {...register('age', {
                min: { value: 18, message: 'Must be at least 18' },
                max: { value: 100, message: 'Must be under 100' },
              })}
            />
            {errors.age && <p className="text-xs text-red-500 mt-1">{errors.age.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Occupation</label>
            <input type="text" className="input-field" {...register('occupation')} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Monthly Income</label>
            <input
              type="number"
              step="0.01"
              className="input-field"
              {...register('monthly_income', { min: { value: 0, message: 'Cannot be negative' } })}
            />
            {errors.monthly_income && (
              <p className="text-xs text-red-500 mt-1">{errors.monthly_income.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Savings Goal</label>
            <input
              type="number"
              step="0.01"
              className="input-field"
              {...register('savings_goal', { min: { value: 0, message: 'Cannot be negative' } })}
            />
            {errors.savings_goal && (
              <p className="text-xs text-red-500 mt-1">{errors.savings_goal.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Risk Level</label>
            <select className="input-field" {...register('risk_level')}>
              {RISK_LEVELS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Investment Experience</label>
            <select className="input-field" {...register('investment_experience')}>
              {INVESTMENT_EXPERIENCE.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
          <MdSave size={18} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}