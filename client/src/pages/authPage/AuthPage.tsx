import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Добавьте здесь логику для отправки данных авторизации
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div style={{ maxWidth: "300px", margin: "0 auto" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        color="black"
        fontWeight="bold"
      >
        Авторизация
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Пароль"
          type="password"
          variant="outlined"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          Войти
        </Button>
      </form>
    </div>
  );
};

export default AuthPage;
