import { JSX } from 'preact'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

interface SearchProps {
  onInput?: JSX.IntrinsicElements['input']['onInput']
}

export function Search(props: SearchProps) {
  return (
    <div className="relative flex items-center">
      <MagnifyingGlassIcon
        className="absolute flex items-center w-5 h-5 text-gray-400 pointer-events-none left-4"
        aria-hidden="true"
      />
      <input
        type="search"
        className="block w-full h-8 pl-10 pr-2 placeholder-gray-500 transition bg-white rounded-full ring-1 ring-gray-300 hover:bg-gray-50 hover:ring-gray-400 focus:outline-none focus:ring-blue-400 focus-visible:ring-2 dark:bg-gray-700 dark:text-white dark:ring-gray-500 dark:hover:bg-gray-700/75 dark:focus:ring-blue-400"
        placeholder="Search"
        aria-label="search"
        onInput={props.onInput}
      />
    </div>
  )
}
