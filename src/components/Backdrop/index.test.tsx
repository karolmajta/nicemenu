import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Backdrop from ".";
import { BackdropProps } from "./types";

const renderBackdrop = (props: Partial<BackdropProps>) =>
  render(
    <Backdrop onDismiss={props.onDismiss || jest.fn()}>
      <div>Sample content</div>
    </Backdrop>
  );

afterEach(() => {
  cleanup();
});

test("renders correctly with children", () => {
  const { getByText } = renderBackdrop({});
  const innerDiv = getByText("Sample content");
  expect(innerDiv).toBeInTheDocument();
});

test("calls onDismiss when someone clicks the backdrop", () => {
  const onDismiss = jest.fn();
  const { getByTestId } = renderBackdrop({ onDismiss });
  const backdropDiv = getByTestId("Laserfocus-Backdrop");
  fireEvent.click(backdropDiv);
  expect(onDismiss).toHaveBeenCalled();
});

test("calls onDismiss when someone presses Escape", () => {
  const onDismiss = jest.fn();
  renderBackdrop({ onDismiss });
  fireEvent.keyUp(window, { key: "Escape" });
  expect(onDismiss).toHaveBeenCalled();
});
