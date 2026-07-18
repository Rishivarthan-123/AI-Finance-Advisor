import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { MdAdd } from 'react-icons/md';
import {
  getReminders,
  addReminder,
  updateReminder,
  deleteReminder,
  markReminderPaid,
} from '../../services/reminderService';
import ReminderCard from '../../components/reminders/ReminderCard';
import ReminderForm from '../../components/reminders/ReminderForm';
import Modal from '../../components/common/Modal';

const TABS = ['All', 'Pending', 'Overdue', 'Paid'];

export default function BillReminders() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('All');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingReminder, setDeletingReminder] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getReminders();
      setReminders(data);
    } catch {
      toast.error('Failed to load reminders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (tab === 'All') return reminders;
    return reminders.filter((r) => r.status === tab);
  }, [reminders, tab]);

  const openAddModal = () => {
    setEditingReminder(null);
    setModalOpen(true);
  };

  const openEditModal = (reminder) => {
    setEditingReminder(reminder);
    setModalOpen(true);
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editingReminder) {
        await updateReminder(editingReminder.id, data);
        toast.success('Reminder updated');
      } else {
        await addReminder(data);
        toast.success('Reminder added');
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
    if (!deletingReminder) return;
    try {
      await deleteReminder(deletingReminder.id);
      toast.success('Reminder deleted');
      setDeletingReminder(null);
      load();
    } catch {
      toast.error('Failed to delete reminder');
    }
  };

  const handleMarkPaid = async (reminder) => {
    try {
      await markReminderPaid(reminder.id);
      toast.success('Marked as paid');
      load();
    } catch {
      toast.error('Failed to update reminder');
    }
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold">Bill Reminders</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {reminders.filter((r) => r.status === 'Pending').length} pending
          </p>
        </div>
        <button onClick={openAddModal} className="btn-primary flex items-center gap-2">
          <MdAdd size={18} /> Add Reminder
        </button>
      </div>

      <div className="flex items-center gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              tab === t
                ? 'bg-primary-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card p-12 text-center text-sm text-slate-400">No reminders in this category.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              onEdit={openEditModal}
              onDelete={(r) => setDeletingReminder(r)}
              onMarkPaid={handleMarkPaid}
            />
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingReminder ? 'Edit Reminder' : 'Add Reminder'}
      >
        <ReminderForm initialData={editingReminder} onSubmit={handleSubmit} submitting={submitting} />
      </Modal>

      <Modal
        open={!!deletingReminder}
        onClose={() => setDeletingReminder(null)}
        title="Delete Reminder"
        maxWidth="max-w-sm"
      >
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
          Delete "{deletingReminder?.title}"? This can't be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={() => setDeletingReminder(null)} className="btn-secondary flex-1">
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