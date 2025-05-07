// components/PurchaseForm.tsx
import { useState, FormEvent, ChangeEvent } from "react"

export default function PurchaseForm() {
  const [cardNumber, setCard] = useState("")
  const [product, setProduct] = useState("")

  const handleBuy = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch("/api/purchases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardNumber, product }),
    })
    const data = await res.json()
    if (!res.ok) {
      alert(data.error || "Gabim gjatë regjistrimit të blerjes.")
      return
    }
    const { total, discount } = data
    if (discount > 0) {
      alert(`Urime! Klienti ka bërë ${total} blerje dhe fiton 50% ulje për këtë produkt.`)
    } else {
      alert(`Blerja u regjistrua me sukses. Klienti ka bërë gjithsej ${total} blerje.`)
    }
  }

  return (
    <form onSubmit={handleBuy}>
      <input placeholder="Numri i kartës" required value={cardNumber} onChange={(e) => setCard(e.target.value)} />
      <input placeholder="Produkti" required value={product} onChange={(e) => setProduct(e.target.value)} />
      <button type="submit">Regjistro Blerje</button>
    </form>
  )
}
