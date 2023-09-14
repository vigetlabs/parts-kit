import cx from 'classnames'
import { screenSizes, useUtilityBarStore } from './store'
import SettingsPanel from '../settings/SettingsPanel'
import { Dropdown, DropdownMenu } from '../../components/Dropdown'
import {
  AspectRatioIcon,
  BlendingModeIcon,
  EnterFullScreenIcon,
  GearIcon,
} from '@radix-ui/react-icons'

interface UtilityBarProps {
  showSettings: boolean
}

export default function (props: UtilityBarProps) {
  const store = useUtilityBarStore()

  return (
    <div>
      <header className="flex justify-between h-10 gap-4 px-4 bg-gray-100 border-l border-white">
        <div className="flex items-center gap-2">
          {/* Theme Control */}
          <button className="btn-subtle btn-icon" title="Theme">
            <BlendingModeIcon />
          </button>

          {/* Screen Size Menu */}
          {screenSizes.length > 0 && (
            <Dropdown
              trigger={
                <button className="btn-subtle btn-icon" title="Viewport Size">
                  <AspectRatioIcon />
                </button>
              }
            >
              <>
                <DropdownMenu.RadioGroup value={store.activeScreenSize}>
                  {screenSizes.map((item) => (
                    <DropdownMenu.RadioItem
                      key={item.size}
                      value={item.size}
                      onClick={() => store.setActiveScreenSize(item.size)}
                      className="dropdown-item"
                    >
                      {item.title}
                    </DropdownMenu.RadioItem>
                  ))}
                </DropdownMenu.RadioGroup>
                <DropdownMenu.Separator className="dropdown-separator" />
                <DropdownMenu.Item className="dropdown-item">
                  Responsive
                </DropdownMenu.Item>
              </>
            </Dropdown>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Show / Hide Settings */}
          {props.showSettings ? (
            <button
              className="btn-subtle btn-icon"
              onClick={() =>
                store.setIsSettingsVisible(!store.isSettingsVisible)
              }
              title="Settings"
              aria-expanded={store.isSettingsVisible}
            >
              <GearIcon />
            </button>
          ) : null}

          {/* Fullscreen control */}
          <button className="btn-subtle btn-icon" title="Fullscreen">
            <EnterFullScreenIcon />
          </button>
        </div>
      </header>

      {/* Settings Panel */}
      {store.isSettingsVisible ? <SettingsPanel /> : null}
    </div>
  )
}
