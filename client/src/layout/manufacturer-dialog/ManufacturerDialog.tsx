import { useEffect, useState } from "react";

import { observer } from "mobx-react-lite";

import CustomTextField from "../custom-text-field/CustomTextField";
import ActionsButton from "../actions-button/ActionsButton";
import { IManufacturer } from "../../interfaces/manufacturer.interface";
import {
  Alert,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import styles from "./ManufacturerDialog.module.scss";
import manufacturersStore from "../../stores/manufacturers-store";

interface Props {
  modalFunction: string;
  categoryId?: number;
  initCategoryTitle?: string;
}

const ManufacturerDialog = observer(
  ({ modalFunction, categoryId, initCategoryTitle }: Props) => {
    const [manufacturer, setManufacturer] = useState<IManufacturer>({
      title: "",
      country_id: 3,
      email: "",
    });

    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
      if (alertOpen) {
        const timer = setTimeout(() => {
          setAlertOpen(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [alertOpen]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setManufacturer((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleManufacturerSend = () => {
      if (manufacturer.title !== "") {
        if (modalFunction === "add") {
          manufacturersStore.addManufacturer(manufacturer);
        } else {
          manufacturersStore.updateManufacturer(categoryId!, manufacturer);
        }
        setOpen(false);
      } else {
        setAlertOpen(true);
        setError("Название поставщика не может быть пустым");
      }
    };

    useEffect(() => {
      if (!manufacturersStore.manufacturers.length) {
        setOpen(true);
      }
    }, []);

    const handleRemoveItem = async () => {
      try {
        await manufacturersStore.deleteManufacturer(categoryId!);
        setOpen(false);
      } catch (error) {
        console.error("Error deleting manufacturer:", error);
        setAlertOpen(true);
        setError(
          "Ошибка при удалении поставщика. Убедитесь, что нет связанных данных."
        );
      }
    };

    return (
      <>
        <Collapse in={alertOpen}>
          <Alert
            className={styles.alert}
            severity="error"
            onClose={() => setAlertOpen(false)}
          >
            {error}
          </Alert>
        </Collapse>
        {modalFunction === "add" ? (
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Создать заявку
          </Button>
        ) : (
          <ActionsButton
            editFoo={handleClickOpen}
            removedItem={handleRemoveItem}
          />
        )}
        <Dialog
          className={styles.modal}
          classes={{ paper: styles.paper }}
          open={open}
          onClose={handleClose}
        >
          <DialogContent sx={{ width: "800px", height: "100%" }}>
            <CustomTextField
              title="Название поставщика"
              focus
              id="manufacturer-title"
              label="Поставщик"
              type="text"
              className={styles.textField}
              onChange={onChange}
              value={manufacturer.title}
            />
            <CustomTextField
              title="Страна"
              focus
              id="manufacturer-country"
              label="Страна"
              type="number"
              className={styles.textField}
              onChange={onChange}
              value={manufacturer.country_id}
            />
            <CustomTextField
              title="Email"
              focus
              id="manufacturer-email"
              label="Email"
              type="email"
              className={styles.textField}
              onChange={onChange}
              value={manufacturer.email}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="error">
              Отмена
            </Button>
            <Button
              onClick={handleManufacturerSend}
              variant="outlined"
              color="success"
            >
              {modalFunction === "add" ? "Создать" : "Редактировать"}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);

export default ManufacturerDialog;
