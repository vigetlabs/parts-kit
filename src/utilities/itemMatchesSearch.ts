import { NavItemInterface } from '../features/nav/Nav'

export const itemMatchesSearch = (
  item: NavItemInterface,
  search: string,
): boolean => {
  if (item.title.toLowerCase().includes(search)) {
    return true
  }
  return item.children.some((child: NavItemInterface) =>
    itemMatchesSearch(child, search),
  )
}
