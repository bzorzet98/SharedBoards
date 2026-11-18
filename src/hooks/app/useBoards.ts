import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import type { Board, CreateBoardForm } from '../../types'

export const useBoards = () => {
  const [boards, setBoards] = useState<Board[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const fetchBoards = async () => {
    setLoading(true)
    setError(null)

    const { data, error } = await supabase
      .from('boards')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setBoards(data || [])
    }

    setLoading(false)
  }

  const createBoard = async (form: CreateBoardForm) => {
    const { data: configData } = await supabase
      .from('app_config')
      .select('value')
      .eq('key', 'max_boards_per_user')
      .single()

    const maxBoards = parseInt(configData?.value || '10')

    const { count } = await supabase
      .from('boards')
      .select('*', { count: 'exact', head: true })

    if (count !== null && count >= maxBoards) {
      setError(`Límite de ${maxBoards} boards alcanzado`)
      return false
    }

    const inviteCode = form.is_shared
      ? Math.random().toString(36).substring(2, 8).toUpperCase()
      : null

    const { error } = await supabase
      .from('boards')
      .insert({
        name: form.name,
        description: form.description || null,
        is_shared: form.is_shared,
        invite_code: inviteCode,
      })

    if (error) {
      setError(error.message)
      return false
    }

    await fetchBoards()
    return true
  }

  const deleteBoard = async (boardId: string) => {
    const { error } = await supabase
      .from('boards')
      .delete()
      .eq('id', boardId)

    if (error) {
      setError(error.message)
      return false
    }

    await fetchBoards()
    return true
  }

  useEffect(() => {
    fetchBoards()
  }, [])

  return {
    boards,
    loading,
    error,
    showCreateModal,
    setShowCreateModal,
    createBoard,
    deleteBoard,
  }
}