import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Item from ".";
import { ItemProps } from "./types";

const renderItem = (props: Partial<ItemProps>) =>
  render(
    <Item
      label={props.label || "Example item"}
      icon={props.icon || "bolt"}
      shortcut={props.shortcut || [["a"], ["b", "c"], ["d"]]}
      listIndex={props.listIndex || 0}
      highlighted={props.highlighted || false}
      goto={props.goto || undefined}
      onMouseMove={props.onMouseMove || jest.fn()}
      onGoto={props.onGoto || jest.fn()}
      onSelect={props.onSelect || jest.fn()}
    />
  );

afterEach(() => {
  cleanup();
});

test("renders correctly", () => {
  const { getByTestId } = renderItem({});
  const itemDiv = getByTestId("Laserfocus-Menu-Item");
  expect(itemDiv).toMatchSnapshot();
});

test("calls onSelect when shortcut combination is pressed", () => {
  const onSelect = jest.fn();
  renderItem({ onSelect });
  fireEvent.keyDown(window, { key: "a" });
  fireEvent.keyUp(window, { key: "a" });
  fireEvent.keyDown(window, { key: "b" });
  fireEvent.keyDown(window, { key: "c" });
  fireEvent.keyUp(window, { key: "b" });
  fireEvent.keyUp(window, { key: "c" });
  fireEvent.keyDown(window, { key: "d" });
  expect(onSelect).toHaveBeenCalled();
});

test("calls onGoto when shortcut combination is pressed and goto is defined", () => {
  const onGoto = jest.fn();
  renderItem({ onGoto, goto: "some-menu" });
  fireEvent.keyDown(window, { key: "a" });
  fireEvent.keyUp(window, { key: "a" });
  fireEvent.keyDown(window, { key: "b" });
  fireEvent.keyDown(window, { key: "c" });
  fireEvent.keyUp(window, { key: "b" });
  fireEvent.keyUp(window, { key: "c" });
  fireEvent.keyDown(window, { key: "d" });
  expect(onGoto).toHaveBeenCalled();
});

test("calls onSelect when clicked", () => {
  const onSelect = jest.fn();
  const { getByTestId } = renderItem({ onSelect });
  const itemDiv = getByTestId("Laserfocus-Menu-Item");
  fireEvent.click(itemDiv);
  expect(onSelect).toHaveBeenCalled();
});

test("calls onGoto when clicked and goto is defined", () => {
  const onGoto = jest.fn();
  const { getByTestId } = renderItem({ onGoto, goto: "some-menu" });
  const itemDiv = getByTestId("Laserfocus-Menu-Item");
  fireEvent.click(itemDiv);
  expect(onGoto).toHaveBeenCalled();
});

test("calls onSelect when highlighted and enter is pressed", () => {
  const onSelect = jest.fn();
  renderItem({ onSelect, highlighted: true });
  fireEvent.keyUp(window, { key: "Enter" });
  expect(onSelect).toHaveBeenCalled();
});

test("calls onGoto when highlighted and enter is pressed and goto is defined", () => {
  const onGoto = jest.fn();
  renderItem({ onGoto, goto: "some-menu", highlighted: true });
  fireEvent.keyUp(window, { key: "Enter" });
  expect(onGoto).toHaveBeenCalled();
});
