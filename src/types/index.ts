export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  created_at: string
}

export interface Board {
  id: string
  name: string
  description?: string
  owner_id: string
  is_shared: boolean
  invite_code?: string
  created_at: string
}

export interface BoardMember {
  board_id: string
  user_id: string
  role: 'owner' | 'member'
  created_at: string
}

export interface Note {
  id: string
  board_id: string
  author_id: string
  content: string
  created_at: string
}

export interface Task {
  id: string
  board_id: string
  title: string
  status: 'pending' | 'in_progress' | 'done'
  assigned_to?: string
  due_date?: string
  created_by: string
  created_at: string
}

export interface CreateBoardForm {
  name: string
  description: string
  is_shared: boolean
}