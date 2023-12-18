import { useEffect } from 'preact/hooks'
import { AspectRatioIcon } from '@radix-ui/react-icons'
import {
  ScreenSize,
  screenSizes,
  useUtilityBarStore,
} from '../../features/utility-bar/store'
import { Dropdown } from '../../components/Dropdown'

interface ToggleViewportDropdownProps {
  isDoc?: boolean
}

export default function (props: ToggleViewportDropdownProps) {
  const store = useUtilityBarStore()

  // When on doc page, set active screen size to desktop
  useEffect(() => {
    if (props.isDoc) {
      store.setActiveScreenSize(ScreenSize.Desktop)
    }
  }, [props.isDoc])

  return (
    <>
      {screenSizes.length > 0 && (
        <Dropdown.Root
          open={store.isViewportOpen}
          onOpenChange={() =>
            props.isDoc || store.setIsViewportOpen(!store.isViewportOpen)
          }
          trigger={
            <button
              className="pk-btn-subtle pk-btn-icon"
              title="Viewport Size [Shift + V]"
              disabled={props.isDoc}
            >
              <AspectRatioIcon />
            </button>
          }
        >
          <>
            <Dropdown.RadioGroup value={store.activeScreenSize}>
              {screenSizes.map((item) => {
                return (
                  <Dropdown.RadioItem
                    key={item.size}
                    value={item.size}
                    onClick={() => store.setActiveScreenSize(item.size)}
                    className="pk-dropdown-item"
                  >
                    {item.title}
                  </Dropdown.RadioItem>
                )
              })}
            </Dropdown.RadioGroup>
            <Dropdown.Separator className="pk-dropdown-separator" />
            <Dropdown.Item className="pk-dropdown-item">
              Responsive
            </Dropdown.Item>
          </>
        </Dropdown.Root>
      )}
    </>
  )
}
