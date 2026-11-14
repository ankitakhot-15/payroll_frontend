# PeoplePilot — HR & Payroll Frontend

Responsive React + Vite frontend starter for the HR & Payroll Management System.

## Requirements
- Node.js 20+
- Firebase project with Email/Password authentication enabled
- The Node.js/Express backend running (default `http://localhost:5000/api`)

## Install and run
```bash
cp .env.example .env
npm install
npm run dev
```
Open the URL printed by Vite (normally http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## Environment
Fill `.env` with the Firebase **web app** configuration and API URL. These are public client configuration values; never put Firebase Admin private keys, service-account JSON, Razorpay secrets, or other server secrets in this frontend.

## Backend API contract
The frontend expects a Node/Express API with Firebase ID-token verification:
- `POST /auth/login` and `GET /auth/me`
- `POST /auth/register-company`
- `GET /reports/dashboard`
- `GET /employees`, `/attendance`, `/leaves`, `/payroll`, `/payslips`, `/overtime`, `/performance`, `/job-openings`, `/employee-documents`, `/companies`
- Additional endpoints are wrapped in `src/services/*`.

The Axios interceptor automatically attaches `Authorization: Bearer <Firebase ID token>`. The backend must derive `companyId`, role, and employee scope from the verified token/user record; never trust these values from browser input.

## Notes before production
This source provides the app shell, auth flows, responsive dashboard, reusable table views, API service modules, Redux UI state, chart components, and loading/empty/error states. Some advanced workflows (create/edit forms, approvals, payslip PDF viewer, uploads, calendar, FCM permission flow, and full role-specific dashboard widgets) need to be wired to the exact backend response schemas and business policies. The `Add new`, export and record-action controls are intentionally surfaced as UI affordances with clear placeholder notices rather than pretending an unimplemented mutation succeeded.

Recommended next steps:
1. Confirm exact backend route names and payload schemas.
2. Implement each module's create/edit/detail forms with React Hook Form + Zod.
3. Add role-specific dashboard endpoints and server-side pagination metadata.
4. Add Firebase Messaging service worker and device-token registration.
5. Add automated component/API tests and accessibility review.
