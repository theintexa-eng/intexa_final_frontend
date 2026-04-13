const env = /** @type {{ VITE_LEAD_API_URL?: string, VITE_API_BASE_URL?: string } | undefined} */ (
  /** @type {any} */ (import.meta).env
);
const leadApiUrl = env?.VITE_LEAD_API_URL;
const apiBaseUrl = (env?.VITE_API_BASE_URL || '').replace(/\/$/, '');

/** @param {Record<string, unknown>} payload */
const saveLeadLocally = (payload) => {
  if (typeof window === 'undefined') return;
  const key = 'intexa_lead_submissions';
  const existing = JSON.parse(window.localStorage.getItem(key) || '[]');
  existing.push({ ...payload, submittedAt: new Date().toISOString() });
  window.localStorage.setItem(key, JSON.stringify(existing));
};

/** @param {Record<string, unknown>} payload */
const createLead = async (payload) => {
  if (!leadApiUrl) {
    saveLeadLocally(payload);
    return { ok: true, stored: 'local' };
  }

  const response = await fetch(leadApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = `Lead submission failed with status ${response.status}`;
    throw new Error(message);
  }

  try {
    return await response.json();
  } catch {
    return { ok: true, stored: 'remote' };
  }
};

/**
 * HTTP error class that carries the response status code.
 * Use this to distinguish recoverable errors (e.g. 404 = stale inquiry id)
 * from hard failures (5xx) in calling code.
 */
export class ApiError extends Error {
  /** @param {string} message @param {number} status */
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    /** @type {number} */
    this.status = status;
  }
}

/**
 * Base JSON request helper for POST/PUT requests.
 * Keep backend calls centralized here to ensure consistent error handling.
 * Throws ApiError (with .status) on non-2xx responses.
 *
 * @template T
 * @param {string} method
 * @param {string} path
 * @param {Record<string, unknown>} payload
 * @returns {Promise<T>}
 */
const requestJson = async (method, path, payload) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${apiBaseUrl}${normalizedPath}`;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  /** @type {any} */
  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const serverMessage = data && typeof data.message === 'string' ? data.message : '';
    throw new ApiError(serverMessage || `Request failed with status ${response.status}`, response.status);
  }

  return /** @type {T} */ (data || {});
};

/**
 * Convenience wrapper for POST requests.
 * @template T
 * @param {string} path
 * @param {Record<string, unknown>} payload
 * @returns {Promise<T>}
 */
const postJson = async (path, payload) => requestJson('POST', path, payload);

/**
 * Convenience wrapper for PUT requests.
 * @template T
 * @param {string} path
 * @param {Record<string, unknown>} payload
 * @returns {Promise<T>}
 */
const putJson = async (path, payload) => requestJson('PUT', path, payload);

/**
 * Starts inquiry lifecycle with backend and returns generated inquiry id.
 * Backend contract: POST /api/inquiry/start
 *
 * @param {{ name: string, phone: string, email: string, city: string }} payload
 */
const startInquiry = async (payload) => {
  const result = await postJson('/api/inquiry/start', payload);
  return {
    success: !!result.success,
    message: result.message || '',
    inquiryId: result.inquiryId || '',
  };
};

/**
 * Updates inquiry with step-2 project details.
 * Backend contract: PUT /api/inquiry/step2/:inquiryId
 *
 * @param {string} inquiryId
 * @param {{ propertyType: string, budget: string, timeline: string, message?: string }} payload
 */
const updateInquiryStep2 = async (inquiryId, payload) => {
  const safeInquiryId = (inquiryId || '').trim();
  if (!safeInquiryId) {
    throw new Error('Missing inquiry id. Please restart from step 1.');
  }

  const path = `/api/inquiry/step2/${encodeURIComponent(safeInquiryId)}`;

  const result = await putJson(path, payload);
  return {
    success: !!result.success,
    message: result.message || '',
    inquiryId: result.inquiryId || safeInquiryId,
  };
};

/**
 * Completes inquiry lifecycle on final step.
 * Backend contract: PUT /api/inquiry/complete/:inquiryId
 *
 * @param {string} inquiryId
 */
const completeInquiry = async (inquiryId) => {
  const safeInquiryId = (inquiryId || '').trim();
  if (!safeInquiryId) {
    throw new Error('Missing inquiry id. Please restart from step 1.');
  }

  const result = await putJson(`/api/inquiry/complete/${encodeURIComponent(safeInquiryId)}`, {});
  return {
    success: !!result.success,
    message: result.message || '',
    inquiryId: result.inquiryId || safeInquiryId,
  };
};

/**
 * Submits partner onboarding application.
 * Backend contract: POST /api/partners/apply
 *
 * @param {{
 *   studioName: string,
 *   yearOfEstablishment: string,
 *   founderName: string,
 *   teamSize: string,
 *   contactName: string,
 *   phone: string,
 *   email: string,
 *   city: string,
 *   specialization: string,
 *   projectValueRange: string,
 *   portfolioLink: string,
 *   website: string,
 *   gstNumber: string,
 *   clientRef1: string,
 *   clientRef2: string,
 *   consent: boolean,
 * }} payload
 */
const applyPartner = async (payload) => {
  const result = await postJson('/api/partners/apply', payload);
  return {
    success: !!result.success,
    message: result.message || '',
    partnerId: result.partnerId || '',
  };
};

export const base44 = {
  entities: {
    Lead: {
      create: createLead,
    },
  },
  inquiry: {
    start: startInquiry,
    step2: updateInquiryStep2,
    complete: completeInquiry,
  },
  partners: {
    apply: applyPartner,
  },
  auth: {
    me: async () => null,
    logout: () => {},
    redirectToLogin: () => {},
  },
};
