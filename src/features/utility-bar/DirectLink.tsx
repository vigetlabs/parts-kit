import { Link1Icon } from '@radix-ui/react-icons'

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
    <a
      className="btn-subtle btn-icon"
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      title="Open direct link"
    >
      <Link1Icon />
    </a>
  )
}


