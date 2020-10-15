import React from "react";
import cx from "classnames";
import styled from "styled-components";

import { IconProps } from "./types";
import { iconMapping } from "./utils";

export function IconUnstyled({ name, className, classNames }: IconProps) {
  return (
    <div
      data-testid="Laserfocus-Menu-Item-Icon"
      className={cx(
        "Laserfocus-Menu-Item-Icon",
        className,
        ...(classNames || [])
      )}
    >
      <img src={iconMapping[name]} alt={name} />
    </div>
  );
}

const Icon = styled(IconUnstyled)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  margin-right: 10px;

  img {
    display: block;
    width: 16px;
    height: 16px;
  }
`;

export default Icon;
