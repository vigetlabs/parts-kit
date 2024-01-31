import { useEffect } from 'preact/hooks'

interface Params {
  onMessage(e: MessageEvent): void
}

/**
 * Use hooks to listen to postMessage events
 */
export function usePostMessageReceiver(params: Params) {
  useEffect(() => {
    window.addEventListener('message', params.onMessage)

    return () => window.removeEventListener('message', params.onMessage)
  })
}
