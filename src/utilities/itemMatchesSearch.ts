import { NavItemInterface } from '../features/nav/types'

export const itemMatchesSearch = (
  item: NavItemInterface,
  search: string,
): boolean => {
  if (item.title.toLowerCase().includes(search)) {
    return true
  }
  return false;
}

export const childrenMatchesSearch = (
  children: NavItemInterface[],
  search: string,
): boolean => {
  return children.some((child: NavItemInterface) =>
    itemMatchesSearch(child, search),
  )
}
