import { useMemo } from "react";
import goodsStore from "../stores/goods-store";

export const useSearchGoods = (query: string) => {
  const searchedGoods = useMemo(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, goodsStore.goods]);

  return searchedGoods;
};
