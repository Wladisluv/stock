import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "./Header.module.scss";
import { IconButton } from "@mui/material";

type Props = {
  isAuthPage?: boolean;
};

const Header = ({ isAuthPage = false }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.header}>
      <div className={styles.items}>
        {isAuthPage ? null : (
          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleSidebarToggle}
            >
              <MenuIcon />
            </IconButton>
          </div>
        )}
        <div>
          <h2>{isAuthPage ? "Сток" : "vladvavula@gmail.com"}</h2>
        </div>
      </div>
      {isAuthPage ? null : (
        <Sidebar open={sidebarOpen} handleSidebarToggle={handleSidebarToggle} />
      )}
    </div>
  );
};

export default Header;
