import { makeAutoObservable, runInAction } from "mobx";
import { ICategory } from "../interfaces/category.interface";
import { categoriesApi } from "../api/categoriesApi";

class CategoriesStore {
  categories: ICategory[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async loadCategories() {
    try {
      const data = await categoriesApi.getCategories();
      runInAction(() => {
        this.categories = data;
      });
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  }

  async addCategory(category: ICategory) {
    try {
      const addedCategory = await categoriesApi.addCategory(category);
      this.categories = [...this.categories, addedCategory];
    } catch (error) {
      console.error("Error adding category to the store:", error);
    }
  }

  async updateCategory(id: number, updatedCategory: ICategory) {
    try {
      await categoriesApi.editCategory(id, updatedCategory);
      const index: number = this.categories.findIndex(
        (e) => e.id === updatedCategory.id
      );
      if (index !== -1) {
        this.categories[index] = updatedCategory;
      }
      await this.loadCategories();
    } catch (error) {
      console.log("Error updating category from store", error);
    }
  }

  async deleteCategory(id: number, categoryId?: number) {
    try {
      await categoriesApi.removeCategory(id);
      this.categories = this.categories.filter((e) => e.id !== categoryId);
      await this.loadCategories();
    } catch (error) {
      console.log("Error remove category from store", error);
      throw error;
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoriesStore();
