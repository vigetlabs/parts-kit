import { useState, useEffect } from 'preact/hooks'
import cx from 'classnames'
import { ChevronDownIcon, ChevronRightIcon } from '@radix-ui/react-icons'

import { NavItemInterface } from '../features/nav/Nav.tsx'
import { itemMatchesSearch } from '../utilities/itemMatchesSearch'

interface NavItemProps {
  /**
    The nav item to render
  */
  item: NavItemInterface
  /**
    The currently active nav item
  */
  activeNavItem: NavItemInterface
  /**
    Callback to set the active nav item
  */
  setActiveNavItem: (item: NavItemInterface) => void
  /**
    Whether or not the item is a child of another item
  */
  isChild?: boolean
  /**
    Whether or not the item is expanded
  */
  expanded?: boolean
  /**
    The depth of the item in the tree (1 is top level)
  */
  level: number
  /**
    The current search string
  */
  currentSearch: string
}

export function NavItem(props: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isChild = props.isChild ?? false

  //
  const isActiveDescendant = (item: NavItemInterface): boolean => {
    if (item === props.activeNavItem) {
      return true
    }
    return item.children.some(isActiveDescendant)
  }

  // automatically expand if the active nav item is a descendant of this item or if search is active
  useEffect(() => {
    if (isActiveDescendant(props.item)) {
      setIsOpen(true)
    } else {
      setIsOpen(props.expanded ?? false)
    }
  }, [props.expanded, props.activeNavItem, props.item])

  // hide children if they don't match the search
  const filteredChildren = props.item.children.filter((child) =>
    itemMatchesSearch(child, props.currentSearch),
  )

  return (
    <li>
      <button
        className={cx(
          'pk-flex pk-min-h-8 pk-w-full pk-items-center pk-gap-1 pk-rounded-none pk-px-4 pk-text-start pk-transition-colors hover:pk-bg-black/5 active:pk-bg-black/10 dark:pk-text-gray-100 dark:hover:pk-bg-black/30 dark:active:pk-bg-black/40',
          {
            'pk-py-2 pk-font-medium': !isChild || props.item.children.length,
            'pk-py-1 pk-pl-4': isChild,
            'pk-bg-blue-500 pk-text-white hover:pk-bg-blue-400 dark:hover:pk-bg-blue-400 dark:active:pk-bg-blue-500':
              props.activeNavItem === props.item,
          },
        )}
        style={`padding-left: ${props.level * 16}px`}
        onClick={() => {
          if (props.item.children.length) {
            if (isOpen) {
              return setIsOpen(false)
            }
            setIsOpen(true)
            // Intentionally pass through to set active nav item
          }
          return props.setActiveNavItem(props.item)
        }}
      >
        {props.item.children.length ? (
          <>
            <ChevronRightIcon
              className={cx('pk-icon -pk-ml-1', {
                'pk-hidden': isOpen,
              })}
            />
            <ChevronDownIcon
              className={cx('pk-icon -pk-ml-1', {
                'pk-hidden': !isOpen,
              })}
            />
          </>
        ) : !isChild ? (
          <span className="pk-w-3" /> // spacer
        ) : null}
        {props.item.title}
      </button>
      {filteredChildren.length > 0 && isOpen && (
        <ul>
          {filteredChildren.map((childItem) => (
            <NavItem
              activeNavItem={props.activeNavItem}
              item={childItem}
              setActiveNavItem={props.setActiveNavItem}
              expanded={props.expanded}
              isChild={true}
              level={props.level + 1}
              currentSearch={props.currentSearch}
            />
          ))}
        </ul>
      )}
    </li>
  )
}
