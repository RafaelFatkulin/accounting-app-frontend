import { makeAutoObservable } from "mobx";
import axios from "axios";
import { IUser } from "../interfaces/IUser";

type AuthType = 'login' | 'registration';

export class AuthStore {
  authenticated = false;
  token = "";
  loading = false;
  user: IUser | null = null;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.checkAuthentication()
  }

  auth = async (login: string, password: string, authType: AuthType) => {
    this.setLoading(true);

    try {
      const response = await axios.post(`http://localhost:5656/auth/${authType}`, {
        login,
        password,
      });
      this.setToken(response.data.token);

      await this.getUser();

      this.setAuth(true);
      this.setLoading(false);
    } catch (error: any) {
      this.setError(error.response?.data?.message || "Error occurred");
      this.setLoading(false);
    }
  };

  isAuthenticated() {
    return this.authenticated;
  }

  setLoading(value: boolean) {
    this.loading = value;
  }

  setError(value: string | null) {
    this.error = value;
  }

  setAuth(value: boolean) {
    this.authenticated = value;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  setUser(user: IUser | null) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser = async () => {
    try {
      this.setError(null)
      const response = await axios.post("http://localhost:5656/auth/user", {
        token: this.token,
      });
      this.setUser(response.data);
    } catch (error: any) {
      this.setError(error.response?.data?.message || "Error occurred");
    }
  };

  logout = () => {
    this.token = "";
    this.setAuth(false);
    this.setUser(null)
    localStorage.clear();
  };

  checkAuthentication = () => {
    this.setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      this.token = token;
      this.setAuth(true);
    }
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      this.setUser(JSON.parse(savedUser));
    }
    this.setLoading(false);
  };
}