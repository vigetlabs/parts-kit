import { FlatNavItemInterface, NavItemInterface } from "./types";

export function flattenNav(items: NavItemInterface[]): FlatNavItemInterface[] {
  return items.reduce((acc, item) => {
    // Extract only the FlatNavItemInterface properties, excluding children
    const flatItem: FlatNavItemInterface = {
      title: item.title,
      url: item.url,
      ...(item.doc !== undefined && { doc: item.doc })
    }
    acc.push(flatItem)

    if (item.children) {
      acc.push(...flattenNav(item.children))
    }

    return acc
  }, [] as FlatNavItemInterface[])
}
