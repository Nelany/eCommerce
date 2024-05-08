export type InputProps = {
  type: string;
  name: string;
  error?: string;
};

export type ButtonProps = {
  type: 'submit' | 'button';
  callback?: (event: Event) => void;
  text?: string;
};
