import React, { useRef, useEffect } from "react";
import cx from "classnames";
import styled from "styled-components";

import { SearchBoxProps } from "./types";

export function SearchBoxUnstyled({
  placeholder,
  searchTerm,
  className,
  classNames,
  focused,
  onArrowUp,
  onArrowDown,
  onChange,
  onFocus,
}: SearchBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      if (focused) {
        inputRef.current.focus();
        onChange("");
      } else {
        inputRef.current.blur();
      }
    }
  }, [focused, onChange]);

  return (
    <div
      data-testid="Laserfocus-Menu-SearchBox"
      className={cx(
        "Laserfocus-Menu-SearchBox",
        className,
        ...(classNames || [])
      )}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          e.stopPropagation();
          e.key === "ArrowUp" && onArrowUp();
          e.key === "ArrowDown" && onArrowDown();
        }}
        onKeyUp={(e) => {
          if (e.key !== "Escape") {
            e.stopPropagation();
          }
        }}
        onFocus={onFocus}
        ref={inputRef}
      />
    </div>
  );
}

const SearchBox = styled(SearchBoxUnstyled)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  border-bottom: 1px solid rgba(228, 228, 238, 0.2);

  input {
    display: flex;
    margin: 12px 20px;
    width: calc(100% - 2 * 20px);
    height: 24px;

    background: none;
    border: none;
    outline: none;
    caret-color: #176397;
    font-family: Inter;
    font-size: 20px;
    line-height: 24px;
    color: rgba(228, 228, 238, 0.5);

    &::placeholder {
      color: rgba(228, 228, 238, 0.2);
    }
  }
`;

export default SearchBox;
