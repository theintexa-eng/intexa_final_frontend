# API Implementation Guide

This document lists all APIs currently integrated in frontend and where they are used.

## Central API Layer

All API calls are implemented in:
- src/api/base44Client.js

Base URL behavior:
- API calls use VITE_API_BASE_URL when defined.
- If VITE_API_BASE_URL is empty, calls are sent as relative paths like /api/...

Current base URL logic:

```js
const apiBaseUrl = (env?.VITE_API_BASE_URL || '').replace(/\/$/, '');
```

## Implemented APIs

### 1) Start Inquiry

- Method: POST
- Endpoint: /api/inquiry/start
- API method: base44.inquiry.start(payload)
- Used in:
  - src/components/shared/LeadCaptureForm.jsx (Step 1 Continue)
  - src/components/landing/LandingForm.jsx (Step 1 Continue)

Payload:

```json
{
  "name": "string",
  "phone": "string",
  "email": "string",
  "city": "string"
}
```

### 2) Inquiry Step 2

- Method: PUT
- Endpoint: /api/inquiry/step2/:inquiryId
- API method: base44.inquiry.step2(inquiryId, payload)
- Used in:
  - src/components/shared/LeadCaptureForm.jsx (Step 2 Continue)
  - src/components/landing/LandingForm.jsx (Step 2 Continue)

Payload:

```json
{
  "propertyType": "string",
  "budget": "string",
  "timeline": "string",
  "message": "string"
}
```

### 3) Complete Inquiry

- Method: PUT
- Endpoint: /api/inquiry/complete/:inquiryId
- API method: base44.inquiry.complete(inquiryId)
- Used in:
  - src/components/shared/LeadCaptureForm.jsx (Step 3 Submit)
  - src/components/landing/LandingForm.jsx (Step 3 Submit)

Payload:

```json
{}
```

### 4) Partner Apply

- Method: POST
- Endpoint: /api/partners/apply
- API method: base44.partners.apply(payload)
- Used in:
  - src/components/partners/PartnerForm.jsx (Final Submit)

Payload:

```json
{
  "studioName": "string",
  "yearOfEstablishment": "string",
  "founderName": "string",
  "teamSize": "string",
  "contactName": "string",
  "phone": "string",
  "email": "string",
  "city": "string",
  "specialization": "string",
  "projectValueRange": "string",
  "portfolioLink": "string",
  "website": "string",
  "gstNumber": "string",
  "clientRef1": "string",
  "clientRef2": "string",
  "consent": true
}
```

## Error Handling

- Non-2xx responses throw ApiError in src/api/base44Client.js.
- UI catches errors and shows message in form components.
