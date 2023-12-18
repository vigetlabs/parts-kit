import { JSX } from 'preact'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

interface SearchProps {
  onInput?: JSX.IntrinsicElements['input']['onInput']
}

export function Search(props: SearchProps) {
  return (
    <div className="pk-relative pk-flex pk-items-center">
      <MagnifyingGlassIcon
        className="pk-pointer-events-none pk-absolute pk-left-4 pk-flex pk-h-5 pk-w-5 pk-items-center pk-text-gray-400"
        aria-hidden="true"
      />
      <input
        type="search"
        className="pk-block pk-h-8 pk-w-full pk-rounded-full pk-bg-white pk-pl-10 pk-pr-2 pk-placeholder-gray-500 pk-ring-1 pk-ring-gray-300 pk-transition hover:pk-bg-gray-50 hover:pk-ring-gray-400 focus:pk-outline-none focus:pk-ring-blue-400 focus-visible:pk-ring-2 dark:pk-bg-gray-700 dark:pk-text-white dark:pk-ring-gray-500 dark:hover:pk-bg-gray-700/75 dark:focus:pk-ring-blue-400"
        placeholder="Search"
        aria-label="search"
        onInput={props.onInput}
      />
    </div>
  )
}
