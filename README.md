# Study Platform

A comprehensive platform for students in Bangladesh, providing all necessary information and tools for university admission preparation.

## 🚀 Features

- **University Information:** Detailed information about public, private, and affiliated universities.
- **Admission Calendar:** A centralized calendar for all university admission test dates and deadlines.
- **Dynamic Countdown Timers:** Specific countdowns for each university's admission events.
- **Question Bank:** Access to previous years' question papers for various universities and units.
- **Eligibility Calculator:** Check your eligibility for different universities based on your results.
- **OMR Self-Test Simulator:** Create and take your own OMR-based tests with custom timing, question counts, and negative marking to evaluate your preparation.
- **User Authentication:** Secure login via GitHub, Google, or as a guest (anonymous) using Supabase.
- **Personalized Experience (Browser-Saved):**
  - Save target university and HSC result in your profile.
  - Bookmark favorite exams to view in a personalized calendar.
  - Bookmark important subjects for quick access.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Database & Auth:** [Supabase](https://supabase.io/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Deployment:** [Vercel](https://vercel.com/)

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v20 or later)
- npm (or pnpm/yarn)

### Installation

1.  Clone the repo:
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    ```
2.  Install packages:
    ```sh
    npm install
    ```
3.  Set up your environment variables. Create a `.env.local` file and add your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```
4.  Run the development server:
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

## 📜 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Creates a production build of the app.
- `npm run start`: Starts the production server.
- `npm run typecheck`: Runs TypeScript to check for type errors.
