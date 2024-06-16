import { useEffect } from "react";

import { observer } from "mobx-react-lite";

import { Divider } from "@mui/material";

import styles from "./Manufacturer.module.scss";
import manufacturersStore from "../../stores/manufacturers-store";
import ManufacturerDialog from "../../layout/manufacturer-dialog/ManufacturerDialog";

const Manufacturer = observer(() => {
  useEffect(() => {
    manufacturersStore.loadManufacturers();
  }, []);

  return (
    <>
      <div className={styles.top}>
        <div>
          <h1 className={styles.mainText}>Производители</h1>
        </div>
        <div>
          <ManufacturerDialog modalFunction="add" />
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.mainTop}>
          <div>ПОСТАВЩИК</div>
          <div style={{ marginLeft: "80px" }}>СТРАНА</div>
          <div style={{ marginRight: "-200px" }}>EMAIL</div>
          <div style={{ textAlign: "end" }}>ДЕЙСТВИЯ</div>
        </div>
        <Divider
          sx={{
            marginTop: "10px",
            marginLeft: "-20px",
            marginRight: "-20px",
          }}
          className={styles.divider}
        />
        {manufacturersStore.manufacturers.length === 0 ? (
          <h2 className={styles.stub}>Производители не найдены 🔎</h2>
        ) : (
          manufacturersStore?.manufacturers?.map((manufacturer) => {
            return (
              <div className={styles.contentItem} key={manufacturer.id}>
                <div className={styles.contentInner}>
                  <div>{manufacturer.title}</div>
                  <div>{"Россия"}</div>
                  <div>{manufacturer.email}</div>
                  <div
                    className={styles.btn}
                  >
                    <ManufacturerDialog
                      modalFunction="edit"
                      categoryId={manufacturer.id}
                      initCategoryTitle={manufacturer.title}
                    />
                  </div>
                </div>
                <Divider sx={{ marginTop: "10px" }} />
              </div>
            );
          })
        )}
      </div>
    </>
  );
});

export default Manufacturer;
