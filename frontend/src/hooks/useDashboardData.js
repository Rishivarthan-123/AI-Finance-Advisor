import { useEffect, useState } from 'react';

import {
  fetchDashboardSummary,
  fetchBudgetStatus,
  fetchUpcomingBills,
  fetchRecentTransactions,
  fetchPredictionHistory,
} from '../services/dashboardService';

export function useDashboardData() {
  const [data, setData] = useState({
    summary: null,
    budgetStatus: [],
    upcomingBills: [],
    recentTransactions: [],
    prediction: null,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        setLoading(true);

        const [
          summary,
          budgetStatus,
          upcomingBills,
          recentTransactions,
          predictionHistory,
        ] = await Promise.all([
          fetchDashboardSummary(),
          fetchBudgetStatus(),
          fetchUpcomingBills(),
          fetchRecentTransactions(5),
          fetchPredictionHistory(),
        ]);

        let latestPrediction = null;

        if (predictionHistory) {
          if (
            Array.isArray(predictionHistory.predictions) &&
            predictionHistory.predictions.length > 0
          ) {
            latestPrediction =
              predictionHistory.predictions[0];
          } else if (
            Array.isArray(predictionHistory.data) &&
            predictionHistory.data.length > 0
          ) {
            latestPrediction =
              predictionHistory.data[0];
          } else if (
            Array.isArray(predictionHistory) &&
            predictionHistory.length > 0
          ) {
            latestPrediction =
              predictionHistory[0];
          }
        }

        if (!isMounted) return;

        setData({
          summary,
          budgetStatus,
          upcomingBills,
          recentTransactions,
          prediction: latestPrediction,
        });
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    ...data,
    loading,
    error,
  };
}