import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import SearchBox from ".";
import { SearchBoxProps } from "./types";

const renderSearchBox = (props: Partial<SearchBoxProps>) =>
  render(
    <SearchBox
      placeholder={props.placeholder || "Placeholder"}
      searchTerm={props.searchTerm || ""}
      focused={props.focused || false}
      onArrowUp={props.onArrowUp || jest.fn()}
      onArrowDown={props.onArrowDown || jest.fn()}
      onChange={props.onChange || jest.fn()}
      onFocus={props.onFocus || jest.fn()}
    />
  );

afterEach(() => {
  cleanup();
});

test("renders correctly", () => {
  const { getByTestId } = renderSearchBox({});
  const searchBoxDiv = getByTestId("Laserfocus-Menu-SearchBox");
  expect(searchBoxDiv).toMatchSnapshot();
});

test("renders with input focused if focused is true", () => {
  const { getByTestId } = renderSearchBox({ focused: true });
  const searchBoxDiv = getByTestId("Laserfocus-Menu-SearchBox");
  const input = searchBoxDiv.querySelector("input") as HTMLInputElement;
  expect(window.document.activeElement).toBe(input);
});

test("calls onArrowUp correctly", () => {
  const onArrowUp = jest.fn();
  const { getByTestId } = renderSearchBox({ onArrowUp });
  const searchBoxDiv = getByTestId("Laserfocus-Menu-SearchBox");
  const input = searchBoxDiv.querySelector("input") as HTMLInputElement;
  fireEvent.keyDown(input, { key: "ArrowUp" });
  expect(onArrowUp).toHaveBeenCalled();
});

test("calls onArrowDown correctly", () => {
  const onArrowDown = jest.fn();
  const { getByTestId } = renderSearchBox({ onArrowDown });
  const searchBoxDiv = getByTestId("Laserfocus-Menu-SearchBox");
  const input = searchBoxDiv.querySelector("input") as HTMLInputElement;
  fireEvent.keyDown(input, { key: "ArrowDown" });
  expect(onArrowDown).toHaveBeenCalled();
});

test("calls onChange correctly", () => {
  const onChange = jest.fn();
  const { getByTestId } = renderSearchBox({ onChange });
  const searchBoxDiv = getByTestId("Laserfocus-Menu-SearchBox");
  const input = searchBoxDiv.querySelector("input") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "Hello" } });
  expect(onChange).toHaveBeenCalledWith("Hello");
});

test("calls onFocus correctly", () => {
  const onFocus = jest.fn();
  const { getByTestId } = renderSearchBox({ onFocus });
  const searchBoxDiv = getByTestId("Laserfocus-Menu-SearchBox");
  const input = searchBoxDiv.querySelector("input") as HTMLInputElement;
  input.focus();
  expect(onFocus).toHaveBeenCalled();
});
