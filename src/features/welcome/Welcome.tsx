import { GearIcon } from '@radix-ui/react-icons'
import { useUtilityBarStore } from '../utility-bar/store'

export default function () {
  const utility = useUtilityBarStore()

  return (
    <div className="pk-mx-auto pk-max-w-lg pk-space-y-3 pk-px-3 pk-py-10">
      <h1 className="pk-text-xl pk-font-bold">👋 Welcome!</h1>
      <p>
        This is a demo of a "decoupled" parts kit. To get started, simply click
        a parts link on the left.
      </p>
      <p>
        If you'd like to try this out with your own JSON. Click the{' '}
        <button
          className="pk-text-blue-600 hover:pk-underline"
          onClick={() => utility.setIsSettingsVisible(true)}
        >
          <GearIcon className="pk-inline" /> settings button
        </button>{' '}
        in the top menu bar.
      </p>
      <p>
        Curious what a decoupled parts kit is?{' '}
        <a
          className="pk-text-blue-600 pk-underline"
          href="https://github.com/vigetlabs/parts-kit"
        >
          📚 Check out the docs
        </a>
        .
      </p>
    </div>
  )
}
