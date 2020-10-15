import React from "react";
import cx from "classnames";
import styled from "styled-components";
import Item, { ItemUnstyled } from "../Item";
import { GroupProps } from "./types";

export function GroupUnstyled({
  label,
  items,
  activeListIndex,
  className,
  classNames,
  components,
  onItemMouseMove,
  onGoto,
}: GroupProps) {
  const ItemComponent = components?.Item || ItemUnstyled;
  return (
    <div
      data-testid="Laserfocus-Menu-Group"
      className={cx("Laserfocus-Menu-Group", className, ...(classNames || []))}
    >
      <div className="group-label">
        <div className="group-label-text">{label}</div>
      </div>
      {items.map(({ icon, label, shortcut, listIndex, goto, onSelect }, i) => (
        <ItemComponent
          key={i}
          icon={icon}
          label={label}
          shortcut={shortcut}
          listIndex={listIndex}
          highlighted={listIndex === activeListIndex}
          onMouseMove={() => onItemMouseMove && onItemMouseMove(listIndex)}
          goto={goto}
          onGoto={onGoto}
          onSelect={() => onSelect && onSelect()}
        />
      ))}
    </div>
  );
}

const Group = styled(GroupUnstyled).attrs((props) => ({
  ...props,
  components: {
    Item: Item,
  },
}))`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 100%;

  .group-label {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
    height: 36px;

    font-size: 12px;
    color: rgba(228, 228, 238, 0.5);

    background: rgba(228, 228, 238, 0.05);

    .group-label-text {
      display: block;

      margin-left: 20px;
    }
  }
`;

export default Group;
