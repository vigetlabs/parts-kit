import { useState } from "preact/hooks";
import "./app.css";
import cx from "classnames";
import { Nav } from "./components/Nav";
import { useEffect } from "preact/compat";
import { NavItem } from "./components/NavItem.tsx";
import { useSettingsStore } from "./features/settings/store.ts";
import SettingsPanel from "./features/settings/SettingsPanel.tsx";
import { useUtilityBarStore } from "./features/utility-bar/store.ts";
import Welcome from "./features/welcome/Welcome.tsx";

export interface NavItem {
  title: string;
  url: string | null;
  children: NavItem[];
}

/**
 * Config is the JSON we get back from the CMS or App
 * Right now it's only nav links, but there could be other config
 * items in the future.
 */
export interface Config {
  nav: NavItem[];
}

export function App() {
  const settings = useSettingsStore();
  const [nav, setNav] = useState([]);

  const [config, setConfig] = useState<Config>({ nav: [] });

  const loadConfig = async (url: string) => {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Couldn't load");
    }

    const data = await response.json();

    setConfig(data);
  };

  useEffect(() => {
    loadConfig(settings.configUrl);
  }, [settings.configUrl]);

  if (config.nav.length === 0) {
    return <div>Loading</div>;
  }

  const findViableNavItem = (item: NavItem): NavItem | undefined => {
    if (item.url) {
      return item;
    }

    return item.children.find((item) => !!item.url);
  };

  const firstNavItem = findViableNavItem(config.nav[0]);

  if (firstNavItem === undefined) {
    return <div>Could not find viable nav item</div>;
  }

  const [isWelcomeVisible, setIsWelcomeVisible] = useState<boolean>(true)
  const [activeNavItem, setActiveNavItem] = useState<NavItem>(firstNavItem);
  const [activeScreenSize, setActiveScreenSize] = useState(ScreenSize.Desktop);
  const activeScreenWidth = screenSizeMap[activeScreenSize];
  const utilityBar = useUtilityBarStore()

  const setViableNavItem = (item: NavItem): void => {
    const viableItem = findViableNavItem(item);

    if (viableItem === undefined) {
      console.error("Cant find viable nav item for ", item);
      return;
    }
    setActiveNavItem(viableItem);
    setIsWelcomeVisible(false)
  };

  return (
    <div className="bg-gray-100 grid grid-cols-[250px,_1fr] h-screen p-2 pl-0">
      <div className="py-1 overflow-auto">
        <Nav
          activeNavItem={activeNavItem}
          nav={config.nav}
          setActiveNavItem={setViableNavItem}
        />
      </div>

      <div className="flex flex-col shadow-sm bg-white rounded-md">
        {/* Utility bar */}
        <div>
          <div className="flex justify-start items-stretch divide-gray-200 divide-x text-sm border-b border-gray-200">
            <div className="flex items-center py-3 px-4 text-xs uppercase font-semibold">
              Screen Size
            </div>
            {screenSizes.map((item) => (
              <button
                onClick={() => setActiveScreenSize(item.size)}
                className={cx(
                  "relative py-3 px-4 hover:text-blue-500 hover:bg-gray-100",
                  {
                    "text-blue-700": item.size === activeScreenSize,
                  },
                )}
              >
                {item.title}
                {item.size === activeScreenSize ? (
                  <span className="absolute inset-x-0 bottom-1.5 mx-auto w-1 h-1 rounded-full bg-blue-700"></span>
                ) : null}
              </button>
            ))}
            {/* Show / hide settings */}
            <button
              className="px-4 text-sm font-medium"
              onClick={() => utilityBar.setIsSettingsVisible(!utilityBar.isSettingsVisible)}
            >
              {utilityBar.isSettingsVisible ? "× Hide" : "⚙️ Show"} Settings
            </button>
          </div>

          {/* Settings Panel */}
          {utilityBar.isSettingsVisible ? (<SettingsPanel />) : null}

        </div>

        <div className="flex items-stretch justify-center flex-grow">
          <div
            className={cx("flex-grow", {
              "py-5": activeScreenSize !== ScreenSize.Desktop,
            })}
            style={{ maxWidth: activeScreenWidth }}
          >
            {isWelcomeVisible ? (
              <Welcome />
            ) : (
              <iframe
                className={cx("w-full h-full", {
                  "border-2 rounded border-gray-100":
                    activeScreenSize !== ScreenSize.Desktop,
                })}
                src={activeNavItem?.url ?? undefined}
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
