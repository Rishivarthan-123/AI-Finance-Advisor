import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdOutlineMailOutline, MdLockOutline, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await login({ email: data.email, password: data.password });
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      const resData = err?.response?.data;
      if (resData?.errors) {
        Object.entries(resData.errors).forEach(([field, message]) => {
          setError(field, { type: 'server', message });
        });
      } else {
        toast.error(resData?.message || 'Invalid email or password');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="glass-card p-8 animate-fadeIn">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-xl">
          F
        </div>
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Log in to manage your finances
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Email</label>
          <div className="relative">
            <MdOutlineMailOutline
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="email"
              placeholder="you@example.com"
              className="input-field pl-10"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email' },
              })}
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Password</label>
          <div className="relative">
            <MdLockOutline
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="input-field pl-10 pr-10"
              {...register('password', { required: 'Password is required' })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" disabled={submitting} className="btn-primary w-full mt-2">
          {submitting ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary-600 font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}