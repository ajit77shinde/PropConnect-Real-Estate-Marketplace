# PropConnect — Real Estate Marketplace MVP

A React + TypeScript frontend for a **real-estate marketplace + broker CRM**.

## Stack

- React + TypeScript + Vite
- Material UI (MUI)
- React Router
- Redux Toolkit
- React Hook Form + Zod

## Run locally

```bash
cd estate-marketplace
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Demo logins

| Role    | Email               | Password |
|---------|---------------------|----------|
| Buyer   | buyer@demo.com      | demo123  |
| Broker  | broker@demo.com     | demo123  |
| Builder | builder@demo.com    | demo123  |
| Admin   | admin@demo.com      | demo123  |

## MVP features

### Buyer
Home, search/filters, property listing & details, broker profile, enquiry (lead capture), login/register, saved properties, buyer dashboard.

### Broker
Dashboard, multi-step add/edit property, my properties, enquiries/leads, customers, site visits, profile.

### Builder
Dashboard, projects, add project, inventory, enquiries, profile.

### Admin
Dashboard, users, properties, brokers/builders, approve/reject listings & projects, featured listings, enquiries.

## Architecture note

The core entity is a **Listing** (not “flats only”), with `listingType` + `transaction` so the product can grow into residential + commercial.

Data is currently mocked in Redux for a fully runnable frontend MVP. Swap slices for RTK Query / API services when the backend is ready.
