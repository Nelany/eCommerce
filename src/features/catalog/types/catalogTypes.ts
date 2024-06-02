export type Category = {
  id: string;
  name: string;
  children?: {
    id: string;
    name: string;
  }[];
};

export type SetSearchValue = {
  changeSearchInput: (value: string) => void;
};
