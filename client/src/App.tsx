import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layout/main-layout/MainLayout";
import AuthLayout from "./layout/auth-layout/AuthLayout"; // Импортируем AuthLayout
import Goods from "./pages/goods/Goods";
import Categories from "./pages/categories/Categories";
import Map from "./pages/map/Map";
import NotFound from "./pages/not-found/NotFound";
import categoriesStore from "./stores/categories-store";
import AuthPage from "./pages/authPage/AuthPage";

import "./utils/scss/global.scss";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    categoriesStore.loadCategories();
    const userAuthenticated = false;
    setIsAuthenticated(userAuthenticated);
  }, []);

  // Если пользователь не аутентифицирован, показываем страницу авторизации
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<AuthLayout />}>
          <Route path="/login" element={<AuthPage />} />{" "}
          {/* Показываем AuthPage */}
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />{" "}
        {/* Перенаправляем все другие маршруты на страницу входа */}
      </Routes>
    );
  }

  // Если пользователь аутентифицирован, показываем основной макет
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="goods" element={<Goods />} />
          <Route path="categories" element={<Categories />} />
          <Route path="about-us" element={<Map mapCall="page" />} />
          <Route path="" element={<Goods />} />{" "}
          {/** Роут работников в качестве основного **/}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
