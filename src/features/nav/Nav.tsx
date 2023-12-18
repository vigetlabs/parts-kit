import { useState } from 'preact/hooks'
import cx from 'classnames'

import { NavItem } from '../../components/NavItem'
import { Search } from '../../components/Search'
import { useUtilityBarStore } from '../utility-bar/store'
import { itemMatchesSearch } from '../../utilities/itemMatchesSearch'

export interface NavItemInterface {
  /**
    The title of the nav item
  */
  title: string
  /**
    The url of the nav item
  */
  url: string | null
  /**
    The children of the nav item
  */
  children: NavItemInterface[]
  /**
    Whether or not the nav item is a docs page.

    If doc is true, the nav item iframe will not be resizable.
    */
  doc?: boolean
}

interface NavProps {
  /**
    The nav items to render
  */
  nav: NavItemInterface[]
  /**
    The currently active nav item
  */
  activeNavItem: NavItemInterface
  /**
    Callback to set the active nav item
  */
  setActiveNavItem: (item: NavItemInterface) => void
}

export function Nav(props: NavProps) {
  const [currentSearch, setCurrentSearch] = useState('')

  const filteredNav = props.nav.filter((item) =>
    itemMatchesSearch(item, currentSearch),
  )

  const utilityStore = useUtilityBarStore()

  return (
    <nav
      className={cx(
        'to-35% pk-flex pk-min-w-[250px] pk-flex-col pk-gap-8 pk-overflow-hidden pk-bg-gray-100 pk-bg-gradient-to-l pk-from-gray-400/30 pk-to-transparent pk-transition-colors dark:pk-bg-gray-800 dark:pk-from-gray-900/40',
      )}
    >
      <div
        className={cx(
          'pk-grid pk-h-full pk-grid-rows-[auto,1fr] pk-gap-6 pk-transition-all pk-duration-500 pk-ease-out',
          {
            'pk-opacity-100 pk-delay-200': utilityStore.isNavBarVisible,
            'pk-invisible -pk-translate-x-2 pk-opacity-0 pk-delay-0':
              !utilityStore.isNavBarVisible,
          },
        )}
      >
        <div className="pk-px-6 pk-pt-6">
          <Search
            onInput={(e) =>
              setCurrentSearch(e.currentTarget.value.toLowerCase())
            }
          />
        </div>

        <ul className="pk-flex pk-flex-col pk-gap-2 pk-overflow-auto pk-pb-6">
          {filteredNav.map((item) => (
            <NavItem
              activeNavItem={props.activeNavItem}
              item={item}
              setActiveNavItem={props.setActiveNavItem}
              expanded={currentSearch !== ''}
              level={1}
              currentSearch={currentSearch}
            />
          ))}
        </ul>
      </div>
    </nav>
  )
}
