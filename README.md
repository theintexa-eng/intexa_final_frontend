**Welcome to your Base44 project** 

**About**

View and Edit  your app on [Base44.com](http://Base44.com) 

This project contains everything you need to run your app locally.

**Edit the code in your local development environment**

Any change pushed to the repo will also be reflected in the Base44 Builder.

**Prerequisites:** 

1. Clone the repository using the project's Git URL 
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Create an `.env.local` file and set the right environment variables

```
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=your_backend_url

e.g.
VITE_BASE44_APP_ID=cbef744a8545c389ef439ea6
VITE_BASE44_APP_BASE_URL=https://my-to-do-list-81bfaad7.base44.app
```

Run the app: `npm run dev`

## Inquiry API Integration Guide

The contact multi-step forms now call the inquiry start endpoint on the first Continue click.

- Endpoint used: `POST /api/inquiry/start`
- Payload sent:

```json
{
	"name": "string",
	"phone": "10-digit string",
	"email": "string",
	"city": "string"
}
```

- Expected response:

```json
{
	"success": true,
	"message": "Inquiry started successfully",
	"inquiryId": "INX-1776071950331"
}
```

- Step 2 endpoint used: `POST /api/inquiry/step2/:inquiryId`
- Step 2 payload sent:

```json
{
	"propertyType": "Apartment",
	"budget": "Under 10 Lakhs",
	"timeline": "Immediately",
	"message": "Need interior design"
}
```

### How it is implemented

- Centralized API method: `base44.inquiry.start(...)` in `src/api/base44Client.js`.
- Centralized API methods in `src/api/base44Client.js`:
	- `base44.inquiry.start(...)`
	- `base44.inquiry.step2(inquiryId, payload)`
- Contact forms that use it:
	- `src/components/shared/LeadCaptureForm.jsx`
	- `src/components/landing/LandingForm.jsx`
- Form behavior:
	- Step 1 (About You) validates fields.
	- Continue triggers `base44.inquiry.start`.
	- On success, UI moves to next step and stores `inquiryId` in component state.
	- Step 2 (Your Project) Continue triggers `base44.inquiry.step2(inquiryId, payload)`.
	- Step 2 sends human-readable values for `propertyType`, `budget`, and `timeline`.
	- On failure, user remains on current step and sees a clear error message.

### Environment setup

- Optional: set `VITE_API_BASE_URL` in `.env.local`.
	- Example backend: `VITE_API_BASE_URL=https://api.intexa.in`
- If `VITE_API_BASE_URL` is not set, frontend uses relative paths like `/api/inquiry/start`.
- Vite dev server proxy is configured in `vite.config.js` to forward `/api/*` to `https://api.intexa.in`.

### Production notes

- In production, point `VITE_API_BASE_URL` to your backend origin if API is on a different domain.
- If API is same-origin behind gateway/reverse-proxy, leave `VITE_API_BASE_URL` unset and keep relative `/api/*` routes.

**Publish your changes**

Open [Base44.com](http://Base44.com) and click on Publish.

**Docs & Support**

Documentation: [https://docs.base44.com/Integrations/Using-GitHub](https://docs.base44.com/Integrations/Using-GitHub)

Support: [https://app.base44.com/support](https://app.base44.com/support)
