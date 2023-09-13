import { GearIcon } from '@radix-ui/react-icons'
import { useUtilityBarStore } from '../utility-bar/store'

export default function () {
  const utility = useUtilityBarStore()

  return (
    <div className="max-w-lg px-3 py-10 mx-auto space-y-3">
      <h1 className="text-xl font-bold">👋 Welcome!</h1>
      <p>
        This is a demo of a "decoupled" parts kit. To get started, simply click
        a parts link on the left.
      </p>
      <p>
        If you'd like to try this out with your own JSON. Click the{' '}
        <button
          className="text-blue-600 hover:underline"
          onClick={() => utility.setIsSettingsVisible(true)}
        >
          <GearIcon className="inline" /> settings button
        </button>{' '}
        in the top menu bar.
      </p>
      <p>
        Curious what a decoupled parts kit is?{' '}
        <a
          className="text-blue-600 underline"
          href="https://github.com/vigetlabs/parts-kit"
        >
          📚 Check out the docs
        </a>
        .
      </p>
    </div>
  )
}
