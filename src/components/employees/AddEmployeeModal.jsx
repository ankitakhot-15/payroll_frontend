import { useState } from 'react'
import { toast } from 'sonner'
import api from '../../services/api'

const empty = {
  employeeId: '',
  name: '',
  email: '',
  department: '',
  designation: '',
  status: 'ACTIVE',
}

export default function AddEmployeeModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)

  if (!open) return null

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.post('/employees', form)
      toast.success('Employee created')
      setForm(empty)
      onCreated?.()
      onClose()
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.userMessage ||
          'Could not create employee',
      )
    } finally {
      setSaving(false)
    }
  }

  const field = (key, label, type = 'text', required = true) => (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-slate-700">{label}</span>
      <input
        type={type}
        required={required}
        value={form[key]}
        onChange={set(key)}
        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
      />
    </label>
  )

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2 className="text-lg font-semibold">Add employee</h2>

        {field('employeeId', 'Employee ID')}
        {field('name', 'Full name')}
        {field('email', 'Email', 'email')}
        {field('department', 'Department')}
        {field('designation', 'Designation')}

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Status</span>
          <select
            value={form.status}
            onChange={set('status')}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}