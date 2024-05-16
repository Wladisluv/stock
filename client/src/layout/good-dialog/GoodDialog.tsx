import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { observer } from "mobx-react-lite";
import categoryStore from "../../stores/categories-store";

import ActionsButton from "../actions-button/ActionsButton";
import CustomTextField from "../custom-text-field/CustomTextField";
import CustomDatePicker from "../custom-date-picker/CustomDatePicker";
import useCustomForm from "../../hooks/useCustomForm";
import Map from "../../pages/map/Map";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { MenuItem } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import styles from "./GoodDialog.module.scss";
import goodsStore from "../../stores/goods-store";

interface Props {
  modalFunction: string;
  goodId?: number;
  initialsValue?: [
    string,
    string,
    any, // Начальные значения для инпутов
    [number, number, string],
    [string, number?]
  ];
  updateLocation?: any;
}

const GoodDialog = observer(
  ({ modalFunction, goodId, initialsValue, updateLocation }: Props) => {
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedLoc, setSelectedLoc] = useState({
      lng: 0,
      lat: 0,
      loc: "",
    });
    const [selectedPos, setSelectedPos] = useState({
      id: 0,
      title: "",
    });
    const { firstNameRef, lastNameRef, inputErrors, handleFormSubmit } =
      useCustomForm(); // рефы и ошибки из хука формы
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleAddClose = () => {
      if (
        firstNameRef.current?.value !== "" &&
        lastNameRef.current?.value !== "" && // Проверка на незаполненные поля
        selectedDate !== null
      ) {
        setOpen(false);
      }
    };

    const handleChange = (newDate: Date | null) => {
      setSelectedDate(newDate);
    };

    const handleChangePos = (posId: number, posTitle: string) => {
      setSelectedPos({ id: posId, title: posTitle });
    };

    const handleMapClick = (mapData: {
      lng: number;
      lat: number;
      loc: string;
    }) => {
      const { lng, lat, loc } = mapData; // Сеттинг маркера

      setSelectedLoc({ lat, lng, loc });
      updateLocation?.(mapData);
    };

    useEffect(() => {
      return handleMapClick({
        lat: initialsValue?.[3][1]!,
        lng: initialsValue?.[3][0]!, // при монтировании обновляем начальные значения
        loc: initialsValue?.[3][2]!,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        {modalFunction === "add" ? (
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Добавить товар
          </Button>
        ) : (
          <ActionsButton
            editFoo={handleClickOpen}
            removedItem={() => goodsStore.deleteGood(goodId!)}
          />
        )}
        <Dialog
          className={styles.modal}
          classes={{ paper: styles.paper }}
          open={open}
          onClose={handleClose}
        >
          {!categoryStore.categories.length ? (
            <DialogContent sx={{ width: "400px", height: "190px" }}>
              <div className={styles.noPos}>
                <h2 style={{ marginBottom: "20px" }}>Категории не найдены</h2>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIosIcon />}
                  onClick={() => navigate("/categories")} // Если нет позиций перенаправляем на страницу для добавления
                >
                  Перейти к добавлению категорий
                </Button>
              </div>
            </DialogContent>
          ) : (
            <>
              <DialogContent sx={{ width: "800px", height: "600px" }}>
                <div className={styles.top}>
                  <div style={{ width: "370px" }}>
                    <CustomTextField
                      title={"First name"}
                      className={styles.textField}
                      error={
                        firstNameRef.current?.value === ""
                          ? inputErrors.firstName
                          : (inputErrors.firstName = "")
                      }
                      defaultValue={
                        modalFunction === "add" ? "" : initialsValue?.[0] // Если функция редактирования показываем текущее значение
                      }
                      focus
                      id={"name"}
                      label={"Good first name"}
                      type={"name"}
                      helperText={
                        inputErrors.firstName ? inputErrors.firstName : "" // Ставим хелпер в случае ошибки
                      }
                      inputRef={firstNameRef}
                    />
                  </div>
                  <div style={{ width: "370px", height: "121px" }}>
                    <CustomTextField
                      title={"Last name"}
                      className={styles.textField}
                      error={
                        lastNameRef.current?.value === ""
                          ? inputErrors.lastName
                          : (inputErrors.lastName = "")
                      }
                      defaultValue={
                        modalFunction === "add" ? "" : initialsValue?.[1]
                      }
                      id={"lastName"}
                      label={"Good last name"}
                      type={"name"}
                      helperText={
                        inputErrors.lastName ? inputErrors.lastName : ""
                      }
                      inputRef={lastNameRef}
                    />
                  </div>
                </div>
                <div className={styles.middle}>
                  <div style={{ maxWidth: "170px" }}>
                    <h2>Hire date</h2>
                    <CustomDatePicker
                      onChange={handleChange}
                      defaultValue={
                        modalFunction === "add" ? null : initialsValue?.[2]
                      }
                      error={
                        selectedDate === null
                          ? inputErrors.hireDate!
                          : (inputErrors.hireDate! = "")
                      }
                    />
                  </div>
                  <div style={{ marginLeft: "20px", width: "100%" }}>
                    <CustomTextField
                      title={"Category"}
                      className={styles.selectField}
                      select
                      id={"category title"}
                      helperText={"Please enter good category"}
                      type={"name"}
                      defaultValue={
                        modalFunction === "edit" ? initialsValue?.[4][0] : ""
                      }
                      onChange={(event) => {
                        const selectedPos = categoryStore.categories.find(
                          (category) => category.title === event.target.value // Если есть позиция ставим ее
                        );
                        if (selectedPos) {
                          handleChangePos(selectedPos?.id!, event.target.value);
                        }
                      }}
                    >
                      {categoryStore.categories.map(
                        (
                          category // Перебираем позиции для селекта
                        ) => (
                          <MenuItem key={category.id} value={category.title}>
                            {category.title}
                          </MenuItem>
                        )
                      )}
                    </CustomTextField>
                  </div>
                </div>
                <h2>Map</h2>
                <Map
                  mapCall="modal"
                  onMapClick={handleMapClick}
                  {...(modalFunction === "add"
                    ? null
                    : {
                        goodMarker: {
                          lng: initialsValue?.[3][0]!,
                          lat: initialsValue?.[3][1]!, // Инит значения для маркера при функции редактирования
                          address: initialsValue?.[3][2]!,
                        },
                      })}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="error">
                  Cancel
                </Button>
                <div
                  onClick={
                    modalFunction === "add" ? handleAddClose : handleClose
                  }
                >
                  <Button
                    type="submit"
                    onClick={
                      modalFunction === "add"
                        ? () =>
                            handleFormSubmit(
                              modalFunction,
                              selectedDate,
                              0, // Отдаем значения отсюда в форму
                              selectedLoc,
                              selectedPos?.id
                            )
                        : () =>
                            handleFormSubmit(
                              modalFunction,
                              selectedDate ? selectedDate : initialsValue?.[2],
                              goodId,
                              selectedLoc,
                              selectedPos?.id
                                ? selectedPos.id
                                : initialsValue?.[4][1]
                            )
                    }
                    variant="outlined"
                    color="success"
                  >
                    {modalFunction}
                  </Button>
                </div>
              </DialogActions>
            </>
          )}
        </Dialog>
      </>
    );
  }
);

export default GoodDialog;
