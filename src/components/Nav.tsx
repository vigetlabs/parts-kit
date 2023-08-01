import { StateUpdater, useState } from "preact/hooks";
import * as app from "../app";
import { NavItem } from "./NavItem";

interface NavProps {
  nav: app.NavItem[];
  setActiveNavItem: StateUpdater<app.NavItem>;
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
            <NavItem item={item} setActiveNavItem={props.setActiveNavItem}/>
          </li>
        ))}
      </ul>
    </nav>
  );
}
