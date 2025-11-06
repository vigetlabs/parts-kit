import {
  findFirstNavItem,
  findNavItemByUrl,
  searchParamFromPath,
  getPathFromSearchParams,
} from './routing'
import { NavItemInterface } from './Nav'

describe('getPathFromSearchParams', () => {
  it('returns path param when present', () => {
    const searchParams = new URLSearchParams('path=/some/path')
    const result = getPathFromSearchParams(searchParams)
    expect(result).toBe('/some/path')
  })

  it('returns legacy part param when path is not present', () => {
    const searchParams = new URLSearchParams('part=/legacy/path')
    const result = getPathFromSearchParams(searchParams)
    expect(result).toBe('/legacy/path')
  })

  it('prefers path param over legacy part param when both are present', () => {
    const searchParams = new URLSearchParams('path=/new/path&part=/old/path')
    const result = getPathFromSearchParams(searchParams)
    expect(result).toBe('/new/path')
  })

  it('returns null when neither param is present', () => {
    const searchParams = new URLSearchParams('other=value')
    const result = getPathFromSearchParams(searchParams)
    expect(result).toBeNull()
  })

  it('returns null when search params are empty', () => {
    const searchParams = new URLSearchParams('')
    const result = getPathFromSearchParams(searchParams)
    expect(result).toBeNull()
  })
})

describe('searchParamFromPath', () => {
  it('preserves forward slashes unencoded', () => {
    const input = '/path/to/resource'
    const result = searchParamFromPath(input)
    expect(result).toBe('?path=/path/to/resource')
    expect(result).not.toContain('%2F')
  })

  it('encodes special characters but keeps slashes', () => {
    const input = '/path with spaces/file.html'
    const result = searchParamFromPath(input)
    expect(result).toBe('?path=/path%20with%20spaces/file.html')
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
