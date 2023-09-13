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
        className="block w-full h-8 pl-10 pr-2 placeholder-gray-500 transition-colors bg-white border border-gray-300 rounded-full focus:border-blue-400 focus:outline-none hover:border-gray-400 hover:bg-gray-50"
        placeholder="Search"
        aria-label="search"
        onInput={props.onInput}
      />
    </div>
  )
}
