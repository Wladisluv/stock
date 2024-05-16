import { Dialog, DialogContent } from "@mui/material";

import styles from "./GoodAboutPopup.module.scss";
import { IGood } from "../../interfaces/good.interface";

interface Props {
  good: IGood;
  open: boolean;
  close: () => void;
}

const GoodAboutPopup = ({ good, open, close }: Props) => {
  return (
    <>
      <Dialog
        className={styles.modal}
        classes={{ paper: styles.paper }}
        open={open}
        onClose={close}
      >
        <DialogContent sx={{ width: "290px" }}>
          <div className={styles.about}>
            <div className={styles.item}>
              <p>Good name:</p>
              {good.firstName} {good.lastName}
            </div>
            <div className={styles.item}>
              <p>Good category:</p>
              {good.category?.title} {good.hireDate}
            </div>
            <div className={styles.item}>
              <p>Good address:</p>
              {good.location?.title}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GoodAboutPopup;
