import React from "react";
import { IconName, IconProps } from "./Icon/types";

export type AllowedShortcutKey =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z"
  | "Shift";

export interface ItemProps {
  label: string;
  icon?: IconName;
  shortcut?: Array<Array<AllowedShortcutKey>>;
  listIndex: number;
  highlighted: boolean;
  goto?: string;
  className?: string;
  classNames?: Array<string>;
  components?: {
    Icon?: React.ComponentType<IconProps>;
  };
  onMouseMove?: (listIndex: number) => void;
  onSelect?: () => void;
  onGoto: (menuKey: string) => void;
}
