// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import categoryStore from "../../stores/categories-store";
import goodsStore from "../../stores/goods-store";
import manufacturerStore from "../../stores/manufacturers-store"; // Добавьте импорт хранилища производителей

import ActionsButton from "../actions-button/ActionsButton";
import CustomTextField from "../custom-text-field/CustomTextField";
import CustomDatePicker from "../custom-date-picker/CustomDatePicker";
import Map from "../../pages/map/Map";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { MenuItem } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import styles from "./GoodDialog.module.scss";

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
    const [open, setOpen] = useState(false);

    const [title, setTitle] = useState<string>("");
    const [categoryId, setCategoryId] = useState<any>(null);
    const [price, setPrice] = useState<number>(0);
    const [manufacturerId, setManufacturerId] = useState<any>(null);
    const [amount, setAmount] = useState<any>(0);
    const [characteristic, setCharacteristic] = useState<any>("");

    const handleClickOpen = () => {
      setOpen(true);
      if (modalFunction === "edit" && goodId) {
        const good = goodsStore.goods.find((g) => g.id === goodId);
        if (good) {
          setTitle(good.title);
          setCharacteristic(good.characteristic);
          setCategoryId(good.category_id);
          setManufacturerId(good.manufacturer_id);
          setPrice(good.price);
          setAmount(good.amount);
        }
      }
    };

    console.log("initialsValue", initialsValue);

    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = async () => {
      const newGood = {
        title,
        category_id: categoryId,
        price,
        manufacturer_id: manufacturerId,
        amount,
        characteristic,
      };

      if (modalFunction === "add") {
        await goodsStore.addGood(newGood);
      } else {
        await goodsStore.updateGood(goodId!, newGood);
      }

      handleClose();
    };

    const handleMapClick = (mapData: {
      lng: number;
      lat: number;
      loc: string;
    }) => {
      updateLocation?.(mapData);
    };

    useEffect(() => {
      if (initialsValue) {
      }
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
                  onClick={() => navigate("/categories")}
                >
                  Перейти к добавлению категорий
                </Button>
              </div>
            </DialogContent>
          ) : (
            <>
              <DialogContent sx={{ width: "800px", height: "600px" }}>
                <div className={styles.top}>
                  <div style={{ width: "700px" }}>
                    <CustomTextField
                      title={"Название"}
                      className={styles.textField}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      focus
                      id={"name"}
                      label={"Название товара"}
                      type={"name"}
                    />
                  </div>
                  <div
                    style={{
                      width: "200px",
                      height: "121px",
                      marginLeft: "10px",
                    }}
                  >
                    <CustomTextField
                      title={"Цена"}
                      className={styles.textField}
                      value={price}
                      onChange={(e) => setPrice(parseFloat(e.target.value))}
                      id={"price"}
                      label={"Цена товара"}
                      type={"number"}
                    />
                  </div>
                  <div
                    style={{
                      width: "200px",
                      height: "121px",
                      marginLeft: "10px",
                    }}
                  >
                    <CustomTextField
                      title={"Количество"}
                      className={styles.textField}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      id={"amount"}
                      label={"Количество на складе"}
                      type={"number"}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: "500px",
                    height: "100px",
                    marginLeft: "0px",
                  }}
                >
                  <CustomTextField
                    title={"Характеристики"}
                    className={styles.textField}
                    value={characteristic}
                    onChange={(e) => setCharacteristic(e.target.value)}
                    id={"characteristic"}
                    label={"Характеристики товара"}
                    type={"name"}
                  />
                </div>
                <div className={styles.middle}>
                  <div style={{ marginLeft: "0px", width: "100%" }}>
                    <CustomTextField
                      title={"Категория"}
                      className={styles.selectField}
                      select
                      id={"category title"}
                      helperText={"Пожалуйста, введите категорию товара"}
                      type={"name"}
                      value={categoryId}
                      onChange={(event) => setCategoryId(event.target.value)}
                    >
                      {categoryStore.categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.title}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  </div>
                  <div style={{ marginLeft: "20px", width: "100%" }}>
                    <CustomTextField
                      title={"Производитель"}
                      className={styles.selectField}
                      select
                      id={"manufacturer title"}
                      helperText={"Пожалуйста, введите производителя товара"}
                      type={"name"}
                      value={manufacturerId}
                      onChange={(event) =>
                        setManufacturerId(event.target.value)
                      }
                    >
                      {manufacturerStore.manufacturers.map((manufacturer) => (
                        <MenuItem key={manufacturer.id} value={manufacturer.id}>
                          {manufacturer.title}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  </div>
                </div>
                <h2>Map</h2>
                <Map mapCall="modal" />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="error">
                  Отмена
                </Button>
                <Button
                  onClick={handleSubmit}
                  variant="outlined"
                  color="success"
                >
                  {modalFunction === "add" ? "Добавить" : "Редактировать"}
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </>
    );
  }
);

export default GoodDialog;
