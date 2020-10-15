import React from "react";
import { render, cleanup } from "@testing-library/react";
import Group from ".";
import { GroupProps } from "./types";

const renderGroup = (props: Partial<GroupProps>) =>
  render(
    <Group
      label={props.label || "Example label"}
      items={
        props.items || [{ label: "Eample item 1" }, { label: "Eample item 2" }]
      }
      activeListIndex={props.activeListIndex || 0}
      onGoto={props.onGoto || jest.fn()}
    />
  );

afterEach(() => {
  cleanup();
});

test("renders correctly", () => {
  const { getByTestId } = renderGroup({});
  const groupDiv = getByTestId("Laserfocus-Menu-Group");
  expect(groupDiv).toMatchSnapshot();
});

test("renders specified items", () => {
  const { getByTestId } = renderGroup({});
  const groupDiv = getByTestId("Laserfocus-Menu-Group");
  expect(
    groupDiv.querySelectorAll('[data-testid="Laserfocus-Menu-Item"]').length
  ).toEqual(2);
});
