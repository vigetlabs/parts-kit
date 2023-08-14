import SettingsPanel from "../settings/SettingsPanel";
import { screenSizes, useUtilityBarStore } from "./store";
import cx from 'classnames'

export default function () {
  const store = useUtilityBarStore()

  return (
    <div>
      <div className="flex justify-start items-stretch divide-gray-200 divide-x text-sm border-b border-gray-200">
        <div className="flex items-center py-3 px-4 text-xs uppercase font-semibold">
          Screen Size
        </div>
        {screenSizes.map((item) => (
          <button
            onClick={() => store.setActiveScreenSize(item.size)}
            className={cx(
              "relative py-3 px-4 hover:text-blue-500 hover:bg-gray-100",
              {
                "text-blue-700": item.size === store.activeScreenSize,
              },
            )}
          >
            {item.title}
            {item.size === store.activeScreenSize ? (
              <span className="absolute inset-x-0 bottom-1.5 mx-auto w-1 h-1 rounded-full bg-blue-700"></span>
            ) : null}
          </button>
        ))}
        {/* Show / hide settings */}
        <button
          className="px-4 text-sm font-medium"
          onClick={() =>
            store.setIsSettingsVisible(!store.isSettingsVisible)
          }
        >
          {store.isSettingsVisible ? "× Hide" : "⚙️ Show"} Settings
        </button>
      </div>

      {/* Settings Panel */}
      {store.isSettingsVisible ? <SettingsPanel /> : null}
    </div>
  );
}
