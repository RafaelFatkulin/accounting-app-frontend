import {makeAutoObservable} from "mobx";
import {IWallet} from "../interfaces/IWallet";
import axios from "axios";
import {ICreateWallet} from "../interfaces/ICreateWallet";

const localStorageKey = 'wallets'

export class WalletStore {
  wallets: IWallet[] = [];
  loading: boolean = false;
  error: any = null;

  constructor() {
    makeAutoObservable(this);
    this.getWalletsFromLocalStorage()
  }

  setLoading(value: boolean) {
    this.loading = value;
  }

  setError(value: string | null) {
    this.error = value;
  }

  saveWalletsToLocalStorage = () => {
    localStorage.setItem(localStorageKey, JSON.stringify(this.wallets))
  }

  getWalletsFromLocalStorage = () => {
    const wallets = localStorage.getItem(localStorageKey)
    if(wallets) {
      this.wallets = JSON.parse(wallets)
    }
  }

  setWallets(wallets: IWallet[]) {
    this.wallets = wallets
    this.saveWalletsToLocalStorage()
  }

  getWallets = async (userId: number) => {
    try {
      this.setError(null);
      this.setLoading(true);

      const response = await axios.get(`http://localhost:5656/wallets?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      this.setWallets(response.data);
      this.setLoading(false);
    } catch (error: any) {
      this.setError(error.message);
      this.setLoading(false);
    }
  };
  createWallet = async (newWallet: ICreateWallet) => {
    try {
      const response = await axios.post('http://localhost:5656/wallets', newWallet, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const createdWallet = response.data;
      await this.getWallets(createdWallet.userId)
      this.saveWalletsToLocalStorage();
    } catch (error: any) {
      this.setError(error.message);
    }
  }

  deleteWallet = async (walletId: number, userId: number) => {
    try {
      this.setError(null)
      this.setLoading(true)

      const response = await axios.delete(`http://localhost:5656/wallets/${walletId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      console.log(response.data)
      await this.getWallets(userId)
      this.saveWalletsToLocalStorage()
      this.setLoading(false)
    } catch (error: any) {
      this.setError(error.message)
    }
  }
}