# AWS Backend URL Setup Guide

This file explains where to set backend URL after deploying backend on AWS.

## 1) Local Development

If backend runs locally on port 3000:

- Keep frontend as it is.
- vite.config.js already proxies /api to http://localhost:3000 for local dev.

File:
- vite.config.js

## 2) Production or Staging with AWS Backend

Set environment variable VITE_API_BASE_URL to your AWS backend base URL.

Examples:

```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

or

```env
VITE_API_BASE_URL=https://your-load-balancer-url.amazonaws.com
```

Do not add trailing slash.

## 3) Where to configure it

### A) Local test with AWS backend

Create/update .env.local in project root:

```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

Then restart frontend dev server.

### B) Netlify deployment

Set in Netlify dashboard:
- Site settings
- Environment variables
- Add VITE_API_BASE_URL

### C) Vercel deployment

Set in Vercel dashboard:
- Project settings
- Environment Variables
- Add VITE_API_BASE_URL

## 4) How to verify all APIs after URL change

Open browser DevTools Network tab and test these flows:

1. Contact form Step 1 Continue:
- POST /api/inquiry/start
- Expect 200/201 and inquiryId in response

2. Contact form Step 2 Continue:
- PUT /api/inquiry/step2/:inquiryId
- Expect success true

3. Contact form Step 3 Submit:
- PUT /api/inquiry/complete/:inquiryId
- Expect success true

4. Partners form final submit:
- POST /api/partners/apply
- Expect success true and partnerId

## 5) Quick Troubleshooting

- 404 Cannot POST/PUT:
  - Check method and endpoint path in backend routes.
  - Confirm backend is deployed and reachable.
  - Confirm VITE_API_BASE_URL points to correct host.

- CORS error:
  - Allow frontend domain in backend CORS config.

- Wrong API host in network:
  - Restart frontend after changing env.
  - Verify VITE_API_BASE_URL is loaded correctly.

## 6) Current integration file map

- src/api/base44Client.js
- src/components/shared/LeadCaptureForm.jsx
- src/components/landing/LandingForm.jsx
- src/components/partners/PartnerForm.jsx
