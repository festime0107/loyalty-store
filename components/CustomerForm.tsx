// components/CustomerForm.tsx
import { useState, ChangeEvent, FormEvent } from "react"

interface FormState { name: string; birthdate: string; email: string; cardNumber: string }

export default function CustomerForm() {
  const [form, setForm] = useState<FormState>({ name: "", birthdate: "", email: "", cardNumber: "" })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (res.ok) {
      alert("Klienti u regjistrua me sukses!")
    } else {
      alert(data.error || "Gabim gjatë regjistrimit.")
    }
  }

  const handleChange = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Emri" required onChange={handleChange("name")} />
      <input type="date" placeholder="Data lindjes" required onChange={handleChange("birthdate")} />
      <input type="email" placeholder="Email" required onChange={handleChange("email")} />
      <input placeholder="Numri i kartës" required onChange={handleChange("cardNumber")} />
      <button type="submit">Regjistro Klient</button>
    </form>
  )
}
