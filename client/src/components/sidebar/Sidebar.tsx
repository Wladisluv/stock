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

import styles from "./Sidebar.module.scss";
import { Factory, MonetizationOn } from "@mui/icons-material";

interface Props {
  open?: boolean;
  handleSidebarToggle?: () => void;
}

type Anchor = "left";

const Sidebar = ({ open, handleSidebarToggle }: Props) => {
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
            <Link to={links(text)} style={{ width: "100%", maxWidth: "200px" }}>
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
