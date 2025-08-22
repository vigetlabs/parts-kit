import { GearIcon } from '@radix-ui/react-icons'
import { Dialog } from '../../components/Dialog'
import SettingsPanel from '../../features/settings/SettingsPanel'
import { useUtilityBarStore } from './store'
import { Button } from '../../components/Button'

export default function () {
  const store = useUtilityBarStore()

  return (
    <Dialog.Root
      open={store.isSettingsOpen}
      onOpenChange={() => store.setIsSettingsOpen(!store.isSettingsOpen)}
      trigger={
        <Button variant="icon" title="Settings [Shift + S]" aria-label="Settings [Shift + S]">
          <GearIcon />
        </Button>
      }
    >
      <SettingsPanel />
    </Dialog.Root>
  )
}
