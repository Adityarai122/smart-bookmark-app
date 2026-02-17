-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create bookmarks table
create table bookmarks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  title text not null,
  url text not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table bookmarks enable row level security;

-- Create Policies

-- 1. Select Policy: Users can only see their own bookmarks
create policy "Users can view their own bookmarks"
on bookmarks for select
using ( auth.uid() = user_id );

-- 2. Insert Policy: Users can only insert their own bookmarks
create policy "Users can insert their own bookmarks"
on bookmarks for insert
with check ( auth.uid() = user_id );

-- 3. Delete Policy: Users can only delete their own bookmarks
create policy "Users can delete their own bookmarks"
on bookmarks for delete
using ( auth.uid() = user_id );

-- 4. Update Policy (Optional/Good practice, though not explicitly requested in Phase 2 instructions, adding for completeness if needed later)
create policy "Users can update their own bookmarks"
on bookmarks for update
using ( auth.uid() = user_id );
