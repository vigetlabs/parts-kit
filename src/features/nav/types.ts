export interface NavItemInterface {
  /**
    The title of the nav item
  */
  title: string
  /**
    The url of the nav item
  */
  url: string | null
  /**
    The children of the nav item
  */
  children: NavItemInterface[]
  /**
    Whether or not the nav item is a docs page.

    If doc is true, the nav item iframe will not be resizable.
    */
  doc?: boolean
}
