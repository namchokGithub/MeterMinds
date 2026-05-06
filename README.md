# MeterMinds

MeterMinds is a basic fullstack starter app for tracking utility meters such as electricity, water, gas, and custom meters.

The app helps users record meter readings, calculate usage, estimate utility costs, and view a simple dashboard summary.

## Purpose

This project is built as a learning project for practicing fullstack development with Next.js.

The main focus is to connect frontend and backend concepts in one app:

- UI pages and routing
- Forms and validation
- Server Actions or Route Handlers
- Database access with Prisma
- PostgreSQL schema design
- CRUD operations
- Basic business logic
- Dashboard summary

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL

## MVP Features

- View, create, edit, and delete meters
- View meter detail
- Add meter readings
- View reading history
- Calculate usage as current reading minus previous reading
- Calculate estimated cost as usage multiplied by rate per unit
- Simple dashboard with total meters, latest readings, latest usage, and estimated cost

## Meter Types

The starter project supports these meter types:

- Electricity
- Water
- Gas
- Custom

## Project Structure

```txt
app/
  page.tsx
  meters/
    page.tsx
    new/
      page.tsx
    [id]/
      page.tsx
      edit/
        page.tsx
      readings/
        new/
          page.tsx
  settings/
    page.tsx

components/
  ui/
  meter/
  dashboard/
  layout/

lib/
  prisma.ts
  services/
  actions/
  validations/

prisma/
  schema.prisma

```

## Database Models

### Meter

Represents a utility meter.

id
name
type
unit
ratePerUnit
createdAt
updatedAt

### MeterReading

Represents a reading record for a meter.

id
meterId
readingValue
readingDate
note
createdAt

## Usage Calculation

MeterMinds calculates usage from the current reading and the previous reading.

```
usage = currentReading - previousReadingestimatedCost = usage * ratePerUnit
```

## Setup

### 1. Install dependencies

```
pnpm install
```

### 2. Configure environment variables

Create `.env` from `.env.example` and set `DATABASE_URL`.

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

Example for local PostgreSQL:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/meterminds?schema=public"
```

### 3. Run the first migration

```
pnpm prisma:migrate ----name init
```

### 4. Start the development server

```
pnpm dev
```

Open the app in your browser:

```
http://localhost:3000
```

## Available Pages

| Route                       | Description                      |
| --------------------------- | -------------------------------- |
| `/`                         | Dashboard overview               |
| `/meters`                   | Meter list                       |
| `/meters/new`               | Create meter                     |
| `/meters/[id]`              | Meter detail and reading history |
| `/meters/[id]/edit`         | Edit meter                       |
| `/meters/[id]/readings/new` | Add meter reading                |
| `/settings`                 | App settings                     |

## Development Roadmap

Recommended build order:

```
1. Project setup
2. Prisma schema
3. Meter CRUD
4. Meter Reading CRUD
5. Usage calculation
6. Dashboard summary
7. UI polish
```

## Not Included Yet

This starter does not include:

- Authentication
- Charts
- Tests
- Notification system
- File upload
- Multi-user support

## Future Improvements

- Authentication and user-based meters
- Monthly usage chart
- Cost trend chart
- Budget tracking
- Abnormal usage warning
- Reading reminder
- CSV export
- Image upload for meter photos
- Multi-home or multi-location support
- Dark mode

## License

This project is for learning purposes.

---

_Namchok Singhachai_
_© 2026 Personal Task Dashboard. Released under the MIT License._
