import React, { useEffect, useState, useContext } from "react";
import cx from "classnames";
import styled from "styled-components";

import WindowContext from "../../../contexts/WindowContext";
import { ItemProps } from "./types";
import { IGNORED_KEYS, KEY_SEPARATOR } from "./utils";
import Icon, { IconUnstyled } from "./Icon";

export function ItemUnstyled({
  label,
  icon,
  shortcut,
  className,
  classNames,
  components,
  listIndex,
  highlighted,
  goto,
  onMouseMove,
  onSelect,
  onGoto,
}: ItemProps) {
  const [currentlyPressedKeys, setCurrentlyPressedKeys] = useState<Set<string>>(
    new Set()
  );
  const window = useContext(WindowContext);

  const [shortcutIndex, setShortcutIndex] = useState(0);

  const IconComponent = components?.Icon || IconUnstyled;

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (highlighted && e.key === "Enter" && onSelect) {
        onSelect();
      }
      if (highlighted && e.key === "Enter" && goto) {
        goto && onGoto(goto);
      }
    };
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [highlighted, onSelect, goto, onGoto, window]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        !shortcut ||
        currentlyPressedKeys.has(e.key) ||
        IGNORED_KEYS.has(e.key)
      ) {
        setCurrentlyPressedKeys(new Set());
        return;
      }
      const newKeys = new Set([
        ...Array.from(currentlyPressedKeys),
        e.key.toLowerCase(),
      ]);
      const expectedKeys = shortcut[shortcutIndex];
      setCurrentlyPressedKeys(newKeys);
      if (
        newKeys.size > currentlyPressedKeys.size &&
        expectedKeys.every((key) => newKeys.has(key.toLowerCase()))
      ) {
        const expectedTogetherNow = Array.from(
          shortcut[shortcutIndex].map((k) => k.toLowerCase())
        )
          .sort()
          .join(KEY_SEPARATOR);
        const presentTogetherNow = Array.from(newKeys)
          .sort()
          .join(KEY_SEPARATOR);
        if (shortcutIndex + 1 === shortcut.length) {
          setShortcutIndex(0);
          if (expectedTogetherNow === presentTogetherNow) {
            onSelect && onSelect();
            goto && onGoto(goto);
          }
        } else {
          if (expectedTogetherNow === presentTogetherNow) {
            setShortcutIndex((i) => i + 1);
          } else {
            setShortcutIndex(0);
          }
        }
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (!shortcut || IGNORED_KEYS.has(e.key)) {
        setCurrentlyPressedKeys(new Set());
        return;
      }
      setCurrentlyPressedKeys(
        (keys) =>
          new Set(Array.from(keys).filter((key) => key !== e.key.toLowerCase()))
      );
      let nonResetKeysArray: Array<string> = [];
      shortcut.slice(0, shortcutIndex).forEach((keys) => {
        nonResetKeysArray = [
          ...nonResetKeysArray,
          ...keys.map((k) => k.toLowerCase()),
        ];
      });
      const nonResetKeys = new Set(nonResetKeysArray);
      if (!nonResetKeys.has(e.key.toLowerCase())) {
        setShortcutIndex(0);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [
    shortcut,
    shortcutIndex,
    setShortcutIndex,
    currentlyPressedKeys,
    setCurrentlyPressedKeys,
    onSelect,
    goto,
    onGoto,
    window,
  ]);

  return (
    <div
      data-testid="Laserfocus-Menu-Item"
      onMouseMove={() => onMouseMove && onMouseMove(listIndex)}
      onClick={(e) => {
        onSelect && onSelect();
        goto && onGoto(goto);
        e.stopPropagation();
      }}
      className={cx(
        "Laserfocus-Menu-Item",
        { highlighted },
        className,
        ...(classNames || [])
      )}
    >
      {icon ? (
        <IconComponent name={icon} />
      ) : (
        <div className="icon-placeholder" />
      )}
      <div className="item-label">{label}</div>
      {shortcut && (
        <div className="item-shortcut">
          {shortcut.map((steps, i, shortcut) => (
            <div key={i} className="item-shortcut-parts">
              {steps.map((step, j) => (
                <div key={j} className="item-shortcut-step">
                  {step}
                </div>
              ))}
              {i < shortcut.length - 1 && (
                <div className="item-shortcut-part-separator">then</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const Item = styled(ItemUnstyled).attrs((props) => ({
  ...props,
  components: {
    Icon: Icon,
  },
}))`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  height: 44px;

  cursor: pointer;

  &.highlighted {
    background: rgba(228, 228, 238, 0.05);
  }

  .icon-placeholder {
    margin-left: 46px;
  }

  .item-label {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
    height: 36px;

    font-size: 15px;
    color: rgba(228, 228, 238, 0.8);
  }

  .item-shortcut {
    display: flex;
    flex-direction: row;
    justify-self: flex-end;

    margin-right: 20px;

    .item-shortcut-parts {
      display: flex;
      flex-direction: row;

      .item-shortcut-step {
        display: block;
        padding: 0 5px;

        height: 20px;
        min-width: 10px;
        margin-left: 12px;

        text-align: center;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        color: #828282;

        background: rgba(228, 228, 238, 0.1);
        border-radius: 4px;
      }

      .item-shortcut-part-separator {
        display: block;

        height: 20px;
        margin-left: 12px;

        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        color: #828282;
      }
    }
  }
`;

export default Item;
