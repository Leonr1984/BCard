export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isBusiness: boolean;
  isAdmin: boolean;
  image?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImageObject {
  url: string;
  alt: string;
  _id?: string;
}

export interface AddressObject {
  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
  zip: number;
  _id?: string;
}

export interface Card {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image: ImageObject | string;
  address: AddressObject | string;
  bizNumber: number;
  likes: string[];
  user_id: string;
  userId?: string;
  createdAt: string;
  updatedAt?: string;
  __v?: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: {
    first: string;
    middle?: string;
    last: string;
  };
  email: string;
  password: string;
  phone: string;
  isBusiness: boolean;
  image?: {
    url: string;
    alt: string;
  };
  address?: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
}

export interface CreateCardPayload {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image: string;
  address: string;
  bizNumber: string;
}

export interface UpdateUserPayload {
  name?: string;
  phone?: string;
  image?: string;
  address?: string;
}

export interface ApiError {
  message: string;
  status: number;
}
