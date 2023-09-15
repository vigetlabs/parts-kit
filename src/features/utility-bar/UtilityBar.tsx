import { screenSizes, useUtilityBarStore } from './store'
import SettingsPanel from '../settings/SettingsPanel'
import { Dropdown } from '../../components/Dropdown'
import {
  AspectRatioIcon,
  BlendingModeIcon,
  EnterFullScreenIcon,
  GearIcon,
} from '@radix-ui/react-icons'
import { Dialog } from '../../components/Dialog'

interface UtilityBarProps {
  showSettings: boolean
}

export default function (props: UtilityBarProps) {
  const store = useUtilityBarStore()

  return (
    <div>
      <header className="flex h-10 justify-between gap-4 border-l border-white bg-gray-100 px-4">
        <div className="flex items-center gap-2">
          {/* Theme Control */}
          <button className="btn-subtle btn-icon" title="Theme">
            <BlendingModeIcon />
          </button>

          {/* Screen Size Menu */}
          {screenSizes.length > 0 && (
            <Dropdown.Root
              trigger={
                <button className="btn-subtle btn-icon" title="Viewport Size">
                  <AspectRatioIcon />
                </button>
              }
            >
              <>
                <Dropdown.RadioGroup value={store.activeScreenSize}>
                  {screenSizes.map((item) => (
                    <Dropdown.RadioItem
                      key={item.size}
                      value={item.size}
                      onClick={() => store.setActiveScreenSize(item.size)}
                      className="dropdown-item"
                    >
                      {item.title}
                    </Dropdown.RadioItem>
                  ))}
                </Dropdown.RadioGroup>
                <Dropdown.Separator className="dropdown-separator" />
                <Dropdown.Item className="dropdown-item">
                  Responsive
                </Dropdown.Item>
              </>
            </Dropdown.Root>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Show / Hide Settings */}
          {props.showSettings && (
            <Dialog.Root
              trigger={
                <button className="btn-subtle btn-icon" title="Settings">
                  <GearIcon />
                </button>
              }
            >
              <SettingsPanel />
            </Dialog.Root>
          )}

          {/* Fullscreen control */}
          <button className="btn-subtle btn-icon" title="Fullscreen">
            <EnterFullScreenIcon />
          </button>
        </div>
      </header>
    </div>
  )
}
