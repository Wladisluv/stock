import { useEffect } from "react";

import { observer } from "mobx-react-lite";

import { Divider } from "@mui/material";

import styles from "./Supply.module.scss";
import SupplyDialog from "../../layout/supply-dialog/SupplyDialog";
import suppliesStore from "../../stores/supplies-store";
import dayjs from "dayjs";

const Supply = observer(() => {
  useEffect(() => {
    suppliesStore.loadSupplies();
  }, []);

  return (
    <>
      <div className={styles.top}>
        <div>
          <h1>Заявки</h1>
        </div>
        <div>
          <SupplyDialog modalFunction="add" />
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.mainTop}>
          <div>ЗАЯВКА</div>
          <div style={{ marginLeft: "180px" }}>АЙДИ ПОСТАВЩИКА</div>
          <div style={{ marginLeft: "130px" }}>ДАТА ПОСТАВКИ</div>
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
        {suppliesStore.supplies.length === 0 ? (
          <h2 className={styles.stub}>Заявки не найдены 🔎</h2>
        ) : (
          suppliesStore?.supplies?.map((supply) => {
            return (
              <div className={styles.contentItem} key={supply.id}>
                <div className={styles.contentInner}>
                  <div>{supply.good_title}</div>
                  <div>{supply.amount}</div>
                  <div>{supply.supply_date.slice(0, 10)}</div>
                  <div
                    style={{
                      textAlign: "end",
                      marginTop: "-10px",
                    }}
                  >
                    <SupplyDialog
                      modalFunction="edit"
                      supplyId={supply.id}
                      initCategoryTitle={supply.title}
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

export default Supply;
