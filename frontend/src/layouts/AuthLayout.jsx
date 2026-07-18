import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-surface-dark dark:via-panel-dark dark:to-surface-dark px-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}