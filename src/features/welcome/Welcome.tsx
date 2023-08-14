import { useUtilityBarStore } from "../utility-bar/store";

export default function () {
  const utility = useUtilityBarStore();

  return (
    <div className="py-10 px-3 max-w-lg mx-auto space-y-3">
      <h1 className="text-2xl font-semibold">👋 Welcome!</h1>
      <p>This is a demo of a "decoupled" parts kit.</p>
      <p>
        Click a parts link on the left. If you'd like to try this out with your
        own JSON. Click the{" "}
        <button
          className="underline text-blue-600"
          onClick={() => utility.setIsSettingsVisible(true)}
        >
          ⚙️ settings button
        </button>{" "}
        in the top menu bar.
      </p>
      <p>
        Curious what a decoupled parts kit is?{" "}
        <a
          className="underline text-blue-600"
          href="https://github.com/vigetlabs/parts-kit"
        >
          📚 Check out the docs
        </a>.
      </p>
    </div>
  );
}
