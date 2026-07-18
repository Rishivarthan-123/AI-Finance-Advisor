import {
  MdAutoAwesome,
  MdCheckCircle,
  MdTrendingUp,
  MdWarningAmber,
} from "react-icons/md";

export default function FinancialScoreCard({ prediction }) {
  if (!prediction) {
    return (
      <div className="glass-card p-6 h-full">
        <div className="flex items-center gap-2 mb-4">
          <MdAutoAwesome className="text-primary-500 text-2xl" />
          <h2 className="text-lg font-semibold">
            AI Financial Score
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center py-8">

          <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-slate-800 flex items-center justify-center mb-4">

            <MdAutoAwesome className="text-4xl text-primary-500" />

          </div>

          <p className="font-medium">
            No Financial Prediction
          </p>

          <p className="text-sm text-slate-500 text-center mt-2">
            Generate your first financial prediction to see
            your AI score and recommendations.
          </p>

        </div>
      </div>
    );
  }

  const score = Number(prediction.financial_score || 0);

  let status = "Needs Improvement";
  let scoreColor = "text-red-500";
  let bg = "bg-red-100 dark:bg-red-900/20";
  let Icon = MdWarningAmber;

  if (score >= 80) {
    status = "Excellent";
    scoreColor = "text-green-600";
    bg = "bg-green-100 dark:bg-green-900/20";
    Icon = MdCheckCircle;
  } else if (score >= 60) {
    status = "Good";
    scoreColor = "text-yellow-500";
    bg = "bg-yellow-100 dark:bg-yellow-900/20";
    Icon = MdTrendingUp;
  }

  return (
    <div className="glass-card p-6 h-full">

      <div className="flex items-center gap-2 mb-5">

        <MdAutoAwesome className="text-primary-500 text-2xl" />

        <h2 className="text-lg font-semibold">
          AI Financial Score
        </h2>

      </div>

      <div className="flex justify-between items-center">

        <div>

          <div className={`text-5xl font-bold ${scoreColor}`}>
            {score}
          </div>

          <div className="text-sm text-slate-500">
            /100 Score
          </div>

        </div>

        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center ${bg}`}
        >
          <Icon
            className={`text-3xl ${scoreColor}`}
          />
        </div>

      </div>

      <div className="mt-6 space-y-3">

        <div className="flex justify-between">

          <span className="text-slate-500">
            Financial Health
          </span>

          <span className={scoreColor}>
            {status}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-slate-500">
            Confidence
          </span>

          <span>
            {prediction.confidence ?? "--"}%
          </span>

        </div>

      </div>

      <div className="mt-6 rounded-xl bg-slate-100 dark:bg-slate-800 p-4">

        <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">
          AI Recommendation
        </div>

        <p className="text-sm leading-6">

          {prediction.recommendation ||
            "No recommendation available."}

        </p>

      </div>
    </div>
  );
}