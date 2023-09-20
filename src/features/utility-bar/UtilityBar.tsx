import { screenSizes, useUtilityBarStore } from './store'
import SettingsPanel from '../settings/SettingsPanel'
import { Dropdown } from '../../components/Dropdown'
import {
  AspectRatioIcon,
  BlendingModeIcon,
  GearIcon,
} from '@radix-ui/react-icons'
import { Dialog } from '../../components/Dialog'
import ToggleFullscreen from '../../components/ToggleFullscreen'

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
            <Dropdown.Root
              onOpenChange={() =>
                store.setIsViewportOpen(!store.isViewportOpen)
              }
              open={store.isViewportOpen}
              trigger={
                <button
                  className="btn-subtle btn-icon"
                  title="Viewport Size [Shift + V]"
                >
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
          <ToggleFullscreen />
        </div>
      </header>
    </div>
  )
}
