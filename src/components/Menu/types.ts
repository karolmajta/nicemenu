import { IconName } from "./Item/Icon/types";
import React from "react";
import { ItemProps, AllowedShortcutKey } from "./Item/types";
import { GroupProps } from "./Group/types";
import { SearchBoxProps } from "./SearchBox/types";

export interface MenuItem {
  icon: IconName;
  label: string;
  shortcut?: Array<Array<AllowedShortcutKey>>;
  goto?: string;
  onSelect?: () => void;
}

export interface MenuGroup {
  label: string;
  items: Array<MenuItem>;
}

export interface MenuProps {
  title: string;
  items: Array<MenuItem>;
  groups: Array<MenuGroup>;
  submenus: {
    [submenuName: string]: MenuProps;
  };
  className?: string;
  classNames?: Array<string>;
  components?: {
    Item?: React.ComponentType<ItemProps>;
    Group?: React.ComponentType<GroupProps>;
    SearchBox?: React.ComponentType<SearchBoxProps>;
  };
}
