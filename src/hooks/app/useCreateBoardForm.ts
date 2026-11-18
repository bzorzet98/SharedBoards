import { useState } from 'react'
import type { CreateBoardForm } from '../../types'

export const useCreateBoardForm = (onSubmit: (form: CreateBoardForm) => Promise<boolean>, onClose: () => void) => {
  const [form, setForm] = useState<CreateBoardForm>({
    name: '',
    description: '',
    is_shared: false,
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (field: keyof CreateBoardForm, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const success = await onSubmit(form)
    setLoading(false)
    if (success) {
      setForm({ name: '', description: '', is_shared: false })
      onClose()
    }
  }

  return {
    form,
    loading,
    handleChange,
    handleSubmit,
  }
}