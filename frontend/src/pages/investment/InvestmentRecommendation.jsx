import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { MdTrendingUp, MdArrowForward, MdKeyboardArrowDown, MdSchedule } from 'react-icons/md';
import { generateInvestmentPlan, getInvestmentHistory } from '../../services/investmentService';
import InvestmentSummaryCards from '../../components/investment/InvestmentSummaryCards';
import AllocationPieChart from '../../components/investment/AllocationPieChart';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function InvestmentRecommendation() {
  const [plan, setPlan] = useState(null);
  const [needsPrediction, setNeedsPrediction] = useState(false);
  const [history, setHistory] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [openHistoryId, setOpenHistoryId] = useState(null);

  const loadHistory = async () => {
    setLoadingHistory(true);
    try {
      const data = await getInvestmentHistory();
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
    setNeedsPrediction(false);
    try {
      const data = await generateInvestmentPlan();
      if (!data.success) {
        setNeedsPrediction(true);
        toast.error(data.message || 'Please generate a financial prediction first');
      } else {
        setPlan(data);
        toast.success('Investment plan generated');
        loadHistory();
      }
    } catch {
      toast.error('Failed to generate investment plan');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold">Investment Recommendation</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            A personalized allocation plan based on your risk profile
          </p>
        </div>
        <button onClick={handleGenerate} disabled={generating} className="btn-primary flex items-center gap-2">
          <MdTrendingUp size={18} />
          {generating ? 'Generating...' : 'Generate Investment Plan'}
        </button>
      </div>

      {generating && (
        <div className="glass-card p-10 flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
          <p className="text-sm text-slate-500 dark:text-slate-400">Building your investment plan...</p>
        </div>
      )}

      {!generating && needsPrediction && (
        <div className="glass-card p-8 text-center space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            You need a financial health prediction before we can generate an investment plan.
          </p>
          <Link to="/prediction" className="btn-primary inline-flex items-center gap-2">
            Go to Financial Prediction <MdArrowForward size={16} />
          </Link>
        </div>
      )}

      {!generating && plan && (
        <div className="space-y-6">
          <InvestmentSummaryCards plan={plan} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card p-5">
              <h2 className="font-semibold mb-3">Portfolio Allocation</h2>
              <AllocationPieChart plan={plan} />
            </div>
            <div className="glass-card p-5">
              <h2 className="font-semibold mb-3">AI Explanation</h2>
              <div className="prose prose-sm dark:prose-invert max-w-none prose-p:text-slate-600 dark:prose-p:text-slate-300 max-h-64 overflow-y-auto">
                <ReactMarkdown>{plan.ai_explanation}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}

      {!generating && !plan && !needsPrediction && (
        <div className="glass-card p-10 text-center text-sm text-slate-400">
          Click "Generate Investment Plan" to get your personalized allocation.
        </div>
      )}

      <div>
        <h2 className="font-semibold mb-3">History</h2>
        {loadingHistory ? (
          <div className="flex h-24 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
          </div>
        ) : history.length === 0 ? (
          <div className="glass-card p-8 text-center text-sm text-slate-400">No past investment plans yet.</div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => {
              const isOpen = openHistoryId === item.id;
              return (
                <div key={item.id} className="glass-card overflow-hidden">
                  <button
                    onClick={() => setOpenHistoryId(isOpen ? null : item.id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-primary-50 dark:bg-primary-500/10 text-primary-600 flex items-center justify-center shrink-0">
                        <MdSchedule size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          SIP: {formatCurrency(item.monthly_sip)} · Emergency Fund:{' '}
                          {formatCurrency(item.emergency_fund)}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {formatDate(item.created_at)}
                        </p>
                      </div>
                    </div>
                    <MdKeyboardArrowDown
                      size={20}
                      className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 border-t border-slate-100 dark:border-slate-800 pt-3 text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                      {item.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}