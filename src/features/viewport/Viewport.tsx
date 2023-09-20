import { Resizable } from "re-resizable";
import cx from "classnames";
import { NavItemInterface } from "../nav/Nav";
import { uniqueId } from "../../utilities/string";
import {
  ScreenSize,
  screenSizeMap,
  useUtilityBarStore,
} from "../utility-bar/store";
import { useCallback } from "preact/hooks";
import { memo } from "preact/compat";

interface ViewportProps {
  activeNavItem: NavItemInterface | undefined;
}

interface FrameComponentProps {
  url: string;
}

function FrameComponent(props: FrameComponentProps) {
  // Changing the src of iframes will muck up your history. Using key to rerender when the nav changes is a workaround
  return (
    <iframe
      // key={props.activeNavItem?.url + uniqueId()}
      className={cx("w-full h-full", {
        "border-2 rounded border-gray-100": true,
        // utilityBar.activeScreenSize !== ScreenSize.Desktop,
      })}
      src={props.url ?? undefined}
    ></iframe>
  );
}

const MemoedFrameComponent = memo(FrameComponent);

export default function (props: ViewportProps) {
  // const utilityBar = useUtilityBarStore();
  // const activeScreenWidth = screenSizeMap[utilityBar.activeScreenSize];

  return (
    // Probably a TS error because of preact
    <Resizable
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: true,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      <MemoedFrameComponent url={props.activeNavItem?.url ?? ''} />
    </Resizable>

    // <div
    //   className={cx("flex-grow", {
    //     "py-5": utilityBar.activeScreenSize !== ScreenSize.Desktop,
    //   })}
    //   style={{ maxWidth: activeScreenWidth }}
    // >
    // </div>
  );
}
