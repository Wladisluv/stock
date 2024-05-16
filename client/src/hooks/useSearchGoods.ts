import { useMemo } from "react";
import goodsStore from "../stores/goods-store";

export const useSearchGoods = (query: string) => {
  const searchedGoods = useMemo(() => {
    return goodsStore.goods.filter(
      (good: { firstName: string; lastName: string }) =>
        good.firstName?.toLowerCase().includes(query.toLowerCase()) ||
        good.lastName?.toLowerCase().includes(query.toLowerCase())
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, goodsStore.goods]);

  return searchedGoods;
};
