import { useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import categoriesStore from "../../stores/categories-store";

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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import styles from "./CategoryDialog.module.scss";

interface Props {
  modalFunction: string;
  categoryId?: number;
  initCategoryTitle?: string;
}

const CategoryDialog = observer(
  ({ modalFunction, categoryId, initCategoryTitle }: Props) => {
    const [category, setCategory] = useState<ICategory>({
      title: "",
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
        setCategory({
          ...category,
          title: event.target.value,
        });
      }
    };

    const handleCategorySend = () => {
      if (category.title !== "") {
        modalFunction === "add"
          ? categoriesStore.addCategory(category)
          : categoriesStore.updateCategory(categoryId!, category);

        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    useEffect(() => {
      if (!categoriesStore.categories.length) {
        setOpen(true);
      }
    }, []);

    const handleRemoveItem = async () => {
      try {
        await categoriesStore.deleteCategory(categoryId!);
        setOpen(false);
      } catch (error) {
        console.error("Error deleting category:", error); // Если есть работники с выбранной для
        setAlertOpen(true); // удаления позицией выбрасываем ошибку
        setError(
          "Error deleting the category. There are workers with this category"
        );
      }
    };

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
            Добавить категорию
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
            <DialogContent sx={{ width: "800px", height: "120px" }}>
              <CustomTextField
                title={"Добавление категории"}
                focus
                id={"category title"}
                label="Название категории"
                type={"name"}
                className={`${styles.textField}`}
                onChange={onChange}
              />
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
              onClick={handleCategorySend}
              variant="outlined"
              color="success"
            >
              {modalFunction === "add" ? "Добавить" : "Редактировать"}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);

export default CategoryDialog;
