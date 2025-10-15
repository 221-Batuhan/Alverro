````markdown
# Alvérro Web

Alvérro is a modern and classy web application for an Old Money inspired clothing & lifestyle brand built with Next.js (App Router), TypeScript, Prisma, and TailwindCSS.

---

## Quick Setup

1. Clone the repository:

```bash
git clone <repo-url>
cd alverro-web
````

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and set your environment variables:

```
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Start PostgreSQL (Docker example):

```bash
docker run --name alverro-postgres -e POSTGRES_USER=alverro -e POSTGRES_PASSWORD=<your-password> -e POSTGRES_DB=alverro -p 5432:5432 -d postgres
```

5. Generate Prisma Client, run migrations, and seed the database:

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run seed
```

6. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

```
```