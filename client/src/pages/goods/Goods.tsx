import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import goodsStore from "../../stores/goods-store";
import { useSearchGoods } from "../../hooks/useSearchGoods";
import GoodDialog from "../../layout/good-dialog/GoodDialog";
import { Chip, Divider, InputAdornment, OutlinedInput, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./Goods.module.scss";
import categoriesStore from "../../stores/categories-store";
import manufacturersStore from "../../stores/manufacturers-store";
import suppliesStore from "../../stores/supplies-store";

const Goods = observer(() => {
  const [query, setQuery] = useState("");
  const [aboutEmpOpen, setAboutEmpOpen] = useState(false);

  useEffect(() => {
    categoriesStore.loadCategories();
    manufacturersStore.loadManufacturers();
    suppliesStore.loadSupplies();
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
        sx={{ width: "100%", maxWidth: "360px", marginTop: "20px" }}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
        type="search"
        placeholder="Поиск товаров"
      />
      <div className={styles.main}>
        <div className={styles.mainTop}>
          <div>КАТЕГОРИЯ</div>
          <div>НАЗВАНИЕ</div>
          <div>ХАРАКТЕРИСТИКИ</div>
          <div style={{ marginLeft: "20px", maxWidth: "100px" }}>ЦЕНА</div>
          <div>КОЛИЧЕСТВО</div>
          <div>ПРОИЗВОДИТЕЛЬ</div>
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
        {searchedGoods.length === 0 ? (
          <h2 className={styles.stub}>Товары и материалы не найдены 🔎</h2>
        ) : (
          searchedGoods.map((good) => (
            <div className={styles.contentItem} key={good.id}>
              <div className={styles.contentInner}>
                <div>{good.category}</div>
                <div className={styles.mobileHidden}>{good.title}</div>
                <div className={styles.mobileHidden}>
                  <Tooltip title={good.characteristic}>
                    <Chip
                      style={{ maxWidth: "150px" }}
                      label={good.characteristic}
                      color="primary"
                    />
                  </Tooltip>
                </div>
                <div>{good.price}</div>
                <div>{good.amount}</div>
                <div className={styles.mobileHidden}>{good.manufacturer}</div>
                <div className={styles.btn}>
                  <GoodDialog modalFunction="edit" goodId={good.id} />
                </div>
              </div>
              <Divider sx={{ marginTop: "10px" }} />
            </div>
          ))
        )}
      </div>
    </>
  );
});

export default Goods;
