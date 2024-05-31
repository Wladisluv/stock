import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Успешная аутентификация
        // Сохранение токена в состоянии или локальном хранилище
        localStorage.setItem("token", email);
        // Перенаправление пользователя на защищенную страницу
        window.location.href = "/goods";
      } else {
        // Ошибка аутентификации
        setError(data.error);
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
    }
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
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
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
