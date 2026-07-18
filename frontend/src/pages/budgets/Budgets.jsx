import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { MdAdd, MdWarningAmber } from 'react-icons/md';
import {
  getBudgets,
  getBudgetStatus,
  getBudgetAlerts,
  addBudget,
  updateBudget,
  deleteBudget,
} from '../../services/budgetService';
import BudgetCard from '../../components/budgets/BudgetCard';
import BudgetForm from '../../components/budgets/BudgetForm';
import BudgetPieChart from '../../components/budgets/BudgetPieChart';
import Modal from '../../components/common/Modal';

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [status, setStatus] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingBudget, setDeletingBudget] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const [budgetList, statusList, alertList] = await Promise.all([
        getBudgets(),
        getBudgetStatus(),
        getBudgetAlerts(),
      ]);
      setBudgets(budgetList);
      setStatus(statusList);
      setAlerts(alertList);
    } catch {
      toast.error('Failed to load budgets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const statusByCategory = useMemo(() => {
    const map = {};
    status.forEach((s) => {
      map[s.category] = s;
    });
    return map;
  }, [status]);

  const openAddModal = () => {
    setEditingBudget(null);
    setModalOpen(true);
  };

  const openEditModal = (budget) => {
    setEditingBudget(budget);
    setModalOpen(true);
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editingBudget) {
        await updateBudget(editingBudget.id, data);
        toast.success('Budget updated');
      } else {
        await addBudget(data);
        toast.success('Budget added');
      }
      setModalOpen(false);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingBudget) return;
    try {
      await deleteBudget(deletingBudget.id);
      toast.success('Budget deleted');
      setDeletingBudget(null);
      load();
    } catch {
      toast.error('Failed to delete budget');
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold">Budgets</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {budgets.length} active budget{budgets.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button onClick={openAddModal} className="btn-primary flex items-center gap-2">
          <MdAdd size={18} /> Add Budget
        </button>
      </div>

      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-sm"
            >
              <MdWarningAmber size={18} className="shrink-0" />
              <span>
                <strong>{alert.category}:</strong> {alert.message}
              </span>
            </div>
          ))}
        </div>
      )}

      {budgets.length === 0 ? (
        <div className="glass-card p-12 text-center text-sm text-slate-400">
          No budgets yet. Add one to start tracking spending limits.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {budgets.map((budget) => (
              <BudgetCard
                key={budget.id}
                budget={budget}
                status={statusByCategory[budget.category]}
                onEdit={openEditModal}
                onDelete={(b) => setDeletingBudget(b)}
              />
            ))}
          </div>
          <div className="glass-card p-5">
            <h2 className="font-semibold mb-3">Budget Distribution</h2>
            <BudgetPieChart status={status} />
          </div>
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingBudget ? 'Edit Budget' : 'Add Budget'}
      >
        <BudgetForm initialData={editingBudget} onSubmit={handleSubmit} submitting={submitting} />
      </Modal>

      <Modal
        open={!!deletingBudget}
        onClose={() => setDeletingBudget(null)}
        title="Delete Budget"
        maxWidth="max-w-sm"
      >
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
          Delete the budget for "{deletingBudget?.category}"? This can't be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={() => setDeletingBudget(null)} className="btn-secondary flex-1">
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