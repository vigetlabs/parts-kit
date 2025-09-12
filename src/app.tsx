import { useState, useEffect } from 'preact/hooks'
import cx from 'classnames'
import { Nav } from './features/nav/Nav.tsx'
import { NavItemInterface } from './features/nav/Nav.tsx'
import { useSettingsStore } from './features/settings/store.ts'
import {
  ScreenSize,
  screenSizeMap,
  useThemeStore,
  useUtilityBarStore,
} from './features/utility-bar/store.ts'
import Welcome from './features/welcome/Welcome.tsx'
import UtilityBar from './features/utility-bar/UtilityBar.tsx'
import {
  findNavItemByUrl,
  findFirstNavItem,
  UseHistory,
  getPathFromHash,
} from './features/nav/routing.ts'
import KeyboardShortcuts from './components/KeyboardShortcuts.tsx'

export interface AppProps {
  configUrl: string | null
}

/**
 * Config is the JSON we get back from the CMS or App
 * Right now it's only nav links, but there could be other config
 * items in the future.
 */
export interface Config {
  nav: NavItemInterface[]
}

export function App(props: AppProps) {
  const settings = useSettingsStore()
  const utilityStore = useUtilityBarStore()
  const themeStore = useThemeStore()

  const [config, setConfig] = useState<Config>({ nav: [] })
  const hasConfigUrl = !!props.configUrl

  const loadConfig = async (url: string) => {
    const response = await fetch(url, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error("Couldn't load")
    }

    const data = await response.json()

    setConfig(data)
  }

  useEffect(() => {
    // If the custom element has a config URL, don't pull one from the settings field
    loadConfig(props.configUrl ?? settings.configUrl)
  }, [settings.configUrl])

  if (config.nav.length === 0) {
    return <div>Loading</div>
  }

  const initialPath = getPathFromHash(new URL(window.location.href))
  const navItemFromUrl = initialPath
    ? findNavItemByUrl(initialPath, config.nav)
    : undefined

  const useHistory = UseHistory({
    onPopState: ({ url }) => {
      const pathFromHash = getPathFromHash(url)

      if (!pathFromHash) {
        // Select the first nav item if no hash path present
        setActiveNavItem(findFirstNavItem(config.nav[0]))
        setIsWelcomeVisible(false)
        return
      }

      const foundNavItem = findNavItemByUrl(pathFromHash, config.nav)

      if (!foundNavItem) {
        console.error('Could not find nav item after hash change')
        // TODO show a 404 message
        return
      }

      setActiveNavItem(foundNavItem)
      setIsWelcomeVisible(false)
    },
  })

  // Migration: support old query param ?part=... by converting to hash #/...
  useEffect(() => {
    const currentUrl = new URL(window.location.href)
    const legacyPart = currentUrl.searchParams.get('part')
    if (!legacyPart) return

    const normalized = legacyPart.startsWith('/')
      ? legacyPart.slice(1)
      : legacyPart

    // Trigger navigation via hashchange
    window.location.hash = `/${normalized}`

    // Clean up the URL (remove query param) without another navigation
    currentUrl.searchParams.delete('part')
    currentUrl.hash = `/${normalized}`
    history.replaceState({}, '', currentUrl)
  }, [config.nav.length])

  const [isWelcomeVisible, setIsWelcomeVisible] = useState<boolean>(
    !navItemFromUrl,
  )

  const [activeNavItem, setActiveNavItem] = useState<
    NavItemInterface | undefined
  >(navItemFromUrl || findFirstNavItem(config.nav[0]))

  const activeScreenWidth = screenSizeMap[utilityStore.activeScreenSize]

  const setViableNavItem = (clickedItem: NavItemInterface): void => {
    const foundItem = findFirstNavItem(clickedItem)

    if (foundItem === undefined || !foundItem.url) {
      console.error('Cant find viable nav item for ', clickedItem)
      // TODO update state with an error message
      return
    }

    setActiveNavItem(foundItem)
    setIsWelcomeVisible(false)

    useHistory.push(foundItem.url)
  }

  KeyboardShortcuts()

  return (
    <div
      data-testid="app"
      className={cx('font-sans', {
        light: themeStore.mode === 'light',
        dark: themeStore.mode === 'dark',
      })}
    >
      <div
        className={cx(
          'grid h-screen grid-cols-[250px,1fr] bg-gray-100 transition-all duration-500',
          {
            '!grid-cols-[0px,1fr]': !utilityStore.isNavBarVisible,
          },
        )}
      >
        {activeNavItem !== undefined ? (
          <Nav
            activeNavItem={activeNavItem}
            nav={config.nav}
            setActiveNavItem={setViableNavItem}
          />
        ) : null}

        <div className="relative z-10 flex flex-col bg-white">
          <UtilityBar
            isDoc={activeNavItem?.doc ?? false}
            showSettings={!hasConfigUrl}
          />

          <div className="flex flex-grow items-stretch justify-center">
            {!hasConfigUrl && isWelcomeVisible ? (
              <Welcome />
            ) : (
              <div
                className={cx('flex-grow', {
                  'py-5': utilityStore.activeScreenSize !== ScreenSize.Desktop,
                })}
                style={{ maxWidth: activeScreenWidth }}
              >
                {/* Changing the src of iframes will muck up your history. Using key to rerender when the nav changes is a workaround */}
                <iframe
                  key={activeNavItem?.url}
                  className={cx('h-full w-full', {
                    'rounded border-2 border-gray-100':
                      utilityStore.activeScreenSize !== ScreenSize.Desktop,
                  })}
                  src={activeNavItem?.url ?? undefined}
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
