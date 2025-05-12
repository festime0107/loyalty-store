import PurchaseForm from "@/components/PurchaseForm";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

export default function Purchase() {
  const router = useRouter();

  return (
    <Box sx={{ p: 3 }}>
      <PurchaseForm />
      <Box sx={{ mt: 4, display: "flex", gap: 2 ,marginLeft:'590px'}}>
        <Button variant="outlined" onClick={() => router.back()}>
          Kthehu
        </Button>
        <Button variant="outlined" onClick={() => signOut({ callbackUrl: "/login" })}>
          Dil nga sistemi
        </Button>
      </Box>
    </Box>
  );
}
