import { useState } from 'preact/hooks'
import cx from 'classnames'

import { NavItem } from '../../components/NavItem'
import { Search } from '../../components/Search'
import { useUtilityBarStore } from '../utility-bar/store'
import { childrenMatchesSearch, itemMatchesSearch } from '../../utilities/itemMatchesSearch'
import { NavItemInterface } from './types'

interface NavProps {
  /**
    The nav items to render
  */
  nav: NavItemInterface[]
  /**
    The currently active nav item`
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
    itemMatchesSearch(item, currentSearch) || childrenMatchesSearch(item.children, currentSearch)
  )

  const utilityStore = useUtilityBarStore()

  return (
    <nav
      className={cx(
        'flex min-w-[250px] flex-col gap-8 overflow-hidden bg-gray-100 bg-gradient-to-l from-gray-400/30 to-transparent to-35% transition-colors dark:bg-gray-800 dark:from-gray-900/40',
      )}
    >
      <div
        className={cx(
          'grid grid-rows-[auto,1fr] h-full gap-6 transition-all duration-500 ease-out',
          {
            'opacity-100 delay-200': utilityStore.isNavBarVisible,
            'invisible -translate-x-2 opacity-0 delay-0':
              !utilityStore.isNavBarVisible,
          },
        )}
      >
        <div className="px-6 pt-6">
          <Search
            onInput={(e) =>
              setCurrentSearch(e.currentTarget.value.toLowerCase())
            }
          />
        </div>

        <ul className="flex flex-col gap-2 overflow-auto pb-6">
          {filteredNav.map((item) => (
            <NavItem
              activeNavItem={props.activeNavItem}
              item={item}
              setActiveNavItem={props.setActiveNavItem}
              expanded={currentSearch !== ''}
              level={1}
              currentSearch={currentSearch}
              parentMatchesSearch={itemMatchesSearch(item, currentSearch)}
            />
          ))}
        </ul>
      </div>
    </nav>
  )
}
