import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { MdAdd, MdSearch } from 'react-icons/md';
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from '../../services/transactionService';
import { TRANSACTION_TYPES, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../utils/constants';
import TransactionTable from '../../components/transactions/TransactionTable';
import TransactionForm from '../../components/transactions/TransactionForm';
import Modal from '../../components/common/Modal';
import Pagination from '../../components/common/Pagination';
import { usePagination } from '../../hooks/usePagination';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingTx, setDeletingTx] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch {
      toast.error('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const allCategories = useMemo(
    () => Array.from(new Set([...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES])),
    []
  );

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch = (tx.title || '').toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'All' || tx.type === typeFilter;
      const matchesCategory = categoryFilter === 'All' || tx.category === categoryFilter;
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, search, typeFilter, categoryFilter]);

  const { page, setPage, totalPages, paginated } = usePagination(filtered, 8);

  const openAddModal = () => {
    setEditingTx(null);
    setModalOpen(true);
  };

  const openEditModal = (tx) => {
    setEditingTx(tx);
    setModalOpen(true);
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editingTx) {
        await updateTransaction(editingTx.id, data);
        toast.success('Transaction updated');
      } else {
        await addTransaction(data);
        toast.success('Transaction added');
      }
      setModalOpen(false);
      load();
    } catch (err) {
      if (!err?.response?.data?.errors) {
        toast.error(err?.response?.data?.message || 'Something went wrong');
      }
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingTx) return;
    try {
      await deleteTransaction(deletingTx.id);
      toast.success('Transaction deleted');
      setDeletingTx(null);
      load();
    } catch {
      toast.error('Failed to delete transaction');
    }
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold">Transactions</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {filtered.length} of {transactions.length} transactions
          </p>
        </div>
        <button onClick={openAddModal} className="btn-primary flex items-center gap-2">
          <MdAdd size={18} /> Add Transaction
        </button>
      </div>

      <div className="glass-card p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            className="input-field pl-10"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input-field w-auto"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="All">All Types</option>
          {TRANSACTION_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          className="input-field w-auto"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          {allCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="glass-card p-4">
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
          </div>
        ) : (
          <>
            <TransactionTable
              transactions={paginated}
              onEdit={openEditModal}
              onDelete={(tx) => setDeletingTx(tx)}
            />
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </>
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTx ? 'Edit Transaction' : 'Add Transaction'}
      >
        <TransactionForm initialData={editingTx} onSubmit={handleSubmit} submitting={submitting} />
      </Modal>

      <Modal
        open={!!deletingTx}
        onClose={() => setDeletingTx(null)}
        title="Delete Transaction"
        maxWidth="max-w-sm"
      >
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
          Are you sure you want to delete "{deletingTx?.title}"? This can't be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={() => setDeletingTx(null)} className="btn-secondary flex-1">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-medium px-4 py-2.5 rounded-xl transition-colors"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}