import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { JSX } from 'preact/jsx-runtime'

interface DropdownProps {
  trigger: JSX.Element
  children: JSX.Element
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  hasArrow?: boolean
}

export const Dropdown = (props: DropdownProps) => {
  return (
    <DropdownMenu.Root {...props}>
      <DropdownMenu.Trigger asChild>
        {props.trigger && props.trigger}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          align={props.align || 'start'}
          side={props.side || 'bottom'}
          className="dropdown"
        >
          {props.children}
          {props.hasArrow && <DropdownMenu.Arrow className="dropdown-arrow" />}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export { DropdownMenu }
