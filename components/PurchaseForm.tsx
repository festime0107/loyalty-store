// components/PurchaseForm.tsx
import { useState, FormEvent, ChangeEvent } from "react"

export default function PurchaseForm() {
  const [cardNumber, setCard] = useState<string>("")
  const [product, setProduct] = useState<string>("")

  // Tipizojmë event-in e formës
  const handleBuy = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch("/api/purchases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardNumber, product }),
    })
    const { discount } = await res.json()
    if (discount > 0) {
      alert("Urime! 50% zbritje për këtë produkt!")
    } else {
      alert("Blerja u regjistrua me sukses.")
    }
  }

  // Tipizojmë event-in e input-ëve
  const handleCardChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCard(e.target.value)
  }

  const handleProductChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct(e.target.value)
  }

  return (
    <form onSubmit={handleBuy}>
      <input
        placeholder="Numri i kartës"
        required
        value={cardNumber}
        onChange={handleCardChange}
      />
      <input
        placeholder="Produkti"
        required
        value={product}
        onChange={handleProductChange}
      />
      <button type="submit">Regjistro Blerje</button>
    </form>
  )
}
