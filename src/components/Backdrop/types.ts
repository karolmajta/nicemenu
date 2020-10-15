import { ReactChild } from "react";

export interface BackdropProps {
  children: ReactChild;
  className?: string;
  classNames?: Array<string>;
  onDismiss: () => void;
}
