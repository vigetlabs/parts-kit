import SettingsPanel from '../settings/SettingsPanel'
import { screenSizes, useUtilityBarStore } from './store'
import cx from 'classnames'

interface UtilityBarProps {
  showSettings: boolean
}

export default function (props: UtilityBarProps) {
  const store = useUtilityBarStore()

  return (
    <div>
      <div className="flex items-stretch justify-start text-sm border-b divide-x divide-neutral-200 border-neutral-200">
        <div className="flex items-center px-4 py-3 text-xs font-semibold uppercase">
          Screen Size
        </div>
        {screenSizes.map((item) => (
          <button
            onClick={() => store.setActiveScreenSize(item.size)}
            className={cx(
              'relative py-3 px-4 hover:text-sky-700 hover:bg-neutral-100 group',
              {
                'text-sky-500': item.size === store.activeScreenSize,
              },
            )}
          >
            {item.title}
            {item.size === store.activeScreenSize ? (
              <span className="absolute inset-x-0 bottom-1.5 mx-auto w-1 h-1 rounded-full bg-sky-500 group-hover:bg-sky-700"></span>
            ) : null}
          </button>
        ))}
        {/* Show / hide settings */}
        {props.showSettings ? (
          <button
            className="px-4 text-sm font-medium"
            onClick={() => store.setIsSettingsVisible(!store.isSettingsVisible)}
          >
            {store.isSettingsVisible ? '× Hide' : '⚙️ Show'} Settings
          </button>
        ) : null}
      </div>

      {/* Settings Panel */}
      {store.isSettingsVisible ? <SettingsPanel /> : null}
    </div>
  )
}
