import * as DialogPrimitive from '@radix-ui/react-dialog'
import { JSX } from 'preact/jsx-runtime'
import { Cross1Icon } from '@radix-ui/react-icons'
import { partsKitRoot } from '../utilities/customElements'
import { Button } from './Button'

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

      <DialogPrimitive.Portal container={partsKitRoot()}>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-[2px] data-[state=open]:animate-dialog-overlay-show" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-xl border border-gray-300 bg-white px-6 py-8 shadow-lg transition-colors focus:outline-none data-[state=open]:animate-dialog-content-show dark:border-gray-500 dark:bg-gray-800 dark:text-white">
          {props.closeable && (
            <DialogPrimitive.Close asChild>
              <Button
                variant="icon"
                className="absolute right-2 top-2"
                aria-label="Close dialog"
                title="Close"
              >
                <Cross1Icon />
              </Button>
            </DialogPrimitive.Close>
          )}
          {props.children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

export const Dialog = { ...DialogPrimitive, Root }
