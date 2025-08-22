import { Link1Icon } from '@radix-ui/react-icons'
import { Button } from '../../components/Button'

interface DirectLinkProps {
  url?: string
}

export function DirectLink({
  url,
}: DirectLinkProps) {
  if (!url) {
    return null
  }

  // TODO eventually refactor to use a button component
  return (
    <Button
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      variant="icon"
      aria-label="Open direct link"
      title="Open direct link"
    >
      <Link1Icon />
    </Button>
  )
}


