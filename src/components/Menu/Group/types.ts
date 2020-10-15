import { IconName } from "../Item/Icon/types";
import React from "react";
import { AllowedShortcutKey, ItemProps } from "../Item/types";

export interface GroupItemProps {
  icon: IconName;
  label: string;
  shortcut?: Array<Array<AllowedShortcutKey>>;
  goto?: string;
  onSelect?: () => void;
  listIndex: number;
}

export interface GroupProps {
  label: string;
  items: Array<GroupItemProps>;
  activeListIndex: number | null;
  className?: string;
  classNames?: Array<string>;
  components?: {
    Item?: React.ComponentType<ItemProps>;
  };
  onItemMouseMove?: (index: number) => void;
  onGoto: (gotoPath: string) => void;
}
