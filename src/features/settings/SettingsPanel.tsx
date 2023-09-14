import { useState } from 'preact/hooks'
import { DEFAULT_NAV_URL, useSettingsStore } from './store'

export default function () {
  const settings = useSettingsStore()
  const [localNavUrl, setLocalNavUrl] = useState(settings.configUrl)
  return (
    <div className="bg-gray-200 p-5 space-y-3">
      <div className="max-w-md">
        <label className="text-xs uppercase font-medium" for="parts-json-url">
          Parts JSON URL
        </label>
        <input
          className="block w-full p-2 text-xs rounded"
          id="parts-json-url"
          value={localNavUrl}
          onInput={(e) => setLocalNavUrl(e.currentTarget.value)}
        />
        <div className="text-xs mt-2">
          Your parts kit URLs need to have appropriate CORS and no
          X-Frame-Options restrictions. You can use a Chrome Plugin like
          Requestly to bypass these headers.
        </div>
      </div>
      <button
        className="bg-gray-700 text-white text-xs uppercase font-medium px-4 py-3 rounded"
        onClick={() =>
          settings.setConfigUrl(localNavUrl.trim() || DEFAULT_NAV_URL)
        }
      >
        Save Settings
      </button>
    </div>
  )
}
