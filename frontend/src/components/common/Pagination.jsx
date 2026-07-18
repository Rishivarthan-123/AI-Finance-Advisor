import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-4">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-1">
        <button
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <MdChevronLeft size={18} />
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => onChange(page + 1)}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <MdChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}