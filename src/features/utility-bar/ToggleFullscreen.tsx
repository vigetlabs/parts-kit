import { CrossCircledIcon, EnterFullScreenIcon } from '@radix-ui/react-icons'
import { useUtilityBarStore } from './store'
import { Button } from '../../components/Button'

export default function () {
  const utilityStore = useUtilityBarStore()

  return (
    <Button
      variant="icon"
      title={
        utilityStore.isNavBarVisible
          ? 'Go Fullscreen [F]'
          : 'Exit Fullscreen [F]'
      }
      aria-label={
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
    </Button>
  )
}
