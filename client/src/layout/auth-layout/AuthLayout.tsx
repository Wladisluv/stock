import { Outlet } from "react-router-dom";

import Header from "../../components/header/Header";
import { Box } from "@mui/material";

import styles from "./AuthLayout.module.scss";

const AuthLayout = () => {
  // Используем как обертку над всеми страницами
  return (
    <div>
      <Header isAuthPage={true} />
      <div>
        <Box
          sx={{
            position: "fixed",
            top: "111px",
            right: "20px",
            left: "20px",
            bottom: "20px",
            borderRadius: "25px",
            backgroundColor: "#fff",
            "@media (max-width: 1024px)": {
              left: "20px",
              right: "20px",
            },
          }}
        >
          <div className={styles.inner}>
            <Outlet />
          </div>
        </Box>
      </div>
    </div>
  );
};

export default AuthLayout;
