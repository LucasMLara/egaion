import { create } from "zustand";
import { TActions, TState } from "./types";

export const useMyEditals = create<TState & TActions>((set) => ({
  myEditals: [],

  setMyEdital: (myEditals) =>
    set((state) => ({
      myEditals: [...state.myEditals, myEditals],
    })),
  setListMyEditals: (myEditals) => set({ myEditals }),
}));
