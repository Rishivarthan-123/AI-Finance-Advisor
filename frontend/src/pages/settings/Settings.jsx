import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdDarkMode, MdLightMode, MdPerson, MdLogout, MdEmail, MdPhone } from 'react-icons/md';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    setLoggingOut(true);
    logout();
    toast.success('Logged out');
    navigate('/login');
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-2xl">
      <div>
        <h1 className="text-xl font-bold">Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Manage your app preferences and account</p>
      </div>

      <div className="glass-card p-6 space-y-4">
        <h2 className="font-semibold">Appearance</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setTheme('light')}
            className={`flex items-center gap-2 justify-center px-4 py-3 rounded-xl border transition-colors ${
              theme === 'light'
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-500/10'
                : 'border-slate-200 dark:border-slate-700 text-slate-500'
            }`}
          >
            <MdLightMode size={18} /> Light
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`flex items-center gap-2 justify-center px-4 py-3 rounded-xl border transition-colors ${
              theme === 'dark'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400'
                : 'border-slate-200 dark:border-slate-700 text-slate-500'
            }`}
          >
            <MdDarkMode size={18} /> Dark
          </button>
        </div>
      </div>

      <div className="glass-card p-6 space-y-4">
        <h2 className="font-semibold">Account</h2>
        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <MdEmail size={16} className="text-slate-400" /> {user?.email}
          </p>
          <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <MdPhone size={16} className="text-slate-400" /> {user?.phone}
          </p>
        </div>
        <Link to="/profile" className="btn-secondary inline-flex items-center gap-2">
          <MdPerson size={18} /> Edit Financial Profile
        </Link>
      </div>

      <div className="glass-card p-6 space-y-3">
        <h2 className="font-semibold text-rose-600">Danger Zone</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Logging out will end your session on this device.
        </p>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-medium px-4 py-2.5 rounded-xl transition-colors"
        >
          <MdLogout size={18} /> Log Out
        </button>
      </div>
    </div>
  );
}