import { forwardRef } from 'preact/compat'
import cx from 'classnames'
import { JSX } from 'preact/jsx-runtime'
import { ComponentChildren } from 'preact'

interface ButtonBaseProps {
  variant?: 'solid' | 'outline' | 'subtle' | 'icon'
  isLoading?: boolean
  className?: string
  children: ComponentChildren
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

const variantToClass = {
  solid: 'btn',
  outline: 'btn-outline',
  subtle: 'btn-subtle',
  icon: 'btn-subtle btn-icon',
} as const

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    variant = 'solid',
    isLoading = false,
    className,
    children,
    ...rest
  } = props as ButtonProps

  const classes = cx(variantToClass[variant], className, {
    'pointer-events-none': isLoading,
  })

  if ('href' in props && props.href) {
    const { href, onClick, target, rel, ...anchorRest } = rest as AnchorProps
    const finalRel =
      target === '_blank' ? rel || 'noopener noreferrer' : rel

    const handleClick: JSX.MouseEventHandler<HTMLAnchorElement> = (e) => {
      const ariaDisabled = (anchorRest as any)['aria-disabled']
      if (isLoading || ariaDisabled) e.preventDefault()
      if (onClick) onClick(e)
    }

    return (
      <a
        {...(anchorRest as Omit<AnchorProps, 'href'>)}
        href={href}
        className={classes}
        aria-disabled={isLoading || (anchorRest as any)['aria-disabled'] ? true : undefined}
        onClick={handleClick}
        target={target}
        rel={finalRel}
        ref={ref as any}
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
      ref={ref as any}
    >
      {children}
    </button>
  )
})


