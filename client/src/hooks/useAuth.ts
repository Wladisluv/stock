import { useState, useEffect } from "react";

// Здесь ваша логика проверки аутентификации, например, с помощью токена аутентификации
const checkAuthentication = () => {
  const token = localStorage.getItem("token"); // Получаем токен из localStorage или сессии
  // Проверяем, существует ли токен и не истек ли он
  return !!token; // Возвращаем true, если токен существует и не истек, и false в противном случае
};

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Состояние аутентификации
  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки

  useEffect(() => {
    const isAuthenticated = checkAuthentication(); // Проверяем аутентификацию
    setIsAuthenticated(isAuthenticated); // Устанавливаем состояние аутентификации
    setIsLoading(false); // Завершаем загрузку
  }, []);

  return { isAuthenticated, isLoading }; // Возвращаем состояния аутентификации и загрузки
};

export default useAuth;
