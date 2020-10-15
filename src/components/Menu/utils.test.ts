import { buildNewStack, performSearch, addListIndexes } from "./utils";

describe("buildNewStack", () => {
  test("given current stack and directory-like-path builds a new stack", () => {
    const stack = ["a", "b", "c"];
    const path = "./../../d/e";
    expect(buildNewStack(stack, path)).toEqual(["a", "d", "e"]);
  });
});

describe("performSearch", () => {
  test("returns flat list of matching items removing ones with goto present", () => {
    const items = [{ label: "aaa" }, { label: "aab" }, { label: "bbb" }];
    const groups = [
      { items: [{ label: "aac" }, { label: "aad" }, { label: "ccc" }] },
      { items: [{ label: "aae" }, { label: "aaf" }, { label: "ddd" }] },
    ];

    const submenus = [
      {
        items: [{ label: "aag" }, { label: "eee" }],
        groups: [],
      },
      {
        items: [],
        groups: [
          { items: [{ label: "aaf" }, { label: "ffa" }] },
          { items: [{ label: "aag" }, { label: "ggg" }] },
          { items: [{ label: "aah" }, { label: "faa" }] },
        ],
        submenus: {
          someSubmenu: {
            items: [{ label: "aaj" }],
            groups: [],
          },
        },
      },
    ];

    expect(
      performSearch("aa", items as any, groups as any, submenus as any)
    ).toEqual([
      { label: "aaa" },
      { label: "aab" },
      { label: "aac" },
      { label: "aad" },
      { label: "aae" },
      { label: "aaf" },
      { label: "aag" },
      { label: "aah" },
      { label: "faa" },
      { label: "aaj" },
    ]);
  });

  test("returned list is deduplicated by labels and by shortcut", () => {
    const items = [
      { label: "aaa" },
      { label: "aaa" },
      { label: "bbb", shortcut: [["a"], ["b", "c"]] },
    ];
    const groups = [
      { items: [{ label: "abc" }, { label: "abc" }, { label: "acd" }] },
      {
        items: [
          { label: "defa", shortcut: [["a"], ["b", "c"]] },
          { label: "efga" },
        ],
      },
    ];
    const submenus: Array<any> = [];
    expect(
      performSearch("a", items as any, groups as any, submenus as any)
    ).toEqual([
      { label: "aaa" },
      { label: "abc" },
      { label: "acd" },
      { label: "defa", shortcut: [["a"], ["b", "c"]] },
      { label: "efga" },
    ]);
  });

  test("returned list has items with goto set filtered out", () => {
    const items = [
      { label: "aaa" },
      { label: "aaa" },
      { label: "bbb", shortcut: [["a"], ["b", "c"]] },
    ];
    const groups = [
      {
        items: [
          { label: "abc", goto: "m" },
          { label: "abc" },
          { label: "acd" },
        ],
      },
      {
        items: [
          { label: "defa", shortcut: [["a"], ["b", "c"]] },
          { label: "efga", goto: "n" },
        ],
      },
    ];
    const submenus: Array<any> = [];
    expect(
      performSearch("a", items as any, groups as any, submenus as any)
    ).toEqual([
      { label: "aaa" },
      { label: "acd" },
      { label: "defa", shortcut: [["a"], ["b", "c"]] },
    ]);
  });
});

describe("addListIndexes", () => {
  test("given items and groups gives them consecutive list indexes and returns total count too", () => {
    const items = [{}, {}, {}];
    const groups = [{ items: [{}, {}] }, { items: [{}, {}, {}, {}] }];
    expect(addListIndexes(items as any, groups as any)).toEqual({
      listItemsCount: 9,
      numberedItems: [{ listIndex: 0 }, { listIndex: 1 }, { listIndex: 2 }],
      numberedGroups: [
        { items: [{ listIndex: 3 }, { listIndex: 4 }] },
        {
          items: [
            { listIndex: 5 },
            { listIndex: 6 },
            { listIndex: 7 },
            { listIndex: 8 },
          ],
        },
      ],
    });
  });
});
