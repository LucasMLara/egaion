import { create } from "zustand";
import { TActions, TState } from "./types";

export const useAvailableEditals = create<TState & TActions>((set) => ({
  availableEditals: [],
  setEdital: (edital) =>
    set((state) => ({ availableEditals: [...state.availableEditals, edital] })),
  setListEditals: (editals) => set({ availableEditals: editals }),
}));
