import { makeAutoObservable, runInAction } from "mobx";
import { IGood } from "../interfaces/good.interface";
import { goodsApi } from "../api/goodsApi";

class GoodsStore {
  goods: IGood[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async loadGoods() {
    try {
      const data = await goodsApi.getGoods();
      runInAction(() => {
        this.goods = data;
      });
    } catch (error) {
      console.error("Error loading goods:", error);
    }
  }

  async addGood(good: IGood) {
    try {
      const addedGood = await goodsApi.addGood(good);
      this.goods = [...this.goods, addedGood];
    } catch (error) {
      console.error("Error adding good to the store:", error);
    }
  }

  async updateGood(id: number, updatedGood: IGood) {
    try {
      await goodsApi.editGood(id, updatedGood);
      const index: number = this.goods.findIndex(
        (e) => e.id === updatedGood.id
      );
      if (index !== -1) {
        this.goods[index] = updatedGood;
      }
      await this.loadGoods(); // Редактируем и обновляем
    } catch (error) {
      console.log("Error updating good from store", error);
    }
  }

  async deleteGood(id: number, goodId?: number) {
    try {
      await goodsApi.removeGood(id);
      this.goods = this.goods.filter((e) => e.id !== goodId);
      await this.loadGoods(); // Удаляем и обновляем
    } catch (error) {
      console.log("Error remove good from store", error);
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new GoodsStore();
