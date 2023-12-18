import { GearIcon } from '@radix-ui/react-icons'
import { Dialog } from '../../components/Dialog'
import SettingsPanel from '../../features/settings/SettingsPanel'
import { useUtilityBarStore } from './store'

export default function () {
  const store = useUtilityBarStore()

  return (
    <Dialog.Root
      open={store.isSettingsOpen}
      onOpenChange={() => store.setIsSettingsOpen(!store.isSettingsOpen)}
      trigger={
        <button
          className="pk-btn-subtle pk-btn-icon"
          title="Settings [Shift + S]"
        >
          <GearIcon />
        </button>
      }
    >
      <SettingsPanel />
    </Dialog.Root>
  )
}
