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
          'h-8 w-full flex items-center gap-1 px-4 hover:bg-black/5',
          {
            'py-2 font-medium': !isChild,
            'py-1 pl-8': isChild,
            'bg-blue-400 hover:bg-blue-400 text-white':
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
        ) : (
          <span className="w-3" /> // spacer
        )}
        {props.item.title}
      </button>
      {props.item.children.length && isOpen ? (
        <ul>
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
