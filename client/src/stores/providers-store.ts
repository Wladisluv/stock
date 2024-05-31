import { makeAutoObservable, runInAction } from "mobx";
import { providerApi } from "../api/providersApi";

class ProvidersStore {
  providers: any[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async loadProviders() {
    try {
      const data = await providerApi.getProviders();
      runInAction(() => {
        this.providers = data;
      });
    } catch (error) {
      console.error("Error loading goods:", error);
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProvidersStore();
