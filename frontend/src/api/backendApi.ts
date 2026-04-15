import axios from "axios";
import type { Story, CreateStoryDto } from "../types/story";


const api = axios.create({ baseURL: "http://localhost:3000"});

export const storyApi = {

  getAll: async function() {
    const response = await api.get<Story[]>("/stories");
    return response.data;
  },

  create: async function(dto: CreateStoryDto) {
    const response = await api.post<Story>("/stories", dto);
    return response.data;
  },

    delete: async function(id: string) {
    await api.delete('/stories/' + id);
  },

  update: async function(id: string, dto: Partial<Story>) {
    const response = await api.patch<Story>('/stories/' + id, dto);
    return response.data;
  }
};