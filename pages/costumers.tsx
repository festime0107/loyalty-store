/* pages/customers.tsx */
import React, { useEffect, useState } from 'react'
import { Box, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

interface Purchase { id: string; date: string; product: string }
interface Customer { id: string; name: string; email: string; cardNumber: string; purchases: Purchase[] }

export default function CustomersPage() {
  const [data, setData] = useState<Customer[]>([])
  useEffect(() => {
    fetch('/api/customers')
      .then((res) => res.json())
      .then(setData)
  }, [])

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Lista e Klientëve & Blerjeve</Typography>
      {data.length === 0 ? (
        <Typography>Nuk ka klientë të regjistruar.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Emër</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Card #</TableCell>
                <TableCell>#Blerjeve</TableCell>
                <TableCell>Historiku Blerjeve</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.cardNumber}</TableCell>
                  <TableCell>{c.purchases.length}</TableCell>
                  <TableCell>
                    <ul style={{ margin: 0, paddingLeft: 16 }}>
                      {c.purchases.map((p) => (
                        <li key={p.id}>{new Date(p.date).toLocaleDateString()}: {p.product}</li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}