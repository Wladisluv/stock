import { useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import CustomTextField from "../custom-text-field/CustomTextField";
import ActionsButton from "../actions-button/ActionsButton";
import { ICategory } from "../../interfaces/category.interface";
import {
  Alert,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import styles from "./SupplyDialog.module.scss";
import CustomDatePicker from "../custom-date-picker/CustomDatePicker";
import providersStore from "../../stores/providers-store";
import suppliesStore from "../../stores/supplies-store";
import { ISupply } from "../../interfaces/supply.interface";

interface Props {
  modalFunction: string;
  supplyId?: number;
  initCategoryTitle?: string;
}

const SupplyDialog = observer(
  ({ modalFunction, supplyId, initCategoryTitle }: Props) => {
    const [supply, setSupply] = useState<ISupply>({
      good_title: "Видеокарта Geforce RTX 3060",
      amount: 5,
      provider_id: 0,
      supply_date: "19-04-2024",
      title: "Саратов PC",
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

    if (alertOpen === true) {
      setTimeout(() => {
        setAlertOpen(false); // Закрываем ошибку через 3 секунды
      }, 3000);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value !== "") {
        // Проверяем на пустой инпут
        setSupply({
          ...supply,
          title: event.target.value,
        });
      }
    };

    const handleSupplySend = () => {
      if (supply.title !== "") {
        modalFunction === "add"
          ? suppliesStore.addSupply(supply)
          : suppliesStore.updateSupply(supplyId!, supply);

        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    useEffect(() => {
      if (!suppliesStore.supplies.length) {
        setOpen(true);
      }
    }, []);

    const handleRemoveItem = async () => {
      try {
        await suppliesStore.deleteSupply(supplyId!);
        setOpen(false);
      } catch (error) {
        console.error("Error deleting category:", error); // Если есть работники с выбранной для
        setAlertOpen(true); // удаления позицией выбрасываем ошибку
        setError(
          "Error deleting the category. There are workers with this category"
        );
      }
    };

    const [selectedProvider, setSelectedProvider] = useState({
      id: 0,
      title: "",
    });

    const handleChangeProvider = (
      providerId: number,
      providerTitle: string
    ) => {
      setSelectedProvider({ id: providerId, title: providerTitle });
    };

    const providers = [
      { id: 1, title: "ХИММАШ-БУМАГА" },
      { id: 2, title: "Приборостроение Краснодар" },
      { id: 3, title: "Саратов PC" },
    ];

    return (
      <>
        {
          <Collapse in={alertOpen}>
            <Alert
              className={styles.alert}
              severity="error"
              onClose={() => setAlertOpen(false)} // Сама ошибка с кнопкной для закрытия
            >
              {error}
            </Alert>
          </Collapse>
        }
        {modalFunction === "add" ? ( // Показ кнопок в соответствии с функцией диалога
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
          {modalFunction === "add" ? (
            <DialogContent sx={{ width: "800px", height: "100%" }}>
              <CustomTextField
                title={"Создание заявки"}
                focus
                id={"category title"}
                label="Название товара"
                type={"name"}
                className={`${styles.textField}`}
                onChange={onChange}
              />
              <CustomTextField
                title={""}
                focus
                id={"category title"}
                label="Количество"
                type={"name"}
                className={`${styles.textField}`}
                onChange={onChange}
              />
              <CustomTextField
                title={"Категория"}
                className={styles.selectField}
                select
                id={"category title"}
                helperText={"Please enter good category"}
                type={"name"}
                onChange={(event) => {
                  const selectedProv = providers.find(
                    (provider) => provider.title === event.target.value // Если есть позиция ставим ее
                  );
                  if (selectedProv) {
                    handleChangeProvider(
                      selectedProvider?.id!,
                      event.target.value
                    );
                  }
                }}
              >
                {providers.map(
                  (
                    provider // Перебираем позиции для селекта
                  ) => (
                    <MenuItem key={provider.id} value={provider.title}>
                      {provider.title}
                    </MenuItem>
                  )
                )}
              </CustomTextField>
              <CustomDatePicker />
            </DialogContent>
          ) : (
            <DialogContent sx={{ width: "800px", height: "120px" }}>
              <CustomTextField
                title={"Current category"}
                focus
                id={"name"}
                defaultValue={initCategoryTitle}
                onChange={onChange}
                className={`${styles.textField}`}
                type={"name"}
              />
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="error">
              Отмена
            </Button>
            <Button
              onClick={handleSupplySend}
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

export default SupplyDialog;
