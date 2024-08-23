type TEditalStatus = "pending" | "ok" | "error" | null;

export interface IMyEditals {
  id: string;
  date: Date;
  title: string;
  description: string;
  status: TEditalStatus;
}

export type TState = {
  myEditals: IMyEditals[];
};

export type TActions = {
  setMyEdital: (myEditals: IMyEditals) => void;
  setListMyEditals: (myEditals: IMyEditals[]) => void;
};
