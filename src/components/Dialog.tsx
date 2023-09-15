import * as DialogPrimitive from '@radix-ui/react-dialog'
import { JSX } from 'preact/jsx-runtime'
import { Cross1Icon } from '@radix-ui/react-icons'

interface RootProps {
  trigger: JSX.Element
  children: JSX.Element
  closeable?: boolean
}

const Root = (props: RootProps) => {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Trigger asChild>
        {props.trigger && props.trigger}
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="data-[state=open]:animate-dialog-overlay-show fixed inset-0 bg-gray-900/60 backdrop-blur-[2px]" />
        <DialogPrimitive.Content className="data-[state=open]:animate-dialog-content-show fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-xl border border-gray-300 bg-white px-6 py-8 shadow-lg focus:outline-none">
          {props.closeable && (
            <DialogPrimitive.Close asChild>
              <button className="btn-subtle btn-icon absolute right-2 top-2">
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
