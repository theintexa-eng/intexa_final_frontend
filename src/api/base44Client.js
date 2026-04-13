const env = /** @type {{ VITE_LEAD_API_URL?: string } | undefined} */ (
  /** @type {any} */ (import.meta).env
);
const leadApiUrl = env?.VITE_LEAD_API_URL;

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

export const base44 = {
  entities: {
    Lead: {
      create: createLead,
    },
  },
  auth: {
    me: async () => null,
    logout: () => {},
    redirectToLogin: () => {},
  },
};
