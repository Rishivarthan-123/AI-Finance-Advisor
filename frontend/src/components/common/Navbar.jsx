import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdLightMode, MdDarkMode, MdNotifications, MdKeyboardArrowDown } from 'react-icons/md';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = user?.fullname
    ? user.fullname
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-panel-dark/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-20">
      <div>
        <h1 className="text-sm text-slate-500 dark:text-slate-400">
          Welcome back{user?.fullname ? `, ${user.fullname.split(' ')[0]}` : ''} 👋
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="h-10 w-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
        </button>

        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="h-10 w-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
            aria-label="Notifications"
          >
            <MdNotifications size={20} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-72 glass-card p-3 animate-fadeIn">
              <p className="text-sm font-semibold px-2 pb-2">Notifications</p>
              <div className="text-sm text-slate-500 dark:text-slate-400 px-2 py-4 text-center">
                You're all caught up.
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-semibold">
              {initials}
            </div>
            <MdKeyboardArrowDown size={18} className="text-slate-400" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 glass-card p-2 animate-fadeIn">
              <Link
                to="/profile"
                onClick={() => setDropdownOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Profile
              </Link>
              <Link
                to="/settings"
                onClick={() => setDropdownOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Settings
              </Link>
              <hr className="my-1 border-slate-200 dark:border-slate-700" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}