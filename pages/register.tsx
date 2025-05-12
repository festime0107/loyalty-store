import CustomerForm from "@/components/CustomerForm";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  return (
    <Box sx={{ p: 3 }}>
      <CustomerForm />
      <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "center" }}>
        <Button variant="outlined" onClick={() => router.push("/purchase")}>
          Shko te Karta
        </Button>
        <Button variant="outlined" onClick={() => router.push("/costumers")}>
          Shko te Klientët
        </Button>
      </Box>
    </Box>
  );
}
