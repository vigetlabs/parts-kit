import { StateUpdater, useState } from "preact/hooks";
import * as app from "../app";

interface NavItemProps {
  item: app.NavItem;
  setActiveNavItem: StateUpdater<app.NavItem>;
}

export function NavItem(props: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button className="py-3" onClick={() => {
        if(props.item.children.length) {
          return setIsOpen(!isOpen)
        }
        return props.setActiveNavItem(props.item);
      }}>
        {props.item.title}
      </button>
      {props.item.children.length && isOpen ? (
        <ul className="pl-5">
          {props.item.children.map(child => (
            <NavItem item={child} setActiveNavItem={props.setActiveNavItem} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}
