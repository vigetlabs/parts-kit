import { AspectRatioIcon } from '@radix-ui/react-icons'
import {
  screenSizes,
  useUtilityBarStore,
} from '../../features/utility-bar/store'
import { Dropdown } from '../../components/Dropdown'

export default function () {
  const store = useUtilityBarStore()

  return (
    <>
      {screenSizes.length > 0 && (
        <Dropdown.Root
          open={store.isViewportOpen}
          onOpenChange={() => store.setIsViewportOpen(!store.isViewportOpen)}
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
            <Dropdown.Item className="dropdown-item">Responsive</Dropdown.Item>
          </>
        </Dropdown.Root>
      )}
    </>
  )
}
