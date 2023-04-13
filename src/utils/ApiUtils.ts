import axios, {AxiosInstance, AxiosResponse} from "axios";
import {IUser} from "../interfaces/IUser";
import {IWallet} from "../interfaces/IWallet";
import {ITransaction} from "../interfaces/ITransaction";

const BASE_URL = 'http://localhost:5656/'

class ApiUtils {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    this.axiosInstance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  }

  private handleResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  private handleError(error: any): Promise<never> {
    if (error.response) {
      console.error(error.response.data);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error(error.message);
    }
    return Promise.reject(error);
  }



  public async login(login: string, password: string): Promise<string> {
    const response = await this.axiosInstance.post('/auth/login', {login, password})
    return response.data.token
  }

  public async getUser(token: string): Promise<IUser> {``
    const response: AxiosResponse<IUser> = await this.axiosInstance.post(`/auth/user`, {token})
    return response.data;
  }

  public async getWallets(userId: number): Promise<IWallet[]> {
    const response: AxiosResponse<IWallet[]> = await this.axiosInstance.get(`/wallets?userId=${userId}`)
    return response.data
  }

  public async getWallet(id: number): Promise<IWallet> {
    const response: AxiosResponse<IWallet> = await this.axiosInstance.get(`/wallets/${id}`)
    return response.data
  }

  public async getIncomes(walletId: number): Promise<ITransaction[]> {
    const response: AxiosResponse<ITransaction[]> = await this.axiosInstance.get(`wallets/${walletId}/incomes`)
    return response.data
  }

  public async getIncome(walletId: number, incomeId: number): Promise<ITransaction> {
    const response: AxiosResponse<ITransaction> = await this.axiosInstance.get(`/wallets/${walletId}/incomes/${incomeId}`)
    return response.data
  }

  public async getExpenses(walletId: number): Promise<ITransaction[]> {
    const response: AxiosResponse<ITransaction[]> = await this.axiosInstance.get(`wallets/${walletId}/expenses`)
    return response.data
  }

  public async getExpense(walletId: number, expenseId: number): Promise<ITransaction> {
    const response: AxiosResponse<ITransaction> = await this.axiosInstance.get(`/wallets/${walletId}/incomes/${expenseId}`)
    return response.data
  }
}

export default new ApiUtils()