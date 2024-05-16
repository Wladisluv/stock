import { useEffect } from "react";

import { observer } from "mobx-react-lite";
import categoriesStore from "../../stores/categories-store";

import CategoryDialog from "../../layout/category-dialog/CategoryDialog";
import { Divider } from "@mui/material";

import styles from "./Categories.module.scss";

const Categories = observer(() => {
  useEffect(() => {
    categoriesStore.loadCategories();
  }, []);

  return (
    <>
      <div className={styles.top}>
        <div>
          <h1>Категории</h1>
        </div>
        <div>
          <CategoryDialog modalFunction="add" />
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.mainTop}>
          <div>КАТЕГОРИЯ</div>
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
        {categoriesStore.categories.length === 0 ? (
          <h2 className={styles.stub}>Категории не найдены 🔎</h2>
        ) : (
          categoriesStore.categories.map((category) => {
            return (
              <div className={styles.contentItem} key={category.id}>
                <div className={styles.contentInner}>
                  <div>{category.title}</div>
                  <div
                    style={{
                      textAlign: "end",
                      marginTop: "-10px",
                    }}
                  >
                    <CategoryDialog
                      modalFunction="edit"
                      categoryId={category.id}
                      initCategoryTitle={category.title}
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

export default Categories;
