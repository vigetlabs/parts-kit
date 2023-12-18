import { useState } from 'preact/hooks'
import { DEFAULT_NAV_URL, useSettingsStore } from './store'
import { Dialog } from '../../components/Dialog'

export default function () {
  const settings = useSettingsStore()
  const [localNavUrl, setLocalNavUrl] = useState(settings.configUrl)
  return (
    <div className="pk-flex pk-flex-col pk-gap-6">
      <h2 className="pk-text-md pk-font-bold pk-uppercase">Settings</h2>
      <div className="pk-flex pk-flex-col pk-gap-2">
        <label
          className="pk-text-xs pk-font-medium pk-uppercase"
          for="parts-json-url"
        >
          Parts JSON URL
        </label>
        <input
          className="pk-block pk-h-8 pk-w-full pk-rounded pk-bg-white pk-px-4 pk-placeholder-gray-500 pk-ring-1 pk-ring-gray-300 pk-transition hover:pk-bg-gray-50 hover:pk-ring-gray-400 focus:pk-outline-none focus:pk-ring-blue-400 focus-visible:pk-ring-2 dark:pk-bg-gray-700 dark:pk-text-white dark:pk-ring-gray-500 dark:hover:pk-bg-gray-700/75 dark:focus:pk-ring-blue-400"
          id="parts-json-url"
          value={localNavUrl}
          onInput={(e) => setLocalNavUrl(e.currentTarget.value)}
        />
        <p className="pk-text-xs pk-text-gray-500 pk-transition-colors dark:pk-text-gray-400">
          Your parts kit URLs need to have appropriate CORS and no
          X-Frame-Options restrictions. You can use a Chrome Plugin like
          Requestly to bypass these headers.
        </p>
      </div>
      <div className="pk-flex pk-justify-end pk-gap-2">
        <Dialog.Close className="pk-btn-outline">Cancel</Dialog.Close>
        <Dialog.Close
          className="btn"
          onClick={() =>
            settings.setConfigUrl(localNavUrl.trim() || DEFAULT_NAV_URL)
          }
        >
          Save Settings
        </Dialog.Close>
      </div>
    </div>
  )
}
