import * as DialogPrimitive from '@radix-ui/react-dialog'
import { JSX } from 'preact/jsx-runtime'
import { Cross1Icon } from '@radix-ui/react-icons'

interface RootProps {
  trigger: JSX.Element
  children: JSX.Element
  closeable?: boolean
  open?: boolean
  onOpenChange?: () => void
}

const Root = (props: RootProps) => {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Trigger asChild>
        {props.trigger && props.trigger}
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal container={document.getElementById('parts-kit')}>
        <DialogPrimitive.Overlay className="pk-fixed pk-inset-0 pk-z-50 pk-bg-gray-900/60 pk-backdrop-blur-[2px] data-[state=open]:pk-animate-dialog-overlay-show" />
        <DialogPrimitive.Content className="pk-fixed pk-left-[50%] pk-top-[50%] pk-z-50 pk-max-h-[85vh] pk-w-[90vw] pk-max-w-md pk-translate-x-[-50%] pk-translate-y-[-50%] pk-rounded-xl pk-border pk-border-gray-300 pk-bg-white pk-px-6 pk-py-8 pk-shadow-lg pk-transition-colors focus:pk-outline-none data-[state=open]:pk-animate-dialog-content-show dark:pk-border-gray-500 dark:pk-bg-gray-800 dark:pk-text-white">
          {props.closeable && (
            <DialogPrimitive.Close asChild>
              <button className="pk-btn-subtle pk-btn-icon pk-absolute pk-right-2 pk-top-2">
                <Cross1Icon />
              </button>
            </DialogPrimitive.Close>
          )}
          {props.children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

export const Dialog = { ...DialogPrimitive, Root }
