// pages/login.tsx
import React, { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password
    });
    if (res?.ok) {
        router.push("/register");
    } else {
      alert("Email ose fjalëkalim i pasaktë");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: 1,
        borderRadius: 2
      }}
    >
      <Typography variant="h5" align="center">
        Hyr në sistem
      </Typography>

      <TextField
        label="Email"
        type="email"
        required
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Fjalëkalimi"
        type="password"
        required
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" variant="contained" fullWidth>
        Hyr
      </Button>
    </Box>
  );
}
