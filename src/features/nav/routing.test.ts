import { findFirstNavItem, findNavItemByUrl, escapePath } from './routing'
import { NavItemInterface } from './Nav'

describe('escapePath', () => {
  it('preserves forward slashes unencoded', () => {
    const input = '/path/to/resource'
    const result = escapePath(input)
    expect(result).toBe('/path/to/resource')
    expect(result).not.toContain('%2F')
  })

  it('encodes special characters but keeps slashes', () => {
    const input = '/path with spaces/file.html'
    const result = escapePath(input)
    expect(result).toBe('/path%20with%20spaces/file.html')
    expect(result).toContain('/')
    expect(result).not.toContain('%2F')
  })
})

describe('findNavItemByUrl', () => {
  it('finds a nav item in list', () => {
    const result = findNavItemByUrl('/match', [
      {
        title: 'No match',
        url: '/not-a-match',
        children: [],
      },
      {
        title: 'Match',
        url: '/match',
        children: [],
      },
    ])

    expect(result).toStrictEqual<NavItemInterface>({
      title: 'Match',
      url: '/match',
      children: [],
    })
  })

  it("doesn't find nav item if not in list", () => {
    expect(
      findNavItemByUrl('/no-match', [
        {
          title: 'Nooope',
          url: '/noope',
          children: [],
        },
      ]),
    ).toBeUndefined()
  })

  it('finds child', () => {
    expect(
      findNavItemByUrl('/has-child/child', [
        {
          title: 'Has Child',
          url: '/has-child',
          children: [
            {
              title: 'Child',
              url: '/has-child/child',
              children: [],
            },
          ],
        },
        {
          title: 'No match',
          url: '/not-a-match',
          children: [],
        },
      ]),
    ).toStrictEqual({
      title: 'Child',
      url: '/has-child/child',
      children: [],
    })
  })

  it('finds grandchild', () => {
    expect(
      findNavItemByUrl('/grandparent/child/grandchild', [
        {
          title: 'Grandparent',
          url: '/grandparent',
          children: [
            {
              title: 'Child',
              url: '/grandparent/child',
              children: [
                {
                  title: 'Grandchild',
                  url: '/grandparent/child/grandchild',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          title: 'No match',
          url: '/not-a-match',
          children: [],
        },
      ]),
    ).toStrictEqual({
      title: 'Grandchild',
      url: '/grandparent/child/grandchild',
      children: [],
    })
  })
})

describe('findFirstNavItem', () => {
  it('finds first nav item in top of list', () => {
    const result = findFirstNavItem({
      title: 'Nav Item',
      url: '',
      children: [
        {
          title: 'Found',
          url: 'button.html',
          children: [],
        },
      ],
    })

    expect(result).toStrictEqual({
      title: 'Found',
      url: 'button.html',
      children: [],
    })
  })
})
