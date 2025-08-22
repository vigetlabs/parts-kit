import { forwardRef } from 'preact/compat'
import cx from 'classnames'
import { JSX } from 'preact/jsx-runtime'
import { ComponentChildren, Ref } from 'preact'

const variantToClass = {
  solid: 'btn',
  outline: 'btn-outline',
  subtle: 'btn-subtle',
  icon: 'btn-subtle btn-icon',
} as const

type ButtonVariant = keyof typeof variantToClass

interface ButtonBaseProps {
  variant?: ButtonVariant
  isLoading?: boolean
  className?: string
  children: ComponentChildren
  ariaDisabled?: boolean
}

interface AnchorProps
  extends Omit<JSX.HTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>,
    ButtonBaseProps {
  href: string
}

interface NativeButtonProps
  extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'className' | 'children'>,
    ButtonBaseProps {
  href?: undefined
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export type ButtonProps = AnchorProps | NativeButtonProps

/**
 * Forward refs let parent components obtain a DOM ref to a child component's
 * underlying element. Wrapping `Button` with `forwardRef` means a ref passed to
 * `<Button ref={...}>` will point at the actual rendered element (`<button>` or
 * `<a>`). This enables imperative actions like `focus()`, measurements, and
 * library interop that requires a DOM node. Because `Button` can render either
 * element, the forwarded ref type is a union:
 * `HTMLButtonElement | HTMLAnchorElement`.
 */
export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props: ButtonProps, ref) {
  const {
    variant = 'solid',
    isLoading = false,
    className,
    children,
    ariaDisabled,
    ...rest
  } = props

  const classes = cx(variantToClass[variant], className, {
    'pointer-events-none': isLoading,
  })

  if (isAnchor(props)) {
    const { onClick, target, rel, ...anchorRest } = rest as Omit<AnchorProps, 'href'>
    const href = (props as AnchorProps).href
    const targetStr = getAttrString(target)
    const relStr = getAttrString(rel)
    const finalRel = targetStr === '_blank' ? ensureNoopener(relStr) : relStr

    const handleClick: JSX.MouseEventHandler<HTMLAnchorElement> = (e) => {
      if (isLoading || ariaDisabled) e.preventDefault()
      if (onClick) onClick(e)
    }

    return (
      <a
        {...(anchorRest as Omit<AnchorProps, 'href'>)}
        href={href}
        className={classes}
        aria-disabled={isLoading || ariaDisabled ? true : undefined}
        aria-busy={isLoading || undefined}
        onClick={handleClick}
        target={target}
        rel={finalRel}
        ref={ref as Ref<HTMLAnchorElement>}
      >
        {children}
      </a>
    )
  }

  const { type = 'button', disabled, ...buttonRest } = rest as NativeButtonProps

  return (
    <button
      {...(buttonRest as Omit<NativeButtonProps, 'type' | 'disabled'>)}
      type={type}
      className={classes}
      disabled={isLoading || !!disabled}
      aria-busy={isLoading || undefined}
      ref={ref as Ref<HTMLButtonElement>}
    >
      {children}
    </button>
  )
})

// Used to determine if the button is an anchor and providing typing
function isAnchor(p: ButtonProps): p is AnchorProps {
  return 'href' in p && !!p.href
}

// Ensures we don't overwrite existing rel values.
function ensureNoopener(rel?: string) {
  const set = new Set((rel ?? '').split(' ').filter(Boolean))
  set.add('noopener')
  set.add('noreferrer')
  return Array.from(set).join(' ')
}

// Used for compatbility with Preact signals.
function getAttrString(
  value: string | { value?: string | undefined } | undefined
): string | undefined {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object' && 'value' in value) {
    return (value as { value?: string | undefined }).value
  }
  return undefined
}

Button.displayName = 'Button'



