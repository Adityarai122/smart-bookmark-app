# Smart Bookmark App

A modern, full-stack bookmark manager built with **Next.js 14**, **Supabase**, and **Tailwind CSS**.

## Features

- **Authentication**: Secure Google OAuth login powered by Supabase Auth.
- **Bookmark Management**: Create, read, and delete bookmarks effortlessly.
- **Real-Time Updates**: Changes sync instantly across all devices and tabs.
- **Responsive Design**: Polished UI that works beautifully on desktop and mobile.
- **Secure**: Row Level Security (RLS) ensures your data is private.
- **Performance**: Optimized with Next.js App Router and Server Components.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Hooks (`useAuth`, `useBookmarks`)
- **Validation**: Custom URL validation utility

## Getting Started

### Prerequisites

- Node.js 18+ installed.
- A Supabase project created.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/smart-bookmark-app.git
    cd smart-bookmark-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file in the root directory and add your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Database Setup:**
    Run the SQL script provided in `supabase/schema.sql` in your Supabase SQL Editor to create tables and policies.

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components (`Header`, `Footer`, `BookmarkList`, etc.).
- `src/hooks`: Custom React hooks for logic reuse (`useAuth`, `useBookmarks`).
- `src/services`: API service layer for Supabase interactions.
- `src/utils`: Utility functions and helpers.
- `src/styles`: Global styles and Tailwind configuration.

## Challenges Faced & Solutions

### 1. Supabase Schema and Row Level Security (RLS)
**Challenge:** Configuring the database schema and implementing secure access control was initially challenging. Specifically, understanding how to apply Row Level Security (RLS) policies to ensure users could only access their own bookmarks required a deep dive into PostgreSQL and Supabase documentation.
**Solution:** I focused on understanding the `auth.uid()` function and how it integrates with RLS policies. I created a robust SQL script that not only sets up the necessary tables but also applies granular policies for `SELECT`, `INSERT`, `UPDATE`, and `DELETE` operations, ensuring complete data isolation and security.

### 2. Environment Configuration
**Challenge:** Managing environment variables for different deployment stages and ensuring the Supabase client was correctly initialized with the right keys was another hurdle.
**Solution:** I adopted a strict environment variable management strategy using `.env.local` for development. This approach, combined with a dedicated `auth.service.ts`, ensured that sensitive credentials were handled securely and consistently across the application.




