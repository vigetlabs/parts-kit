import { useState } from "preact/hooks";
import "./app.css";
import cx from "classnames";
import { Nav } from "./components/Nav";
import { useEffect } from "preact/compat";
import { NavItem } from "./components/NavItem.tsx";
import { useSettingsStore } from "./features/settings/store.ts";
import {
  ScreenSize,
  screenSizeMap,
  useUtilityBarStore,
} from "./features/utility-bar/store.ts";
import Welcome from "./features/welcome/Welcome.tsx";
import UtilityBar from "./features/utility-bar/UtilityBar.tsx";

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
  const utilityStore = useUtilityBarStore();

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

  const [isWelcomeVisible, setIsWelcomeVisible] = useState<boolean>(true);
  const [activeNavItem, setActiveNavItem] = useState<NavItem>(firstNavItem);
  const activeScreenWidth = screenSizeMap[utilityStore.activeScreenSize];

  const setViableNavItem = (item: NavItem): void => {
    const viableItem = findViableNavItem(item);

    if (viableItem === undefined) {
      console.error("Cant find viable nav item for ", item);
      return;
    }
    setActiveNavItem(viableItem);
    setIsWelcomeVisible(false);
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
        <UtilityBar />

        <div className="flex items-stretch justify-center flex-grow">
          {isWelcomeVisible ? (
            <Welcome />
          ) : (
            <div
              className={cx("flex-grow", {
                "py-5": utilityStore.activeScreenSize !== ScreenSize.Desktop,
              })}
              style={{ maxWidth: activeScreenWidth }}
            >
              <iframe
                className={cx("w-full h-full", {
                  "border-2 rounded border-gray-100":
                    utilityStore.activeScreenSize !== ScreenSize.Desktop,
                })}
                src={activeNavItem?.url ?? undefined}
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
