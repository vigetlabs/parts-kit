import { useState } from "preact/hooks";
import { NavItem } from "../../components/NavItem";

export interface NavItemInterface {
  title: string;
  url: string | null;
  children: NavItemInterface[];
}
interface NavProps {
  nav: NavItemInterface[];
  activeNavItem: NavItemInterface;
  setActiveNavItem: (item: NavItemInterface) => void;
}

export function Nav(props: NavProps) {
  const [currentSearch, setCurrentSearch] = useState("");

  const filteredNav = props.nav.filter((item) => {
    const itemMatchesSearch = (item: NavItemInterface) =>
      item.title.toLowerCase().includes(currentSearch);
    return (
      itemMatchesSearch(item) ||
      item.children.some((child) => itemMatchesSearch(child))
    );
  });

  return (
    <nav>
      <div className="px-5 mb-3">
        <div className="relative">
          <span className="absolute left-2 inset-y-0 flex items-center">
            🔍
          </span>
          <input
            type="search"
            className="block w-full p-1 pl-8 border bg-transparent border-gray-300 rounded focus:border-blue-600 focus:outline-none focus:bg-white"
            placeholder="Search"
            onInput={(e) => setCurrentSearch(e.currentTarget.value)}
          />
        </div>
      </div>

      <ul className="space-y-1">
        {filteredNav.map((item) => (
          <li>
            <NavItem
              activeNavItem={props.activeNavItem}
              item={item}
              setActiveNavItem={props.setActiveNavItem}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
