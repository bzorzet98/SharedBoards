-- Habilitar RLS en todas las tablas
alter table public.profiles enable row level security;
alter table public.boards enable row level security;
alter table public.board_members enable row level security;
alter table public.notes enable row level security;
alter table public.tasks enable row level security;

-- PROFILES
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- BOARDS
create policy "Users can view their own boards or boards they are members of"
  on public.boards for select
  using (
    owner_id = auth.uid() or
    id in (select board_id from public.board_members where user_id = auth.uid())
  );

create policy "Users can create boards"
  on public.boards for insert
  with check (owner_id = auth.uid());

create policy "Only owner can update board"
  on public.boards for update
  using (owner_id = auth.uid());

create policy "Only owner can delete board"
  on public.boards for delete
  using (owner_id = auth.uid());

-- BOARD MEMBERS
create policy "Members can view board members"
  on public.board_members for select
  using (
    board_id in (select board_id from public.board_members where user_id = auth.uid())
  );

create policy "Owner can add members"
  on public.board_members for insert
  with check (
    board_id in (select id from public.boards where owner_id = auth.uid())
  );

create policy "Owner can remove members"
  on public.board_members for delete
  using (
    board_id in (select id from public.boards where owner_id = auth.uid())
  );

-- NOTES
create policy "Members can view notes"
  on public.notes for select
  using (
    board_id in (
      select id from public.boards where owner_id = auth.uid()
      union
      select board_id from public.board_members where user_id = auth.uid()
    )
  );

create policy "Members can create notes"
  on public.notes for insert
  with check (
    author_id = auth.uid() and
    board_id in (
      select id from public.boards where owner_id = auth.uid()
      union
      select board_id from public.board_members where user_id = auth.uid()
    )
  );

create policy "Authors can update their notes"
  on public.notes for update
  using (author_id = auth.uid());

create policy "Authors can delete their notes"
  on public.notes for delete
  using (author_id = auth.uid());

-- TASKS
create policy "Members can view tasks"
  on public.tasks for select
  using (
    board_id in (
      select id from public.boards where owner_id = auth.uid()
      union
      select board_id from public.board_members where user_id = auth.uid()
    )
  );

create policy "Members can create tasks"
  on public.tasks for insert
  with check (
    created_by = auth.uid() and
    board_id in (
      select id from public.boards where owner_id = auth.uid()
      union
      select board_id from public.board_members where user_id = auth.uid()
    )
  );

create policy "Members can update tasks"
  on public.tasks for update
  using (
    board_id in (
      select id from public.boards where owner_id = auth.uid()
      union
      select board_id from public.board_members where user_id = auth.uid()
    )
  );

create policy "Members can delete tasks"
  on public.tasks for delete
  using (
    board_id in (
      select id from public.boards where owner_id = auth.uid()
      union
      select board_id from public.board_members where user_id = auth.uid()
    )
  );