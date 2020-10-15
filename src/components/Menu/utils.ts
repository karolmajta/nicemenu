import { MenuProps, MenuItem, MenuGroup } from "./types";

export const addListIndexes = (
  items: Array<MenuItem>,
  groups: Array<MenuGroup>
) => {
  let listIndex = 0;
  const numberedItems = items.map((item) => {
    listIndex++;
    return { ...item, listIndex: listIndex - 1 };
  });
  const numberedGroups = groups.map((group) => ({
    ...group,
    items: group.items.map((item) => {
      listIndex++;
      return { ...item, listIndex: listIndex - 1 };
    }),
  }));
  return { numberedItems, numberedGroups, listItemsCount: listIndex };
};

export const buildNewStack = (currentStack: Array<string>, path: string) => {
  const chunks = path.split("/").filter((x) => !!x);
  let newStack = [...currentStack];
  chunks.forEach((chunk) => {
    if (chunk === "..") {
      newStack.pop();
    } else if (chunk === ".") {
      // do nothing
    } else {
      newStack.push(chunk);
    }
  });
  return newStack;
};

export const performSearch = (
  term: string,
  items: Array<MenuItem>,
  groups: Array<MenuGroup>,
  submenus: { [k: string]: MenuProps },
  accumulator: Array<MenuItem> = []
) => {
  items.forEach((item) => {
    if (item.label.toLowerCase().indexOf(term) > -1) {
      accumulator.push(item);
    }
  });
  groups.forEach((group) => {
    group.items.forEach((item) => {
      if (item.label.toLowerCase().indexOf(term) > -1) {
        accumulator.push(item);
      }
    });
  });
  Object.values(submenus || {}).forEach((submenu) => {
    performSearch(
      term,
      submenu.items,
      submenu.groups,
      submenu.submenus,
      accumulator
    );
  });
  const foundLabels = new Set();
  const foundShortcuts = new Set();
  const dedupedItems: Array<MenuItem> = [];
  accumulator.forEach((item) => {
    let dupe = false;
    const shortcutHash = (item.shortcut || [])
      .map((s) => s.join("+"))
      .join("---");
    if (foundLabels.has(item.label)) {
      dupe = true;
    }
    if (foundShortcuts.has(shortcutHash)) {
      dupe = true;
    }
    foundLabels.add(item.label);
    if (shortcutHash) {
      foundShortcuts.add(shortcutHash);
    }
    if (!dupe) {
      dedupedItems.push(item);
    }
  });
  return dedupedItems.filter((item) => !item.goto);
};
