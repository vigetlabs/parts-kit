import { useEffect } from 'preact/hooks'
import { AspectRatioIcon } from '@radix-ui/react-icons'
import {
  ScreenSize,
  screenSizes,
  useUtilityBarStore,
} from '../../features/utility-bar/store'
import { Dropdown } from '../../components/Dropdown'
import { Button } from '../../components/Button'

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
            <Button
              variant="icon"
              title="Viewport Size [Shift + V]"
              aria-label="Viewport Size [Shift + V]"
              disabled={props.isDoc}
            >
              <AspectRatioIcon />
            </Button>
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
                    className="dropdown-item"
                  >
                    {item.title}
                  </Dropdown.RadioItem>
                )
              })}
            </Dropdown.RadioGroup>
            <Dropdown.Separator className="dropdown-separator" />
            <Dropdown.Item className="dropdown-item">Responsive</Dropdown.Item>
          </>
        </Dropdown.Root>
      )}
    </>
  )
}
