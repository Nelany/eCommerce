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

export interface FilterDispatch {
  maxPrice?: string;
  minPrice?: string;
  country?: string;
  discount?: boolean;
}
