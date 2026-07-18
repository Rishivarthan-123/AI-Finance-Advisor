import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { predictFinancialHealth, getPredictionHistory } from '../../services/predictionService';
import PredictionForm from '../../components/prediction/PredictionForm';
import PredictionResultCard from '../../components/prediction/PredictionResultCard';
import PredictionHistoryList from '../../components/prediction/PredictionHistoryList';

export default function FinancialPrediction() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const loadHistory = async () => {
    setLoadingHistory(true);
    try {
      const data = await getPredictionHistory();
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

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      const res = await predictFinancialHealth(data);
      setResult(res);
      toast.success('Prediction complete');
      loadHistory();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Prediction failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-xl font-bold">Financial Health Prediction</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          AI-powered assessment based on your financial details
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="font-semibold mb-4">Your Details</h2>
          <PredictionForm onSubmit={handleSubmit} submitting={submitting} />
        </div>

        <div className="space-y-6">
          {submitting && (
            <div className="glass-card p-10 flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
              <p className="text-sm text-slate-500 dark:text-slate-400">Running prediction model...</p>
            </div>
          )}

          {!submitting && result && (
            <>
              <PredictionResultCard prediction={result.prediction} />
              <div className="glass-card p-6">
                <h2 className="font-semibold mb-3">AI Summary & Recommendations</h2>
                <div className="prose prose-sm dark:prose-invert max-w-none prose-p:text-slate-600 dark:prose-p:text-slate-300">
                  <ReactMarkdown>{result.gemini_summary}</ReactMarkdown>
                </div>
              </div>
            </>
          )}

          {!submitting && !result && (
            <div className="glass-card p-10 text-center text-sm text-slate-400">
              Fill in your details and submit to see your financial health prediction.
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-3">History</h2>
        {loadingHistory ? (
          <div className="flex h-24 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
          </div>
        ) : (
          <PredictionHistoryList history={history} />
        )}
      </div>
    </div>
  );
}