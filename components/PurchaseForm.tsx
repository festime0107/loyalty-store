/* components/PurchaseForm.tsx */
import React, { useState, FormEvent, ChangeEvent } from 'react'
import { Box, TextField, Button, Typography, IconButton } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

export default function PurchaseForm() {
  const [cardNumber, setCard] = useState<string>('')
  const [products, setProducts] = useState<string[]>([''])

  // Add a new product field
  const addProductField = () => {
    setProducts((prev) => [...prev, ''])
  }

  // Remove a product field by index
  const removeProductField = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index))
  }

  // Update product name at index
  const handleProductChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setProducts((prev) => prev.map((p, i) => (i === index ? value : p)))
  }

  const handleBuy = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Filter out empty entries
    const items = products.filter((p) => p.trim())
    if (!cardNumber || items.length === 0) {
      alert('Ju lutem plotësoni numrin e kartës dhe të paktën një produkt.')
      return
    }
    const res = await fetch('/api/purchases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cardNumber, products: items })
    })
    const data = await res.json()
    if (!res.ok) {
      alert(data.error || 'Gabim gjatë regjistrimit të blerjeve.')
      return
    }
    const { total, discount } = data
    if (discount > 0) {
      alert(`Urime! Klienti ka bërë ${total} blerje dhe fiton 50% ulje për këtë seri produkte.`)
    } else {
      alert(`Blerjet u regjistruan me sukses. Klienti ka bërë gjithsej ${total} blerje.`)
    }
    // Reset form
    setCard('')
    setProducts([''])
  }

  return (
    <Box component="form" onSubmit={handleBuy} sx={{ maxWidth: 500, mx: 'auto', p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" component="h2" align="center">Regjistro Blerje</Typography>
      <TextField
        label="Numri i Kartës"
        required
        value={cardNumber}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setCard(e.target.value)}
        fullWidth
      />
      {products.map((prod, idx) => (
        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            label={`Produkti ${idx + 1}`}
            required
            value={prod}
            onChange={handleProductChange(idx)}
            fullWidth
          />
          {products.length > 1 && (
            <IconButton onClick={() => removeProductField(idx)}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          )}
        </Box>
      ))}
      <Button
        startIcon={<AddCircleOutlineIcon />}
        onClick={addProductField}
        sx={{ alignSelf: 'flex-start' }}
      >
        Shto Produkt
      </Button>
      <Button type="submit" variant="contained">Regjistro Blerje</Button>
    </Box>
  )
}
