import { useMemo } from "react";
import goodsStore from "../stores/goods-store";

export const useSearchGoods = (query: string) => {
  const searchedGoods = useMemo(() => {
    if (!query) {
      return goodsStore.goods;
    }
    return goodsStore.goods.filter(good => 
      good.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, goodsStore.goods]);

  return searchedGoods;
};
