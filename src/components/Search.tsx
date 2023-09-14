import { JSX } from 'preact'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

interface SearchProps {
  onInput?: JSX.IntrinsicElements['input']['onInput']
}

export function Search(props: SearchProps) {
  return (
    <div className="relative flex items-center">
      <MagnifyingGlassIcon
        className="pointer-events-none absolute left-4 flex h-5 w-5 items-center text-gray-400"
        aria-hidden="true"
      />
      <input
        type="search"
        className="block h-8 w-full rounded-full bg-white pl-10 pr-2 placeholder-gray-500 ring-1 ring-gray-300 transition hover:bg-gray-50 hover:ring-gray-400 focus:outline-none focus:ring-blue-400 focus-visible:ring-2"
        placeholder="Search"
        aria-label="search"
        onInput={props.onInput}
      />
    </div>
  )
}
