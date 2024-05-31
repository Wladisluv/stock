import { makeAutoObservable, runInAction } from "mobx";
import { ISupply } from "../interfaces/supply.interface";
import { supplyApi } from "../api/supplyApi";

class SupplyStore {
  supplies: ISupply[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async loadSupplies() {
    try {
      const data = await supplyApi.getSupplies();
      runInAction(() => {
        this.supplies = data;
      });
    } catch (error) {
      console.error("Error loading goods:", error);
    }
  }

  async addSupply(supply: ISupply) {
    try {
      const addedSupply = await supplyApi.addSupply(supply);
      this.supplies = [...this.supplies, addedSupply];
    } catch (error) {
      console.error("Error adding good to the store:", error);
    }
  }

  async updateSupply(id: number, updatedSupply: ISupply) {
    try {
      await supplyApi.editSupply(id, updatedSupply);
      const index: number = this.supplies.findIndex(
        (e) => e.id === updatedSupply.id
      );
      if (index !== -1) {
        this.supplies[index] = updatedSupply;
      }
      await this.loadSupplies(); // Редактируем и обновляем
    } catch (error) {
      console.log("Error updating good from store", error);
    }
  }

  async deleteSupply(id: number, supplyId?: number) {
    try {
      await supplyApi.removeSupply(id);
      this.supplies = this.supplies.filter((e) => e.id !== supplyId);
      await this.loadSupplies(); // Удаляем и обновляем
    } catch (error) {
      console.log("Error remove good from store", error);
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new SupplyStore();
