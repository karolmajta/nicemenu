import React from "react";
import { render, cleanup } from "@testing-library/react";
import Icon from ".";
import { iconMapping } from "./utils";
import { IconName } from "./types";

test("renders correctly for every allowed icon name", () => {
  Object.values(iconMapping).forEach((iconName) => {
    const { getByTestId } = render(<Icon name={iconName as IconName} />);
    const iconDiv = getByTestId("Laserfocus-Menu-Item-Icon");
    expect(iconDiv).toMatchSnapshot();
    cleanup();
  });
});
