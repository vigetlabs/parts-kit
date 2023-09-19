import { useState } from 'preact/hooks'
import cx from 'classnames'
import { NavItemInterface } from '../features/nav/Nav.tsx'
import { ChevronDownIcon, ChevronRightIcon } from '@radix-ui/react-icons'

interface NavItemProps {
  item: NavItemInterface
  activeNavItem: NavItemInterface
  setActiveNavItem: (item: NavItemInterface) => void
  isChild?: boolean
}

export function NavItem(props: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isChild = props.isChild ?? false

  return (
    <div>
      <button
        className={cx(
          'flex h-8 w-full items-center gap-1 rounded-none px-4 transition-colors hover:bg-black/5 active:bg-black/10 dark:text-gray-100 dark:hover:bg-black/30 dark:active:bg-black/40',
          {
            'py-2 font-medium': !isChild,
            'py-1 pl-8': isChild,
            'bg-blue-500 text-white hover:bg-blue-400 dark:hover:bg-blue-400 dark:active:bg-blue-500':
              props.activeNavItem === props.item,
          },
        )}
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
      {props.item.children.length && isOpen ? (
        <ul className="flex flex-col">
          {props.item.children.map((child) => (
            <NavItem
              isChild
              activeNavItem={props.activeNavItem}
              item={child}
              setActiveNavItem={props.setActiveNavItem}
            />
          ))}
        </ul>
      ) : null}
    </div>
  )
}
