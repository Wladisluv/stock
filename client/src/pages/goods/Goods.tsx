import { useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import goodsStore from "../../stores/goods-store";

import { useSearchGoods } from "../../hooks/useSearchGoods";
import GoodDialog from "../../layout/good-dialog/GoodDialog";
import dayjs from "dayjs";
import { Divider, InputAdornment, OutlinedInput, Tooltip } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";

import styles from "./Goods.module.scss";
import GoodAboutPopup from "../../layout/good-about-popup/GoodAboutPopup";
import { IGood } from "../../interfaces/good.interface";

const Goods = observer(() => {
  const [query, setQuery] = useState("");
  const [aboutEmpOpen, setAboutEmpOpen] = useState(false);

  useEffect(() => {
    goodsStore.loadGoods();
  }, []);

  const searchedGoods = useSearchGoods(query);

  const handleAboutEmpClose = () => {
    setAboutEmpOpen(false);
  };

  return (
    <>
      <div className={styles.top}>
        <div>
          <h1>Товары и материалы</h1>
        </div>
        <div>
          <GoodDialog modalFunction="add" />
        </div>
      </div>
      <OutlinedInput
        className={styles.search}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ width: "360px", marginTop: "20px" }}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
        type="search"
        placeholder="Поиск товаров"
      />
      {window.innerWidth > 770 ? (
        <>
          <div className={styles.main}>
            <div className={styles.mainTop}>
              <div>КАТЕГОРИЯ</div>
              <div>НАЗВАНИЕ</div>
              <div>ХАРАКТЕРИСТИКИ</div>
              <div>ЦЕНА</div>
              <div>КОЛИЧЕСТВО</div>
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
            {goodsStore.goods.length === 0 ? (
              <h2 className={styles.stub}>Товары и материалы не найдены 🔎</h2>
            ) : (
              searchedGoods.map((good: IGood) => {
                return (
                  <div className={styles.contentItem} key={good.id}>
                    <div className={styles.contentInner}>
                      <div>{`${good.firstName} ${good.lastName}`}</div>
                      <div>{good.category?.title}</div>
                      <div>{good.hireDate}</div>
                      <Tooltip title={good.location?.title}>
                        <div className={styles.address}>
                          <RoomIcon />
                          <p>
                            {good.location?.title?.length! > 25
                              ? `${good.location?.title?.slice(0, 25)}...` // Обрезаем если >25 символов
                              : good.location?.title}
                          </p>
                        </div>
                      </Tooltip>
                      <div
                        style={{
                          textAlign: "end",
                          marginTop: "-10px",
                        }}
                      >
                        <GoodDialog // Диалог для редактирования
                          modalFunction="edit"
                          goodId={good.id}
                          initialsValue={[
                            good.firstName,
                            good.lastName,
                            dayjs(good.hireDate),
                            [
                              good.location?.lng!,
                              good.location?.lat!,
                              good.location?.title!,
                            ],
                            [good.category?.title!, good.category?.id],
                          ]}
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
      ) : (
        <div className={styles.main}>
          <div className={styles.mainTop}>
            <div>PERSON</div>
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
          {goodsStore.goods.length === 0 ? (
            <h2 className={styles.stub}>Товары и материалы не найдены 🔎</h2>
          ) : (
            searchedGoods.map((good: IGood) => {
              return (
                <div className={styles.contentItem} key={good.id}>
                  <GoodAboutPopup
                    good={good}
                    open={aboutEmpOpen}
                    close={handleAboutEmpClose}
                  />
                  <div className={styles.contentInner}>
                    <div className={styles.mobileEmployee}>
                      <InfoIcon onClick={() => setAboutEmpOpen(true)} />
                      {`${good.firstName} ${good.lastName}`}
                    </div>
                    <div
                      style={{
                        textAlign: "end",
                        marginTop: "-10px",
                      }}
                    >
                      <GoodDialog // Диалог для редактирования
                        modalFunction="edit"
                        goodId={good.id}
                        initialsValue={[
                          good.firstName,
                          good.lastName,
                          dayjs(good.hireDate),
                          [
                            good.location?.lng!,
                            good.location?.lat!,
                            good.location?.title!,
                          ],
                          [good.category?.title!, good.category?.id],
                        ]}
                      />
                    </div>
                  </div>
                  <Divider sx={{ marginTop: "10px" }} />
                </div>
              );
            })
          )}
        </div>
      )}
    </>
  );
});

export default Goods;
