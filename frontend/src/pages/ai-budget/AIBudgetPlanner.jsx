import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdAutoAwesome } from 'react-icons/md';
import { generateAIBudget, getAIBudgetHistory } from '../../services/aiBudgetService';
import BudgetSnapshotGrid from '../../components/ai-budget/BudgetSnapshotGrid';
import RecommendationCard from '../../components/ai-budget/RecommendationCard';
import AIExplanation from '../../components/ai-budget/AIExplanation';
import HistoryTimeline from '../../components/ai-budget/HistoryTimeline';

export default function AIBudgetPlanner() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const loadHistory = async () => {
    setLoadingHistory(true);
    try {
      const data = await getAIBudgetHistory();
      setHistory(data);
    } catch {
      toast.error('Failed to load history');
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const data = await generateAIBudget();
      setResult(data);
      toast.success('AI budget plan generated');
      loadHistory();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to generate budget plan');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold">AI Budget Planner</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Get a personalized budget based on your real spending
          </p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="btn-primary flex items-center gap-2"
        >
          <MdAutoAwesome size={18} />
          {generating ? 'Generating...' : 'Generate AI Budget'}
        </button>
      </div>

      {generating && (
        <div className="glass-card p-10 flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Analyzing your finances and building your plan...
          </p>
        </div>
      )}

      {!generating && result && (
        <div className="space-y-6">
          <BudgetSnapshotGrid snapshot={result.budget_snapshot} />
          <RecommendationCard recommendation={result.recommendation} />
          <AIExplanation text={result.ai_explanation} />
        </div>
      )}

      {!generating && !result && (
        <div className="glass-card p-10 text-center">
          <MdAutoAwesome size={32} className="mx-auto text-primary-500 mb-3" />
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Click "Generate AI Budget" to get your personalized recommendation.
          </p>
        </div>
      )}

      <div>
        <h2 className="font-semibold mb-3">History</h2>
        {loadingHistory ? (
          <div className="flex h-24 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
          </div>
        ) : (
          <HistoryTimeline history={history} />
        )}
      </div>
    </div>
  );
}