import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import cx from "classnames";
import WindowContext from "../../contexts/WindowContext";
import { BackdropProps } from "./types";

export function BackdropUnstyled({
  children,
  onDismiss,
  className,
  classNames,
}: BackdropProps) {
  const window = useContext(WindowContext);

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onDismiss();
      }
    };

    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [onDismiss, window]);

  return (
    <div
      data-testid="Laserfocus-Backdrop"
      className={cx("Laserfocus-Backdrop", className, ...(classNames || []))}
      onClick={(_e) => onDismiss()}
    >
      {children}
    </div>
  );
}

const Backdrop = styled(BackdropUnstyled)`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  background: rgba(0, 0, 0, 0.5);
`;

export default Backdrop;
