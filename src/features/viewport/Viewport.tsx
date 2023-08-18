import cx from "classnames";
import { NavItemInterface } from "../nav/Nav";
import { uniqueId } from "../../utilities/string";
import {
  ScreenSize,
  screenSizeMap,
  useUtilityBarStore,
} from "../utility-bar/store";

interface ViewportProps {
  activeNavItem: NavItemInterface | undefined;
}

export default function (props: ViewportProps) {
  const utilityBar = useUtilityBarStore();
  const activeScreenWidth = screenSizeMap[utilityBar.activeScreenSize];

  return (
    <div
      className={cx("flex-grow", {
        "py-5": utilityBar.activeScreenSize !== ScreenSize.Desktop,
      })}
      style={{ maxWidth: activeScreenWidth }}
    >
      {/* Changing the src of iframes will muck up your history. Using key to rerender when the nav changes is a workaround */}
      <iframe
        key={props.activeNavItem?.url + uniqueId()}
        className={cx("w-full h-full", {
          "border-2 rounded border-gray-100":
            utilityBar.activeScreenSize !== ScreenSize.Desktop,
        })}
        src={props.activeNavItem?.url ?? undefined}
      ></iframe>
    </div>
  );
}
