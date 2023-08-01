import { useState } from "preact/hooks";
import "./app.css";
import cx from 'classnames'
import { Nav } from "./components/Nav";

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

/**
 * In the final product, navigation is loaded via Ajax. It is up to the CMS to generate this navigation.
 * Or a developer can just manually write this JSON
 */
const nav: NavItem[] = [
  {
    title: "Button",
    url: "",
    children: [
      {
        title: "Primary",
        url: "/button-primary.html",
        children: []
      },
      {
        title: "Secondary",
        url: "/button-secondary.html",
        children: []
      },
    ],
  },
  {
    title: "Card",
    url: "/card.html",
    children: [],
  },
];

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
  const [activeNavItem, setActiveNavItem] = useState(nav[0]);
  const [activeScreenSize, setActiveScreenSize] = useState(ScreenSize.Desktop);

  const activeScreenWidth = screenSizeMap[activeScreenSize]

  return (
    <div className="grid grid-cols-[250px,_1fr] grid-rows-[auto,_1fr] h-screen">
      <div className=" row-span-2 bg-gray-200 p-5">
        <Nav nav={nav} setActiveNavItem={setActiveNavItem} />
      </div>

      <div className="bg-gray-700 p-2 gap-2 flex justify-center">
        {screenSizes.map((item) => (
          <button
            onClick={() => setActiveScreenSize(item.size)}
            className={cx(
              'bg-white py-2 px-3',
              {
                'bg-black text-white': activeScreenSize === item.size
              }
            )}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="p-5 flex items-stretch justify-center bg-gray-100">
        <div className="flex-grow shadow-sm bg-white p-4 rounded-md" style={{maxWidth: activeScreenWidth}}>
          <iframe
            className="w-full h-full"
            src={activeNavItem.url ?? undefined}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
