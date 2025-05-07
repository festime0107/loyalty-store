// pages/customers.tsx
import { useEffect, useState } from "react"

interface Purchase { id: string; date: string; product: string }
interface Customer {
  id: string
  name: string
  email: string
  cardNumber: string
  purchases: Purchase[]
}

export default function CustomersPage() {
  const [data, setData] = useState<Customer[]>([])
  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then(setData)
  }, [])

  return (
    <main style={{ padding: 20 }}>
      <h1>Lista e Klientëve & Blerjeve</h1>
      {data.length === 0 ? (
        <p>Nuk ka klientë të regjistruar.</p>
      ) : (
        <table border={1} cellPadding={8} style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Emër</th>
              <th>Email</th>
              <th>Card #</th>
              <th>#Blerjeve</th>
              <th>Historiku Blerjeve</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.cardNumber}</td>
                <td>{c.purchases.length}</td>
                <td>
                  <ul>
                    {c.purchases.map((p) => (
                      <li key={p.id}>
                        {new Date(p.date).toLocaleDateString()}: {p.product}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}
