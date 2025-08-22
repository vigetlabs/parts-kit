import { useState } from 'preact/hooks'
import { DEFAULT_NAV_URL, useSettingsStore } from './store'
import { Button } from '../../components/Button'
import { Dialog } from '../../components/Dialog'

export default function () {
  const settings = useSettingsStore()
  const [localNavUrl, setLocalNavUrl] = useState(settings.configUrl)
  return (
    <div data-testid="SettingsPanel" className="flex flex-col gap-6">
      <h2 className="text-md font-bold uppercase">Settings</h2>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium uppercase" for="parts-json-url">
          Parts JSON URL
        </label>
        <input
          className="block h-8 w-full rounded bg-white px-4 placeholder-gray-500 ring-1 ring-gray-300 transition hover:bg-gray-50 hover:ring-gray-400 focus:outline-none focus:ring-blue-400 focus-visible:ring-2 dark:bg-gray-700 dark:text-white dark:ring-gray-500 dark:hover:bg-gray-700/75 dark:focus:ring-blue-400"
          id="parts-json-url"
          value={localNavUrl}
          onInput={(e) => setLocalNavUrl(e.currentTarget.value)}
        />
        <p className="text-xs text-gray-500 transition-colors dark:text-gray-400">
          Your parts kit URLs need to have appropriate CORS and no
          X-Frame-Options restrictions. You can use a Chrome Plugin like
          Requestly to bypass these headers.
        </p>
      </div>
      <div className="flex justify-end gap-2">
        <Dialog.Close asChild>
          <Button variant="outline">Cancel</Button>
        </Dialog.Close>
        <Dialog.Close asChild>
          <Button
            onClick={() =>
              settings.setConfigUrl(localNavUrl.trim() || DEFAULT_NAV_URL)
            }
          >
            Save Settings
          </Button>
        </Dialog.Close>
      </div>
    </div>
  )
}
