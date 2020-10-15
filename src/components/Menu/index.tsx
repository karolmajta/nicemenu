import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import cx from "classnames";

import Item, { ItemUnstyled } from "./Item";
import Group, { GroupUnstyled } from "./Group";
import SearchBox, { SearchBoxUnstyled } from "./SearchBox";
import WindowContext from "../../contexts/WindowContext";
import { MenuProps } from "./types";
import { addListIndexes, performSearch, buildNewStack } from "./utils";

export function MenuUnstyled({
  title,
  items,
  groups,
  submenus,
  className,
  classNames,
  components,
}: MenuProps) {
  const window = useContext(WindowContext);

  const [activeListIndex, setActiveListIndex] = useState<number | null>(null);
  const [submenuStack, setSubmenuStack] = useState<Array<string>>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const ItemComponent = components?.Item || ItemUnstyled;
  const GroupComponent = components?.Group || GroupUnstyled;
  const SearchBoxComponent = components?.SearchBox || SearchBoxUnstyled;

  let activeSubmenus = submenus;
  let activeItems = items;
  let activeGroups = groups;
  let activeTitle = title;

  submenuStack.forEach((submenuKey) => {
    activeItems = activeSubmenus[submenuKey].items;
    activeGroups = activeSubmenus[submenuKey].groups;
    activeTitle = activeSubmenus[submenuKey].title;
    activeSubmenus = activeSubmenus[submenuKey].submenus;
  });

  if (searchTerm.trim()) {
    activeItems = performSearch(searchTerm, items, groups, submenus);
    activeGroups = [];
  }

  const { numberedItems, numberedGroups, listItemsCount } = addListIndexes(
    activeItems,
    activeGroups
  );

  useEffect(() => {
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        if (activeListIndex === null) {
          setActiveListIndex(0);
        } else if (activeListIndex >= listItemsCount - 1) {
          setActiveListIndex(0);
        } else {
          setActiveListIndex((i) => (i || 0) + 1);
        }
      }
      if (event.key === "ArrowUp") {
        if (activeListIndex === null) {
          setActiveListIndex(listItemsCount - 1);
        } else if (activeListIndex <= 0) {
          setActiveListIndex(listItemsCount - 1);
        } else {
          setActiveListIndex((i) => (i || 0) - 1);
        }
      }
      if (event.key === "ArrowLeft") {
        setActiveListIndex(null);
      }
    };

    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [activeListIndex, listItemsCount, window]);

  return (
    <div
      data-testid="Laserfocus-Menu"
      className={cx("Laserfocus-Menu", className, ...(classNames || []))}
    >
      <div className="menu-title">
        <div className="menu-title-text">
          {!searchTerm.trim()
            ? activeTitle
            : `Search results for: ${searchTerm}`}
        </div>
      </div>
      <SearchBoxComponent
        searchTerm={searchTerm}
        placeholder={
          activeListIndex === null
            ? "Search..."
            : "Press arrow left to search or type command..."
        }
        onChange={setSearchTerm}
        focused={activeListIndex === null}
        onArrowDown={() => setActiveListIndex(-1)}
        onArrowUp={() => setActiveListIndex(listItemsCount)}
        onFocus={() => setActiveListIndex(null)}
      />
      {numberedItems.map(
        ({ icon, label, shortcut, listIndex, onSelect, goto }, i) => (
          <ItemComponent
            key={i}
            icon={icon}
            label={label}
            shortcut={shortcut}
            listIndex={listIndex}
            highlighted={activeListIndex === listIndex}
            onMouseMove={(listIndex) => setActiveListIndex(listIndex)}
            onSelect={() => onSelect && onSelect()}
            goto={goto}
            onGoto={(path) => {
              setSubmenuStack((oldStack) => buildNewStack(oldStack, path));
              setActiveListIndex(0);
            }}
          />
        )
      )}
      {numberedGroups.map(({ label, items }, i) => (
        <GroupComponent
          key={i}
          label={label}
          items={items}
          activeListIndex={activeListIndex}
          onItemMouseMove={(listIndex) => setActiveListIndex(listIndex)}
          onGoto={(path) => {
            setSubmenuStack((oldStack) => buildNewStack(oldStack, path));
            setActiveListIndex(0);
          }}
        />
      ))}
    </div>
  );
}

const Menu = styled(MenuUnstyled).attrs((props) => ({
  ...props,
  components: {
    Item: Item,
    Group: Group,
    SearchBox: SearchBox,
  },
}))`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 12px 0;

  font-family: Inter;
  font-style: normal;
  font-weight: normal;

  background: #2d3346;
  box-shadow: 0px 50px 100px -20px rgba(11, 31, 82, 0.27),
    0px 22.3363px 17.869px rgba(72, 136, 159, 0.0417275),
    0px 6.6501px 5.32008px rgba(72, 136, 159, 0.0282725);
  border-radius: 12px;

  .menu-title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-self: flex-start;

    height: 22px;
    margin-top: -3px;
    margin-left: 20px;

    font-size: 10px;
    font-weight: 500;
    letter-spacing: 1.5px;

    color: #e4e4ee;
    background: rgba(228, 228, 238, 0.05);
    border-radius: 3px;

    .menu-title-text {
      display: block;

      margin: 0 16px;
    }
  }
`;

export default Menu;
