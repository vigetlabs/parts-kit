import {useState} from "preact/hooks";
import "./app.css";
import cx from 'classnames'
import {Nav} from "./components/Nav";
import {useEffect} from "preact/compat";
import {NavItem} from "./components/NavItem.tsx";

/** Make this configurable */
const NAV_URL = '/nav.json';

export interface NavItem {
  title: string;
  url: string | null;
  children: NavItem[];
}

enum ScreenSize {
  Mobile,
  Tablet,
  Desktop,
}

const screenSizes = [
  {
    title: "Mobile",
    size: ScreenSize.Mobile,
  },
  {
    title: "Tablet",
    size: ScreenSize.Tablet,
  },
  {
    title: "Desktop",
    size: ScreenSize.Desktop,
  },
];
const screenSizeMap = {
  [ScreenSize.Mobile]: 375,
  [ScreenSize.Tablet]: 768,
  [ScreenSize.Desktop]: undefined,
}

export function App() {
  const [nav, setNav] = useState([]);

  const loadNav = async (url: string) => {
    const response = await fetch(url, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error('Coudnt load')
    }

    const data = await response.json()

    setNav(data)
  };

  useEffect(() => {
    loadNav(NAV_URL)
  }, [])

  if (nav.length === 0) {
    return (<div>Loading</div>)
  }

  const findViableNavItem = (item:NavItem) :NavItem|undefined => {
    if (item.url) {
      return item
    }

    return item.children.find(item => !!item.url)
  }

  const firstNavItem = findViableNavItem(nav[0]);

  if(firstNavItem === undefined) {
    return (<div>Could not find viable nav item</div>)
  }

  const [activeNavItem, setActiveNavItem] = useState<NavItem>(firstNavItem);
  const [activeScreenSize, setActiveScreenSize] = useState(ScreenSize.Desktop);
  const activeScreenWidth = screenSizeMap[activeScreenSize]

  const setViableNavItem = (item:NavItem): void => {
    const viableItem = findViableNavItem(item);

    if (viableItem === undefined) {
      console.error('Cant find viable nav item for ', item);
      return
    }
    setActiveNavItem(viableItem)
  }

  return (
    <div className="bg-gray-100 grid grid-cols-[250px,_1fr] h-screen p-2 pl-0">
      <div className="py-1 overflow-auto">
        <Nav activeNavItem={activeNavItem} nav={nav} setActiveNavItem={setViableNavItem}/>
      </div>

      <div className="flex flex-col shadow-sm bg-white rounded-md">
        {/* Utility bar */}
        <div className="flex justify-start items-stretch divide-gray-200 divide-x text-sm border-b border-gray-200">
          <div className="flex items-center py-3 px-4 text-xs uppercase font-semibold">
            Screen Size
          </div>
          {screenSizes.map((item) => (
            <button
              onClick={() => setActiveScreenSize(item.size)}
              className={cx(
                'relative py-3 px-4 hover:text-blue-500 hover:bg-gray-100',
                {
                  'text-blue-700': item.size === activeScreenSize
                },
              )}
            >
              {item.title}
              {item.size === activeScreenSize
                ? (<span className="absolute inset-x-0 bottom-1.5 mx-auto w-1 h-1 rounded-full bg-blue-700"></span>)
                : null
              }

            </button>
          ))}
        </div>

        <div className="flex items-stretch justify-center flex-grow">
          <div className={cx('flex-grow', {'py-5': activeScreenSize !== ScreenSize.Desktop})} style={{maxWidth: activeScreenWidth}}>
            <iframe
              className={cx(
                'w-full h-full',
                {
                  'border-2 rounded border-gray-100': activeScreenSize !== ScreenSize.Desktop,
                },
              )}
              src={activeNavItem?.url ?? undefined}
            ></iframe>
          </div>
        </div>
      </div>

    </div>
  );
}
