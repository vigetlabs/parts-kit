import { flattenNav } from "./flatten-nav"

describe("flattenNav", () => {
  it("should flatten a nav item", () => {
    const result = flattenNav([
      {
        "title": "Button",
        "url": "",
        "children": [
          {
            "title": "Primary",
            "url": "button-primary.html",
            "children": []
          },
          {
            "title": "Secondary",
            "url": "button-secondary.html",
            "children": []
          },
          {
            "title": "Level 3 Folder",
            "url": "level-3-folder.html",
            "children": [
              {
                "title": "Level 4 Folder",
                "url": "level-4-folder.html",
                "children": []
              }
            ]
          }
        ]
      },
      {
        "title": "Card",
        "url": "card.html",
        "children": []
      }
    ])

    expect(result).toEqual([
      {
        "title": "Button",
        "url": "",
      },
      {
        "title": "Primary",
        "url": "button-primary.html",
      },
      {
        "title": "Secondary",
        "url": "button-secondary.html",
      },
      {
        "title": "Level 3 Folder",
        "url": "level-3-folder.html",
      },
      {
        "title": "Level 4 Folder",
        "url": "level-4-folder.html",
      },
      {
        "title": "Card",
        "url": "card.html",
      }
    ])
  })
})
