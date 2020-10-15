export interface SearchBoxProps {
  placeholder: string;
  searchTerm: string;
  focused: boolean;
  className?: string;
  classNames?: Array<string>;
  onArrowUp: () => void;
  onArrowDown: () => void;
  onChange: (searchTerm: string) => void;
  onFocus: () => void;
}
