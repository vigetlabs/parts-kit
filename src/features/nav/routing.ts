import { useEffect } from 'preact/hooks'
import { NavItemInterface } from './Nav'

/**
 * The search param to look for when routing to the proper nav item
 */
export const SEARCH_PARAM_PART = 'part'

export const findNavItemByUrl = (
  urlToFind: string,
  navItems: NavItemInterface[],
): NavItemInterface | undefined => {
  let found = undefined
  for (const navItem of navItems) {
    if (navItem.url === urlToFind) {
      found = navItem
    } else if (!found) {
      found = findNavItemByUrl(urlToFind, navItem.children)
    }
  }
  return found
}

export const findFirstNavItem = (
  item: NavItemInterface,
): NavItemInterface | undefined => {
  if (item.url) {
    return item
  }

  return item.children.find((item) => !!item.url)
}

interface OnPopStateParams {
  url: URL
}

interface UseHistoryParams {
  onPopState: (params: OnPopStateParams) => void
}

export const UseHistory = (params: UseHistoryParams) => {
  const push = (url: URL, data: any): void => {
    history.pushState(data, '', url)
  }

  useEffect(() => {
    const handlePopState = () => {
      params.onPopState({
        url: new URL(window.location.href),
      })
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return {
    push,
  }
}
