create table public.app_config (
  key text primary key,
  value text not null,
  description text
);

insert into public.app_config (key, value, description) values
  ('max_boards_per_user', '20', 'Máximo de boards que puede crear un usuario');