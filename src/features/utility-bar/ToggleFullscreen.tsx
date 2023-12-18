import { CrossCircledIcon, EnterFullScreenIcon } from '@radix-ui/react-icons'
import { useUtilityBarStore } from './store'

export default function () {
  const utilityStore = useUtilityBarStore()

  return (
    <button
      className="pk-btn-subtle pk-btn-icon"
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
