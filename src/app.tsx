import { useState } from "preact/hooks";
import "./app.css";
import cx from "classnames";
import { Nav } from "./features/nav/Nav.tsx";
import { useEffect } from "preact/compat";
import { NavItemInterface } from "./features/nav/Nav.tsx";
import { useSettingsStore } from "./features/settings/store.ts";
import {
  ScreenSize,
  screenSizeMap,
  useUtilityBarStore,
} from "./features/utility-bar/store.ts";
import Welcome from "./features/welcome/Welcome.tsx";
import UtilityBar from "./features/utility-bar/UtilityBar.tsx";
import {
  findNavItemByUrl,
  findFirstNavItem,
  UseHistory,
  SEARCH_PARAM_PART,
} from "./features/nav/routing.ts";
import { uniqueId } from "./utilities/string.ts";

export interface AppProps {
  configUrl: string | null;
}

/**
 * Config is the JSON we get back from the CMS or App
 * Right now it's only nav links, but there could be other config
 * items in the future.
 */
export interface Config {
  nav: NavItemInterface[];
}

export function App(props: AppProps) {
  const settings = useSettingsStore();
  const utilityStore = useUtilityBarStore();

  const [config, setConfig] = useState<Config>({ nav: [] });
  const hasConfigUrl = !!props.configUrl;

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
    // If the custom element has a config URL, don't pull one from the settings field
    loadConfig(props.configUrl ?? settings.configUrl);
  }, [settings.configUrl]);

  if (config.nav.length === 0) {
    return <div>Loading</div>;
  }

  const url = new URL(window.location.href).searchParams.get(SEARCH_PARAM_PART);
  const navItemFromUrl = url ? findNavItemByUrl(url, config.nav) : undefined;

  const useHistory = UseHistory({
    onPopState: ({ url }) => {
      const urlFromHistory = url.searchParams.get(SEARCH_PARAM_PART);

      if (!urlFromHistory) {
        console.warn("Url wasn't in history");
        // Select the first nav item?
        setActiveNavItem(findFirstNavItem(config.nav[0]));
        return;
      }

      const foundNavItem = findNavItemByUrl(urlFromHistory, config.nav);

      if (!foundNavItem) {
        console.error("Could not find nav item after popstate");
        // TODO show a 404 message
        return;
      }

      setActiveNavItem(foundNavItem);
    },
  });

  const [isWelcomeVisible, setIsWelcomeVisible] = useState<boolean>(
    !navItemFromUrl,
  );

  const [activeNavItem, setActiveNavItem] = useState<
    NavItemInterface | undefined
  >(navItemFromUrl || findFirstNavItem(config.nav[0]));

  const activeScreenWidth = screenSizeMap[utilityStore.activeScreenSize];

  const setViableNavItem = (clickedItem: NavItemInterface): void => {
    const foundItem = findFirstNavItem(clickedItem);

    if (foundItem === undefined || !foundItem.url) {
      console.error("Cant find viable nav item for ", clickedItem);
      // TODO update state with an error message
      return;
    }

    setActiveNavItem(foundItem);
    setIsWelcomeVisible(false);

    const url = new URL(window.location.href);
    url.searchParams.set(SEARCH_PARAM_PART, foundItem.url);
    useHistory.push(url, { url: foundItem.url });
  };

  return (
    <div className="bg-gray-100 grid grid-cols-[250px,_1fr] h-screen p-2 pl-0">
      <div className="py-1 overflow-auto">
        {activeNavItem !== undefined ? (
          <Nav
            activeNavItem={activeNavItem}
            nav={config.nav}
            setActiveNavItem={setViableNavItem}
          />
        ) : null}
      </div>

      <div className="flex flex-col shadow-sm bg-white rounded-md">
        <UtilityBar showSettings={!hasConfigUrl} />

        <div className="flex items-stretch justify-center flex-grow">
          {!hasConfigUrl && isWelcomeVisible ? (
            <Welcome />
          ) : (
            <div
              className={cx("flex-grow", {
                "py-5": utilityStore.activeScreenSize !== ScreenSize.Desktop,
              })}
              style={{ maxWidth: activeScreenWidth }}
            >
              {/* Changing the src of iframes will muck up your history. Using key to rerender when the nav changes is a workaround */}
              <iframe
                key={activeNavItem?.url + uniqueId()}
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
