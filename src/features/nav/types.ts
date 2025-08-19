export interface FlatNavItemInterface {
  /** The title of the nav item */
  title: string
  /** The url of the nav item */
  url: string | null
  /**
   * Whether or not the nav item is a docs page.
   * If doc is true, the nav item iframe will not be resizable.
   */
  doc?: boolean
}

export interface NavItemInterface extends FlatNavItemInterface {
  /**
   * The children of the nav item
   */
  children: NavItemInterface[]
}
