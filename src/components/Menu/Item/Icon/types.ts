export type IconName =
  | "bolt"
  | "dot"
  | "inbox"
  | "loader"
  | "pencil"
  | "reschedule";

export interface IconProps {
  name: IconName;
  className?: string;
  classNames?: Array<string>;
}
