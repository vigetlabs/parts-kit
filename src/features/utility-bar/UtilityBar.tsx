import { useUtilityBarStore } from './store'
import cx from 'classnames'

import ToggleFullscreen from './ToggleFullscreen'
import ToggleTheme from './ToggleTheme'
import ToggleViewportDropdown from './ToggleViewportDropdown'
import ToggleSettingsDialog from './ToggleSettingsDialog'

interface UtilityBarProps {
  showSettings: boolean
  isDoc: boolean
}

export default function (props: UtilityBarProps) {
  const store = useUtilityBarStore()

  return (
    <div>
      <header
        className={cx(
          'flex h-10 justify-between gap-4 border-l border-white bg-gray-100 px-4 transition dark:border-gray-500 dark:bg-gray-700',
          {
            'border-gray-100 dark:border-gray-700': !store.isNavBarVisible,
          },
        )}
      >
        <div className="flex items-center gap-2">
          {/* Theme Control */}
          <ToggleTheme />

          {/* Viewport Dropdown Controls */}
          <ToggleViewportDropdown isDoc={props.isDoc} />
        </div>

        <div className="flex items-center gap-2">
          {/* Settings Control */}
          {props.showSettings && <ToggleSettingsDialog />}

          {/* Fullscreen control */}
          <ToggleFullscreen />
        </div>
      </header>
    </div>
  )
}
