import { CrossCircledIcon, EnterFullScreenIcon } from '@radix-ui/react-icons'
import { useUtilityBarStore } from '../features/utility-bar/store'

export default function () {
  const utilityStore = useUtilityBarStore()

  return (
    <button
      className="btn-subtle btn-icon"
      title={
        utilityStore.isNavBarVisible
          ? 'Go Fullscreen [F]'
          : 'Exit Fullscreen [F]'
      }
      onClick={() =>
        utilityStore.setIsNavBarVisible(!utilityStore.isNavBarVisible)
      }
    >
      {utilityStore.isNavBarVisible ? (
        <EnterFullScreenIcon />
      ) : (
        <CrossCircledIcon />
      )}
    </button>
  )
}
