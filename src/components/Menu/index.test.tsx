import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Menu from ".";
import { MenuProps } from "./types";

const defaultTitle = "Main menu";

const defaultItems = [
  {
    icon: "bolt",
    label: "Log an activity",
    shortcut: [["c"]],
    onSelect: () => jest.fn(),
  },
  {
    icon: "reschedule",
    label: "Set a reminder",
    shortcut: [["h"]],
    onSelect: () => jest.fn(),
  },
  {
    icon: "loader",
    label: "Change status",
    shortcut: [["Shift", "s"]],
    onSelect: () => jest.fn(),
  },
  {
    icon: "pencil",
    label: "Edit contact",
    shortcut: [["e"]],
    onSelect: () => jest.fn(),
  },
];

const defaultGroups = [
  {
    label: "Go to...",
    items: [
      {
        icon: "inbox",
        label: "Go to inbox",
        shortcut: [["g"], ["i"]],
        goto: "inbox",
      },
      {
        icon: "dot",
        label: "Go to focus",
        shortcut: [["g"], ["f"]],
        goto: "focus",
      },
    ],
  },
];

const defaultSubmenus = {
  inbox: {
    title: "Inbox",
    items: [
      {
        label: "This is not spam!",
        onSelect: () => jest.fn(),
      },
      {
        label: "Remember to hire Karol.",
        onSelect: () => jest.fn(),
      },
      {
        label: "Hey, how is it going?",
        onSelect: () => jest.fn(),
      },
    ],
    groups: [
      {
        label: "Mail actions...",
        items: [
          {
            icon: "pencil",
            label: "Create new message",
            shortcut: [["m"]],
            onSelect: () => jest.fn(),
          },
          {
            icon: "reschedule",
            label: "Check for new mail",
            shortcut: [["r"]],
            onSelect: () => jest.fn(),
          },
        ],
      },
      {
        label: "Go to...",
        items: [
          {
            icon: "dot",
            label: "Go to focus",
            shortcut: [["g"], ["f"]],
            goto: "../focus",
          },
          {
            label: "Go to main menu",
            shortcut: [["g"], ["m"]],
            goto: "..",
          },
        ],
      },
    ],
  },
  focus: {
    title: "Focus",
    items: [
      {
        icon: "bolt",
        label: "Focus on productivity",
        shortcut: [["f"], ["p"]],
        onSelect: () => jest.fn(),
      },
      {
        icon: "bolt",
        label: "Focus on work life balance",
        shortcut: [["f"], ["w", "l"], ["b"]],
        onSelect: () => jest.fn(),
      },
      {
        icon: "bolt",
        label: "Focus on quality",
        shortcut: [["f"], ["q"]],
        onSelect: () => jest.fn(),
      },
    ],
    groups: [
      {
        label: "Go to...",
        items: [
          {
            icon: "inbox",
            label: "Go to inbox",
            shortcut: [["g"], ["f"]],
            goto: "../inbox",
          },
          {
            label: "Go to main menu",
            shortcut: [["g"], ["m"]],
            goto: "..",
          },
        ],
      },
    ],
  },
};

const renderMenu = (props: Partial<MenuProps>) =>
  render(
    <Menu
      title={props.title || defaultTitle}
      items={props.items || defaultItems}
      groups={props.groups || defaultGroups}
      submenus={props.submenus || defaultSubmenus}
    />
  );

afterEach(() => {
  cleanup();
});

test("renders correctly", () => {
  const { getByTestId } = renderMenu({});
  const menuDiv = getByTestId("Laserfocus-Menu");
  expect(menuDiv).toMatchSnapshot();
});

test("gives focus to search box on initial render", () => {
  const { getByTestId } = renderMenu({});
  const menuDiv = getByTestId("Laserfocus-Menu");
  const input = menuDiv.querySelector("input") as HTMLInputElement;
  expect(window.document.activeElement).toBe(input);
});

test("removes focus from search box on key up/down", () => {
  const { getByTestId } = renderMenu({});
  const menuDiv = getByTestId("Laserfocus-Menu");
  const input = menuDiv.querySelector("input") as HTMLInputElement;
  fireEvent.keyUp(window, { key: "ArrowUp" });
  expect(window.document.activeElement).not.toBe(input);
  fireEvent.focus(input);
  fireEvent.keyUp(window, { key: "ArrowDown" });
  expect(window.document.activeElement).not.toBe(input);
});

test("removes focus from search box on mousemove on items", () => {
  const { getByTestId } = renderMenu({});
  const menuDiv = getByTestId("Laserfocus-Menu");
  const input = menuDiv.querySelector("input") as HTMLInputElement;
  const item = menuDiv.querySelector(".Laserfocus-Menu-Item") as HTMLDivElement;
  fireEvent.mouseMove(item);
  expect(window.document.activeElement).not.toBe(input);
});

test("restores focus to search box on left arrow", () => {
  const { getByTestId } = renderMenu({});
  const menuDiv = getByTestId("Laserfocus-Menu");
  const input = menuDiv.querySelector("input") as HTMLInputElement;
  fireEvent.keyUp(window, { key: "ArrowDown" });
  fireEvent.keyUp(window, { key: "ArrowLeft" });
  expect(window.document.activeElement).toBe(input);
});

test("filters when user types into search box", () => {
  const { getByTestId, getByText } = renderMenu({});
  const menuDiv = getByTestId("Laserfocus-Menu");
  const input = menuDiv.querySelector("input") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "log" } });
  expect(menuDiv).toMatchSnapshot();
  expect(getByText("Search results for: log")).toBeInTheDocument();
  expect(menuDiv.querySelectorAll(".Laserfocus-Menu-Item").length).toEqual(1);
});

test("follows goto in item correctly", () => {
  const { getByTestId, getByText } = renderMenu({});
  const menuDiv = getByTestId("Laserfocus-Menu");
  fireEvent.keyDown(window, { key: "g" });
  fireEvent.keyUp(window, { key: "g" });
  fireEvent.keyDown(window, { key: "i" });
  fireEvent.keyUp(window, { key: "i" });
  expect(menuDiv).toMatchSnapshot();
  expect(getByText("Inbox")).toBeInTheDocument();
  expect(menuDiv.querySelectorAll(".Laserfocus-Menu-Item").length).toEqual(7);
});
