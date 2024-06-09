import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkIcon from "@mui/icons-material/Work";
import PublicIcon from "@mui/icons-material/Public";
import LogoutIcon from "@mui/icons-material/Logout";  // Import the Logout icon
import styles from "./Sidebar.module.scss";
import { Factory, MonetizationOn } from "@mui/icons-material";

interface Props {
  open?: boolean;
  handleSidebarToggle?: () => void;
}

type Anchor = "left";

const Sidebar = ({ open, handleSidebarToggle }: Props) => {
  const handleLogout = () => {
    // Remove specific data from localStorage
    localStorage.removeItem("token");  // example item
    window.location.href = "/login";
  };

  const links = (text: string) => {
    if (text.toLowerCase() === "товары и материалы") {
      text = "goods";
    } else if (text.toLowerCase() === "о нас") {
      text = "about-us";
    } else if (text.toLowerCase() === "категории") {
      text = "categories";
    } else if (text.toLowerCase() === "заявки") {
      text = "supply";
    } else if (text.toLowerCase() === "производители") {
      text = "manufacturers";
    }

    console.log("text", text);
    return text;
  };

  const icons = [
    AccountCircleIcon,
    WorkIcon,
    MonetizationOn,
    Factory,
    PublicIcon,
  ];

  const list = (anchor: Anchor) => (
    <>
      <div className={styles.title}>
        <h1>Сток</h1>
      </div>
      <Divider sx={{ bgcolor: "#8D8D8D" }} />
      <List className={styles.list}>
        {[
          "Товары и материалы",
          "Категории",
          "Заявки",
          "Производители",
          "О нас",
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link to={links(text)} style={{ width: "100%", maxWidth: "250px" }}>
              <ListItemButton onClick={handleSidebarToggle}>
                <ListItemIcon style={{ color: "#fff" }}>
                  {React.createElement(icons[index])}
                </ListItemIcon>
                <ListItemText primary={text} className={styles.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ bgcolor: "#8D8D8D", marginTop: "auto" }} />
      <List className={styles.list}>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout} style={{ color: "#fff" }}>
            <ListItemIcon style={{ color: "#fff" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Выйти" className={styles.text} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <Box className={styles.sidebar}>
      <Drawer
        variant={window.innerWidth > 1024 ? "permanent" : "temporary"}
        classes={{ paper: styles.sidebar }}
        open={open}
        onClose={handleSidebarToggle}
      >
        {list("left")}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
