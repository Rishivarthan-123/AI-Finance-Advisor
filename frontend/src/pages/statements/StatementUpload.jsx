import { useState } from 'react';
import {
  MdUploadFile,
  MdCloudUpload,
  MdCheckCircle,
  MdError,
  MdDescription,
} from 'react-icons/md';

import {
  uploadStatement,
  previewStatement,
  confirmStatementImport,
} from '../../services/statementService';

export default function StatementUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [statementId, setStatementId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    if (!e.target.files.length) return;

    const selected = e.target.files[0];

    const allowed = [
      'text/csv',
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];

    if (!allowed.includes(selected.type)) {
      setError('Only CSV, XLSX and PDF files are supported.');
      return;
    }

    setError('');
    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please choose a statement file.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setUploadSuccess(false);

      const response = await uploadStatement(file);

      if (response.success) {
        setStatementId(response.statement_id);
        setUploadSuccess(true);

        // Show preview
        const preview = await previewStatement(response.statement_id);
        if (preview.success) {
          setTransactions(preview.transactions);
          setMessage(`Found ${preview.count} transactions — importing...`);
        }

        // Auto-confirm import immediately
        const confirm = await confirmStatementImport(response.statement_id);
        if (confirm.success) {
          setMessage(`✅ ${confirm.imported} transactions imported successfully!`);
        } else {
          setError(confirm.message || 'Import failed.');
        }
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          'Unable to upload statement.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
  if (!statementId) {
    alert("Invalid statement id.");
    return;
  }

  try {
    setLoading(true);

    console.log("Importing Statement:", statementId);

    const response = await confirmStatementImport(statementId);

    console.log(response);

    if (response.success) {
      alert(
        `${response.imported} transactions imported successfully.`
      );

      window.location.href = "/transactions";
    } else {
      alert(response.message);
    }
  } catch (err) {
    console.error(err);

    alert(
      err?.response?.data?.message ||
      err?.message ||
      "Import Failed"
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="max-w-7xl mx-auto space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Bank Statement Upload
        </h1>

        <p className="text-slate-500 mt-2">
          Upload your bank statement and automatically
          import transactions into Finlytic.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-8">

        <div className="border-2 border-dashed border-primary-300 rounded-xl p-10 text-center">

          <MdCloudUpload
            size={70}
            className="mx-auto text-primary-600"
          />

          <h2 className="text-xl font-semibold mt-4">
            Upload Statement
          </h2>

          <p className="text-slate-500 mt-2">
            CSV • XLSX • PDF
          </p>

          <input
            type="file"
            className="hidden"
            id="statement"
            accept=".csv,.xlsx,.xls,.pdf"
            onChange={handleFileChange}
          />

          <label
            htmlFor="statement"
            className="inline-flex mt-6 cursor-pointer px-6 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition"
          >
            <MdUploadFile
              className="mr-2"
              size={22}
            />

            Choose File
          </label>

          {file && (
            <div className="mt-5 flex items-center justify-center gap-2 text-green-600">

              <MdDescription size={22} />

              <span>{file.name}</span>

            </div>
          )}

          {error && (
            <div className="mt-6 flex justify-center items-center gap-2 text-red-600">

              <MdError />

              {error}

            </div>
          )}

          {uploadSuccess && (
            <div className="mt-6 flex justify-center items-center gap-2 text-green-600">

              <MdCheckCircle />

              {message}

            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-8 px-8 py-3 rounded-xl bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-60"
          >
            {loading
              ? 'Uploading...'
              : 'Upload Statement'}
          </button>

        </div>
      </div>
            {transactions.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-2xl font-semibold">
                Parsed Transactions
              </h2>

              <p className="text-slate-500">
                {transactions.length} transactions found
              </p>
            </div>

            <button
              onClick={() => window.location.href = '/transactions'}
              className="px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
            >
              View Transactions →
            </button>

          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">

            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">

              <thead className="bg-slate-100 dark:bg-slate-800">

                <tr>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Date
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Description
                  </th>

                  <th className="px-4 py-3 text-right text-sm font-semibold">
                    Debit
                  </th>

                  <th className="px-4 py-3 text-right text-sm font-semibold">
                    Credit
                  </th>

                  <th className="px-4 py-3 text-right text-sm font-semibold">
                    Balance
                  </th>

                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    Category
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">

                {transactions.map((tx) => (

                  <tr
                    key={tx.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >

                    <td className="px-4 py-3 whitespace-nowrap">
                      {tx.date}
                    </td>

                    <td className="px-4 py-3">
                      {tx.description}
                    </td>

                    <td className="px-4 py-3 text-right text-red-600 font-medium">
                      {tx.debit > 0
                        ? `₹${Number(tx.debit).toLocaleString()}`
                        : '-'}
                    </td>

                    <td className="px-4 py-3 text-right text-green-600 font-medium">
                      {tx.credit > 0
                        ? `₹${Number(tx.credit).toLocaleString()}`
                        : '-'}
                    </td>

                    <td className="px-4 py-3 text-right">
                      ₹{Number(tx.balance).toLocaleString()}
                    </td>

                    <td className="px-4 py-3 text-center">

                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300">

                        {tx.category || 'Uncategorized'}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  );
}