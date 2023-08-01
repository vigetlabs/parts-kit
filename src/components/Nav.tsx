import { StateUpdater, useState } from "preact/hooks";
import { NavItem } from "../app";

interface NavProps {
  nav: NavItem[];
  setActiveNavItem: StateUpdater<NavItem>;
}

export function Nav(props: NavProps) {
  const [currentSearch, setCurrentSearch] = useState("");

  const filteredNav = props.nav.filter((item) =>
    item.title.toLowerCase().includes(currentSearch.toLowerCase()),
  );

  return (
    <nav>
      <input
        type="search"
        onInput={(e) =>
          setCurrentSearch(e.currentTarget.value)
        }
      />

      <ul className="divide-y border-gray-300">
        {filteredNav.map((item) => (
          <li>
            <button
              className="py-3"
              onClick={() => props.setActiveNavItem(item)}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
