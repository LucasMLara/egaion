export interface IAvailableEditals {
  id: string;
  date: Date;
  title: string;
  description: string;
}

export type TState = {
  availableEditals: IAvailableEditals[];
};

export type TActions = {
  setEdital: (editals: IAvailableEditals) => void;
  setListEditals: (editals: IAvailableEditals[]) => void;
};
