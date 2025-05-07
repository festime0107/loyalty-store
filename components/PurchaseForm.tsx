/* components/PurchaseForm.tsx */
import React, { useState, FormEvent, ChangeEvent } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'

export default function PurchaseForm() {
  const [cardNumber, setCard] = useState<string>('')
  const [product, setProduct] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(1)

  const handleBuy = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch('/api/purchases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cardNumber, product, quantity })
    })
    const data = await res.json()
    if (!res.ok) {
      alert(data.error || 'Gabim gjatë regjistrimit të blerjes.')
      return
    }
    const { total, discount } = data
    if (discount > 0) {
      alert(`Urime! Klienti ka bërë ${total} blerje dhe fiton 50% ulje për këtë produkt.`)
    } else {
      alert(`Blerja u regjistrua me sukses. Klienti ka bërë gjithsej ${total} blerje.`)
    }
    setCard('')
    setProduct('')
    setQuantity(1)
  }

  return (
    <Box component="form" onSubmit={handleBuy} sx={{ maxWidth: 400, mx: 'auto', p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" component="h2" align="center">Regjistro Blerje</Typography>
      <TextField label="Numri i Kartës" required value={cardNumber} onChange={(e: ChangeEvent<HTMLInputElement>) => setCard(e.target.value)} fullWidth />
      <TextField label="Produkti" required value={product} onChange={(e: ChangeEvent<HTMLInputElement>) => setProduct(e.target.value)} fullWidth /> <Button type="submit" variant="contained">Regjistro Blerje</Button>
    </Box>
  )
}