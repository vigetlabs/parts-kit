import { useEffect } from 'preact/hooks'
import { NavItemInterface } from './Nav'

/**
 * Prefix used for hash-based routing
 * Example: http://localhost:5173/#/button-secondary.html
 */
export const HASH_PREFIX = '#/'

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
  const push = (path: string): void => {
    const normalized = path.startsWith('/') ? path.slice(1) : path
    // Setting the hash updates the URL and triggers 'hashchange'
    window.location.hash = `/${normalized}`
  }

  useEffect(() => {
    const handleHashChange = () => {
      params.onPopState({
        url: new URL(window.location.href),
      })
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return {
    push,
  }
}

/**
 * Extract the path from a URL hash.
 * Returns null if there is no hash path.
 * Examples:
 *  - http://localhost/#/button-secondary.html => 'button-secondary.html'
 *  - http://localhost/#button-secondary.html => 'button-secondary.html'
 */
export const getPathFromHash = (url: URL): string | null => {
  const rawHash = url.hash
  if (!rawHash) return null
  // Remove leading '#/' or '#'
  const stripped = rawHash.replace(/^#\/?/, '')
  return stripped.length > 0 ? stripped : null
}
