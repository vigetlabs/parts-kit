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
          'pk-flex pk-h-10 pk-justify-between pk-gap-4 pk-border-l pk-border-white pk-bg-gray-100 pk-px-4 pk-transition dark:pk-border-gray-500 dark:pk-bg-gray-700',
          {
            'pk-border-gray-100 dark:pk-border-gray-700':
              !store.isNavBarVisible,
          },
        )}
      >
        <div className="pk-flex pk-items-center pk-gap-2">
          {/* Theme Control */}
          <ToggleTheme />

          {/* Viewport Dropdown Controls */}
          <ToggleViewportDropdown isDoc={props.isDoc} />
        </div>

        <div className="pk-flex pk-items-center pk-gap-2">
          {/* Settings Control */}
          {props.showSettings && <ToggleSettingsDialog />}

          {/* Fullscreen control */}
          <ToggleFullscreen />
        </div>
      </header>
    </div>
  )
}
