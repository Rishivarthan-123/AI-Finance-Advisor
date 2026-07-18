import api from "./api";

/**
 * Upload Bank Statement
 */
export const uploadStatement = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/api/statements/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

/**
 * Preview Parsed Transactions
 */
export const previewStatement = async (statementId) => {
  const response = await api.get(
    `/api/statements/${statementId}/preview`
  );

  return response.data;
};

/**
 * Confirm Import
 */
export const confirmStatementImport = async (statementId) => {
  const response = await api.post(
    `/api/statements/${statementId}/confirm`
  );

  return response.data;
};

/**
 * Statement History
 */
export const getStatementHistory = async () => {
  const response = await api.get(
    "/api/statements"
  );

  return response.data;
};

/**
 * Delete Statement
 */
export const deleteStatement = async (statementId) => {
  const response = await api.delete(
    `/api/statements/${statementId}`
  );

  return response.data;
};