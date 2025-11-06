import { useEffect } from 'preact/hooks'
import { NavItemInterface } from './Nav'

/**
 * The search param to look for when routing to the proper nav item
 */
const SEARCH_PARAM_PATH = 'path'

/**
 * Legacy search param for backwards compatibility
 */
const SEARCH_PARAM_PART_LEGACY = 'part'

/**
 * Custom escape function to avoid encoding / as %2F
 */
export const searchParamFromPath = (url: string): string => {
  const encodedRaw = encodeURIComponent(url)
  const encoded = encodedRaw.replace(/%2F/g, '/')

  return `?${SEARCH_PARAM_PATH}=${encoded}`
}

/**
 * Gets the path from URL search params, checking both the new 'path' param
 * and the legacy 'part' param for backwards compatibility.
 * Prefers the new 'path' param if both are present.
 */
export const getPathFromSearchParams = (searchParams: URLSearchParams): string | null => {
  return searchParams.get(SEARCH_PARAM_PATH) || searchParams.get(SEARCH_PARAM_PART_LEGACY)
}

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
