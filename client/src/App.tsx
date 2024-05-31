import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth"; // Подключаем хук для работы с аутентификацией
import MainLayout from "./layout/main-layout/MainLayout";
import AuthLayout from "./layout/auth-layout/AuthLayout";
import Goods from "./pages/goods/Goods";
import Categories from "./pages/categories/Categories";
import Map from "./pages/map/Map";
import NotFound from "./pages/not-found/NotFound";

import "./utils/scss/global.scss";
import AuthPage from "./pages/authPage/AuthPage";
import Supply from "./pages/supplyPage/Supply";
import Manufacturer from "./pages/manufacturerPage/Manufacturer";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth(); // Получаем состояние аутентификации и загрузки

  // Если состояние загрузки, показываем загрузочный экран или что-то подобное
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Если пользователь аутентифицирован, показываем основной макет
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="goods" element={<Goods />} />
          <Route path="categories" element={<Categories />} />
          <Route path="about-us" element={<Map mapCall="page" />} />
          <Route path="supply" element={<Supply />} />
          <Route path="manufacturers" element={<Manufacturer />} />
          <Route path="" element={<Goods />} />{" "}
          {/** Роут работников в качестве основного **/}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    );
  }

  // Если пользователь не аутентифицирован, перенаправляем на страницу входа
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
};

export default App;
