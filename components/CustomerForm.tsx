/* components/CustomerForm.tsx */
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'

interface FormState {
  name: string
  birthdate: string
  email: string
  cardNumber: string
}

export default function CustomerForm() {
  const [form, setForm] = useState<FormState>({ name: '', birthdate: '', email: '', cardNumber: '' })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (res.ok) {
      alert('Klienti u regjistrua me sukses!')
      setForm({ name: '', birthdate: '', email: '', cardNumber: '' })
    } else {
      alert(data.error || 'Gabim gjatë regjistrimit.')
    }
  }

  const handleChange = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" component="h2" align="center">Regjistro Klient</Typography>
      <TextField label="Emri" required value={form.name} onChange={handleChange('name')} fullWidth />
      <TextField label="Data Lindjes" type="date" required value={form.birthdate} onChange={handleChange('birthdate')} InputLabelProps={{ shrink: true }} fullWidth />
      <TextField label="Email" type="email" required value={form.email} onChange={handleChange('email')} fullWidth />
      <TextField label="Numri i Kartës" required value={form.cardNumber} onChange={handleChange('cardNumber')} fullWidth />
      <Button type="submit" variant="contained">Regjistro Klient</Button>
    </Box>
  )
}
