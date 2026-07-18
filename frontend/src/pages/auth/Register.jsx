import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  MdOutlinePerson,
  MdOutlineMailOutline,
  MdOutlinePhone,
  MdLockOutline,
  MdVisibility,
  MdVisibilityOff,
} from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await registerUser({
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      toast.success('Account created! Please log in.');
      navigate('/login');
    } catch (err) {
      const resData = err?.response?.data;
      if (resData?.errors) {
        Object.entries(resData.errors).forEach(([field, message]) => {
          setError(field, { type: 'server', message });
        });
      } else {
        toast.error(resData?.message || 'Registration failed');
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
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Start managing your finances smarter
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Full Name</label>
          <div className="relative">
            <MdOutlinePerson
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="John Doe"
              className="input-field pl-10"
              {...register('fullname', {
                required: 'Full name is required',
                minLength: { value: 3, message: 'At least 3 characters' },
              })}
            />
          </div>
          {errors.fullname && (
            <p className="text-xs text-red-500 mt-1">{errors.fullname.message}</p>
          )}
        </div>

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
          <label className="block text-sm font-medium mb-1.5">Phone Number</label>
          <div className="relative">
            <MdOutlinePhone
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="tel"
              placeholder="9876543210"
              className="input-field pl-10"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: { value: /^\d{10}$/, message: 'Enter exactly 10 digits' },
              })}
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
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
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'At least 8 characters' },
              })}
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

        <div>
          <label className="block text-sm font-medium mb-1.5">Confirm Password</label>
          <div className="relative">
            <MdLockOutline
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="input-field pl-10"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button type="submit" disabled={submitting} className="btn-primary w-full mt-2">
          {submitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-primary-600 font-medium hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}