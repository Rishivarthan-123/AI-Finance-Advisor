import { Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-surface-dark dark:via-panel-dark dark:to-surface-dark px-4">
      <div className="text-center">
        <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-2xl">
          F
        </div>
        <h1 className="text-7xl font-extrabold text-primary-600">404</h1>
        <p className="text-lg font-semibold mt-2">Page not found</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <MdArrowBack size={18} /> Back to Home
        </Link>
      </div>
    </div>
  );
}