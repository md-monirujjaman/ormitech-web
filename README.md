# OrmiTech Landing

Premium Next.js App Router landing page for OrmiTech.

## Stack
- Next.js App Router
- JavaScript / JSX
- Tailwind CSS
- Framer Motion
- Lucide React

## Public architecture
This project intentionally implements the **landing layer only** while keeping the future OrmiTech architecture visible in the messaging:

- `ormitech.com` — public marketing site (this project)
- `app.ormitech.com` — future customer workspace/dashboard
- `admin.ormitech.com` — future super-admin
- `api.ormitech.com` — future Node.js backend/API
- `docs.ormitech.com` — future documentation

Do not place dashboard/admin/backend implementation into this landing project unless the scope explicitly changes.

## Routes
- `/`
- `/blog`
- `/blog/[slug]`
- `/privacy`
- `/terms`
- `/api/contact`

## Run
```bash
npm install
npm run dev
```

## Verify
```bash
npm run build
```

The contact API currently validates and logs requests. Connect it to your production email/CRM provider using environment variables before launch.


## Multi-page expansion
Public routes now include `/product`, `/features`, `/how-it-works`, `/pricing`, `/contact`, `/blog`, `/blog/[slug]`, `/privacy`, and `/terms`.

## Brand visibility
The supplied OrmiTech IT red/black logo is rendered on a white plate in the navbar/footer so the black lettering stays visible against the near-black industrial theme.

## Architecture alignment
The landing page communicates the future five-part ecosystem: `ormitech.com` marketing, `app.ormitech.com` dashboard, `admin.ormitech.com` super admin, `api.ormitech.com` backend, and `docs.ormitech.com` documentation. Only the marketing site is implemented here.
