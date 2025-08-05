import { useState, useEffect } from 'preact/hooks'
import cx from 'classnames'
import { ChevronDownIcon, ChevronRightIcon } from '@radix-ui/react-icons'

import { NavItemInterface } from '../features/nav/types'
import { itemMatchesSearch } from '../utilities/itemMatchesSearch'

interface NavItemProps {
  /**
    The nav item to render
  */
  item: NavItemInterface
  /**
    Whether or not the parent matches the search
  */
  parentMatchesSearch: boolean
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
  const filteredChildren = props.item.children.filter((child: NavItemInterface) =>
    itemMatchesSearch(child, props.currentSearch) || props.parentMatchesSearch,
  )

  return (
    <li>
      <button
        className={cx(
          'flex min-h-8 w-full items-center gap-1 rounded-none px-4 text-start transition-colors hover:bg-black/5 active:bg-black/10 dark:text-gray-100 dark:hover:bg-black/30 dark:active:bg-black/40',
          {
            'py-2 font-medium': !isChild || props.item.children.length,
            'py-1 pl-4': isChild,
            'bg-blue-500 text-white hover:bg-blue-400 dark:hover:bg-blue-400 dark:active:bg-blue-500':
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
              className={cx('icon -ml-1', {
                hidden: isOpen,
              })}
            />
            <ChevronDownIcon
              className={cx('icon -ml-1', {
                hidden: !isOpen,
              })}
            />
          </>
        ) : !isChild ? (
          <span className="w-3" /> // spacer
        ) : null}
        {props.item.title}
      </button>
      {filteredChildren.length > 0 && isOpen && (
        <ul>
          {filteredChildren.map((childItem: NavItemInterface) => (
            <NavItem
              activeNavItem={props.activeNavItem}
              item={childItem}
              setActiveNavItem={props.setActiveNavItem}
              expanded={props.expanded}
              isChild={true}
              level={props.level + 1}
              currentSearch={props.currentSearch}
              parentMatchesSearch={itemMatchesSearch(props.item, props.currentSearch)}
            />
          ))}
        </ul>
      )}
    </li>
  )
}
