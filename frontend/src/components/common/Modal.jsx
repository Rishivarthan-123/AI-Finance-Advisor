import { AnimatePresence, motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';

export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-lg' }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full ${maxWidth} bg-white dark:bg-panel-dark rounded-xl2 shadow-glass border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto`}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-panel-dark rounded-t-xl2">
              <h2 className="font-semibold text-lg">{title}</h2>
              <button
                onClick={onClose}
                className="h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <MdClose size={18} />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}