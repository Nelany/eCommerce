export type Category = {
  id: string;
  name: string;
  children?: {
    id: string;
    name: string;
  }[];
};
