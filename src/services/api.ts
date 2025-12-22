import axios, { AxiosInstance } from "axios";
import {
  User,
  Card,
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  CreateCardPayload,
  UpdateUserPayload,
} from "../types";

const API_URL = "https://bcard-ojqa.onrender.com";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["x-auth-token"] = token;
      }
      return config;
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  private parseAuthResponse(data: any): AuthResponse {
    console.log("Auth response data:", data);

    if (typeof data === "string") {
      return { token: data, user: {} as User };
    }

    if (data.token && data.user) {
      return data;
    }

    if (data.token) {
      return { token: data.token, user: {} as User };
    }

    if (data.accessToken) {
      return { token: data.accessToken, user: {} as User };
    }

    throw new Error("No token in response");
  }

  async login(payload: LoginPayload): Promise<AuthResponse> {
    try {
      const response = await this.api.post("/users/login", payload);
      return this.parseAuthResponse(response.data);
    } catch (error: any) {
      console.error("Login error details:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  }

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    try {
      let response;
      try {
        response = await this.api.post("/users/register", payload);
      } catch (err: any) {
        if (err.response?.status === 404) {
          response = await this.api.post("/users", payload);
        } else {
          throw err;
        }
      }

      console.log("Register raw response:", response.data);

      return {
        token: "",
        user: response.data,
      };
    } catch (error: any) {
      console.error("Register error details:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  }

  async getUser(userId: string): Promise<User> {
    const { data } = await this.api.get<User>(`/users/${userId}`);
    return data;
  }

  async updateUser(userId: string, payload: UpdateUserPayload): Promise<User> {
    const { data } = await this.api.put<User>(`/users/${userId}`, payload);
    return data;
  }

  async getAllUsers(): Promise<User[]> {
    const { data } = await this.api.get<User[]>("/users");
    return data;
  }

  async deleteUser(userId: string): Promise<void> {
    await this.api.delete(`/users/${userId}`);
  }

  async changeUserStatus(userId: string): Promise<User> {
    const { data } = await this.api.patch<User>(`/users/${userId}`);
    return data;
  }

  async getCards(): Promise<Card[]> {
    const { data } = await this.api.get<Card[]>(
      "https://bcard-ojqa.onrender.com/cards"
    );
    return data;
  }

  async getCardById(cardId: string): Promise<Card> {
    const { data } = await this.api.get<Card>(`/cards/${cardId}`);
    return data;
  }

  async getUserCards(userId: string): Promise<Card[]> {
    const { data } = await this.api.get<Card[]>(`/cards/user/${userId}`);
    return data;
  }

  async createCard(payload: CreateCardPayload): Promise<Card> {
    const { data } = await this.api.post<Card>("/cards", {
      title: payload.title,
      subtitle: payload.subtitle,
      description: payload.description,
      phone: payload.phone,
      email: payload.email,
      web: payload.web,
      image: {
        url: payload.image,
        alt: "Business card image",
      },
      address: {
        state: "IL",
        country: "Israel",
        city: "Tel Aviv",
        street: payload.address,
        houseNumber: 1,
        zip: 6000000,
      },
      bizNumber: payload.bizNumber,
    });
    return data;
  }

  async updateCard(
    cardId: string,
    payload: Partial<CreateCardPayload>
  ): Promise<Card> {
    const updateData: any = {};

    if (payload.title) updateData.title = payload.title;
    if (payload.subtitle) updateData.subtitle = payload.subtitle;
    if (payload.description) updateData.description = payload.description;
    if (payload.phone) updateData.phone = payload.phone;
    if (payload.email) updateData.email = payload.email;
    if (payload.web) updateData.web = payload.web;
    if (payload.bizNumber) updateData.bizNumber = payload.bizNumber;

    if (payload.image) {
      if (typeof payload.image === "string") {
        updateData.image = {
          url: payload.image,
          alt: "Business card image",
        };
      } else {
        updateData.image = payload.image;
      }
    }

    if (payload.address) {
      if (typeof payload.address === "string") {
        updateData.address = {
          state: "IL",
          country: "Israel",
          city: "Tel Aviv",
          street: payload.address.substring(0, 100),
          houseNumber: 1,
          zip: 6000000,
        };
      } else {
        updateData.address = payload.address;
      }
    }

    const { data } = await this.api.put<Card>(`/cards/${cardId}`, updateData);
    return data;
  }

  async deleteCard(cardId: string): Promise<void> {
    await this.api.delete(`/cards/${cardId}`);
  }

  async likeCard(cardId: string): Promise<Card> {
    const { data } = await this.api.patch<Card>(`/cards/${cardId}`);
    return data;
  }

  async unlikeCard(cardId: string): Promise<Card> {
    const { data } = await this.api.patch<Card>(`/cards/${cardId}`);
    return data;
  }
}

export const apiService = new ApiService();
