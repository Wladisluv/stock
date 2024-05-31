import { makeAutoObservable, runInAction } from "mobx";
import { manufacturerApi } from "../api/manufacturerApi";
import { IManufacturer } from "../interfaces/manufacturer.interface";

class ManufacturersStore {
  manufacturers: IManufacturer[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async loadManufacturers() {
    try {
      const data = await manufacturerApi.getManufacturers();
      runInAction(() => {
        this.manufacturers = data;
      });
    } catch (error) {
      console.error("Error loading goods:", error);
    }
  }

  async addManufacturer(manufacturer: IManufacturer) {
    try {
      const addedManufacturer = await manufacturerApi.addManufacturer(
        manufacturer
      );
      this.manufacturers = [...this.manufacturers, addedManufacturer];
    } catch (error) {
      console.error("Error adding good to the store:", error);
    }
  }

  async updateManufacturer(id: number, updatedManufacturer: IManufacturer) {
    try {
      await manufacturerApi.editManufacturer(id, updatedManufacturer);
      const index: number = this.manufacturers.findIndex(
        (e) => e.id === updatedManufacturer.id
      );
      if (index !== -1) {
        this.manufacturers[index] = updatedManufacturer;
      }
      await this.loadManufacturers(); // Редактируем и обновляем
    } catch (error) {
      console.log("Error updating good from store", error);
    }
  }

  async deleteManufacturer(id: number, manufacturerId?: number) {
    try {
      await manufacturerApi.removeManufacturer(id);
      this.manufacturers = this.manufacturers.filter(
        (e) => e.id !== manufacturerId
      );
      await this.loadManufacturers(); // Удаляем и обновляем
    } catch (error) {
      console.log("Error remove good from store", error);
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ManufacturersStore();
