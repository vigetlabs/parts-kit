### Development plan for `src/components/Button.tsx`

- Goals
  - Provide a single, generic `Button` that maps to Tailwind plugin classes from `config/tailwind/buttons.js`.
  - Simple API, sane defaults, accessible by default, and align with current usage patterns.

- Public API
  - Props
    - `variant?: 'solid' | 'outline' | 'subtle' | 'icon'` (default: `'solid'`)
    - `isLoading?: boolean` (do not implement; optional example provided below)
    - `className?: string`
    - `children: React.ReactNode`
    - Native button props or anchor props (polymorphic via `href`)
  - Polymorphism
    - Renders `button` by default with `type="button"`.
    - If `href` is provided, renders `a`.
  - Icons
    - Use composition (consumers pass icons as children).
    - For icon-only, use `variant="icon"` and require accessible `aria-label`.
  - Disabled semantics
    - For `button`: use native `disabled`.
    - For `a`: use `aria-disabled`, prevent default click, and avoid navigation.
  - Class composition
    - Use `classnames` (`cx`).
  - Sizes
    - Follow `buttons.js` only: default, and `.btn-icon` for icon-only. No additional sizes.
  - Full width
    - No dedicated prop. Consumers can pass `w-full` via `className`.

- Variant-class mapping (based on `buttons.js`)
  - `solid` → `btn`
  - `outline` → `btn-outline`
  - `subtle` → `btn-subtle`
  - `icon` → `btn-subtle btn-icon` (matches current usage; adjust later if you want other tones)

- Implementation notes
  - Forward refs for both `button` and `a` elements.
  - Discriminated props:
    - `interface ButtonBaseProps { variant?: ...; className?: string; children: React.ReactNode }`
    - `interface AnchorProps extends ButtonBaseProps, React.AnchorHTMLAttributes<HTMLAnchorElement> { href: string }`
    - `interface NativeButtonProps extends ButtonBaseProps, React.ButtonHTMLAttributes<HTMLButtonElement> { href?: undefined; type?: 'button' | 'submit' | 'reset' }`
    - `type ButtonProps = AnchorProps | NativeButtonProps`
  - Element selection:
    - If `href`, render `a` and set `rel="noopener noreferrer"` when `target="_blank"`.
  - Loading (do not implement):
    - When `isLoading`, render a small inline SVG spinner before children, set `aria-busy="true"`, and disable interactions (`disabled` or `aria-disabled` with click prevent).
    - Preserve layout by keeping children in DOM with reduced opacity or `visibility: hidden`.
  - Accessibility:
    - Require `aria-label` when `variant="icon"` and there’s no visible text.
    - Pass through `aria-*` props.
  - Keep styles source-of-truth in Tailwind plugin; `Button` only composes classes.

- Component skeleton (example)
```tsx
import React from 'react';
import cx from 'classnames';

interface ButtonBaseProps {
  variant?: 'solid' | 'outline' | 'subtle' | 'icon';
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface AnchorProps extends ButtonBaseProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

interface NativeButtonProps extends ButtonBaseProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
  type?: 'button' | 'submit' | 'reset';
}

export type ButtonProps = AnchorProps | NativeButtonProps;

const variantToClass = {
  solid: 'btn',
  outline: 'btn-outline',
  subtle: 'btn-subtle',
  icon: 'btn-subtle btn-icon',
} as const;

export function Button(props: ButtonProps) {
  const {
    variant = 'solid',
    isLoading = false,
    className,
    children,
    ...rest
  } = props as ButtonProps;

  const classes = cx(variantToClass[variant], className, {
    'pointer-events-none': isLoading,
  });

  if ('href' in props && props.href) {
    const { href, onClick, target, rel, ...anchorRest } = rest as AnchorProps;
    const finalRel = target === '_blank' ? (rel ? rel : 'noopener noreferrer') : rel;
    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
      if (isLoading || (anchorRest as any)['aria-disabled']) e.preventDefault();
      if (onClick) onClick(e);
    };
    return (
      <a
        {...anchorRest}
        href={href}
        className={classes}
        aria-disabled={isLoading || (anchorRest as any)['aria-disabled'] ? true : undefined}
        onClick={handleClick}
        target={target}
        rel={finalRel}
      >
        {children}
      </a>
    );
  }

  const { type = 'button', ...buttonRest } = rest as NativeButtonProps;
  return (
    <button
      {...buttonRest}
      type={type}
      className={classes}
      disabled={isLoading || (buttonRest as any).disabled}
      aria-busy={isLoading || undefined}
    >
      {children}
    </button>
  );
}
```

- Examples
  - Solid (default):
    - `<Button>Save</Button>`
  - Outline link:
    - `<Button href="/docs" variant="outline">Docs</Button>`
  - Subtle with leading icon via composition:
    - `<Button variant="subtle"><Icon /> Settings</Button>`
  - Icon-only:
    - `<Button variant="icon" aria-label="Settings"><GearIcon /></Button>`
  - Loading (example):
    - `<Button isLoading>Saving…</Button>`

- Refactor targets (follow-up task)
  - `src/features/utility-bar/DirectLink.tsx`
  - `src/features/utility-bar/ToggleFullscreen.tsx`
  - `src/features/utility-bar/ToggleTheme.tsx`
  - `src/features/utility-bar/ToggleSettingsDialog.tsx`
  - `src/features/utility-bar/ToggleViewportDropdown.tsx`
  - `src/components/Dialog.tsx` (close button)
  - `src/features/settings/SettingsPanel.tsx` (footer actions: Cancel/Save)
  - Optional: search for `className="btn` project-wide and replace where appropriate.

- Notes
  - No tests now.
  - Future enhancement: if icon buttons need multiple tones (`solid|outline|subtle` + `icon`), consider introducing a second prop (e.g., `tone`) rather than overloading `variant`.

I can implement this next; say the word and I’ll add `src/components/Button.tsx` and wire up the examples.
