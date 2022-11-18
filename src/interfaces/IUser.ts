export interface User {
  id?: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

export interface AuthState {
  token: string;
  user: User;
}

export interface AuthContextData {
  user: User;
  signIn: any;
  signOut(): void;
  updateUser(user: User): void;
}
