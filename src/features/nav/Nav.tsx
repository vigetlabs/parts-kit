import { useState } from 'preact/hooks'
import cx from 'classnames'
import { NavItem } from '../../components/NavItem'
import { Search } from '../../components/Search'
import { useUtilityBarStore } from '../utility-bar/store'

export interface NavItemInterface {
  title: string
  url: string | null
  children: NavItemInterface[]
}
interface NavProps {
  nav: NavItemInterface[]
  activeNavItem: NavItemInterface
  setActiveNavItem: (item: NavItemInterface) => void
}

export function Nav(props: NavProps) {
  const [currentSearch, setCurrentSearch] = useState('')

  const filteredNav = props.nav.filter((item) => {
    const itemMatchesSearch = (item: NavItemInterface) =>
      item.title.toLowerCase().includes(currentSearch)
    return (
      itemMatchesSearch(item) ||
      item.children.some((child) => itemMatchesSearch(child))
    )
  })

  const utilityStore = useUtilityBarStore()

  return (
    <nav
      className={cx(
        'flex min-w-[250px] flex-col gap-8 overflow-hidden bg-gray-100 bg-gradient-to-l from-gray-400/30 to-transparent to-35% py-8 transition-all',
        {
          'invisible opacity-0': !utilityStore.isNavBarVisible,
        },
      )}
    >
      <div className="px-6">
        <Search onInput={(e) => setCurrentSearch(e.currentTarget.value)} />
      </div>

      <ul className="flex flex-col gap-2">
        {filteredNav.map((item) => (
          <li>
            <NavItem
              activeNavItem={props.activeNavItem}
              item={item}
              setActiveNavItem={props.setActiveNavItem}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}
