import { useState } from "react";

import api from "../api";
import { User } from "../../interfaces/IUser";

export function useUser() {
  const [isUserLoading, setIsUserLoading] = useState(false);

  const getAllUser = async (): Promise<User[]> => {
    setIsUserLoading(true);
    const response = await api.get("/user");
    setIsUserLoading(false);
    return response.data;
  };

  const getUserById = async (id: string): Promise<User> => {
    setIsUserLoading(true);
    const { data } = await api.get(`/user/${id}`);
    setIsUserLoading(false);
    return data;
  };

  const createUser = async (user: User): Promise<User> => {
    setIsUserLoading(true);
    const { data } = await api.post("/user", user);
    setIsUserLoading(false);
    return data;
  };

  const updateUser = async (user: User): Promise<User> => {
    setIsUserLoading(true);
    const { data } = await api.put(`/user/${user.id}`, user);
    setIsUserLoading(false);
    return data;
  };

  const deleteUser = async (id: string): Promise<User> => {
    setIsUserLoading(true);
    const { data } = await api.delete(`/user/${id}`);
    setIsUserLoading(false);
    return data;
  };

  return {
    isUserLoading,
    getUserById,
    getAllUser,
    createUser,
    updateUser,
    deleteUser,
  };
}
