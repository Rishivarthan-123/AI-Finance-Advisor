export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">

      <div className="flex justify-between items-center">
        <div>
          <div className="h-8 w-60 rounded bg-slate-200 dark:bg-slate-700"></div>
          <div className="h-4 w-80 rounded bg-slate-200 dark:bg-slate-700 mt-3"></div>
        </div>

        <div className="h-5 w-36 rounded bg-slate-200 dark:bg-slate-700"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {[1,2,3,4].map((i)=>(
          <div
            key={i}
            className="glass-card p-5 h-32"
          >
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700"></div>

            <div className="h-8 w-32 rounded bg-slate-200 dark:bg-slate-700 mt-6"></div>

            <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 mt-4"></div>
          </div>
        ))}

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="glass-card h-56"></div>

        <div className="glass-card h-56"></div>

      </div>

      <div className="glass-card h-72"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="glass-card h-80"></div>

        <div className="glass-card h-80"></div>

      </div>

    </div>
  );
}