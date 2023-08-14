import { useState } from "preact/hooks";
import cx from "classnames";
import {NavItemInterface} from "../features/nav/Nav.tsx";

interface NavItemProps {
  item: NavItemInterface;
  activeNavItem: NavItemInterface;
  setActiveNavItem: (item: NavItemInterface) => void;
  isChild?: boolean;
}

export function NavItem(props: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isChild = props.isChild ?? false;

  return (
    <div>
      <button
        className={cx("pl-5 flex w-full gap-1 text-sm hover:bg-gray-200", {
          "py-2 font-medium": !isChild,
          "py-1 pl-8": isChild,
          "bg-blue-200 hover:to-blue-300": props.activeNavItem === props.item,
        })}
        onClick={() => {
          if (props.item.children.length) {
            if (isOpen) {
              return setIsOpen(false);
            }
            setIsOpen(true);
            // Intentionally pass through to set active nav item
          }
          return props.setActiveNavItem(props.item);
        }}
      >
        {props.item.children.length ? (
          <span
            className={cx({
              "-rotate-90": !isOpen,
              "translate-y-[-2px]": isOpen,
            })}
          >
            ▾
          </span>
        ) : null}
        {props.item.title}
      </button>
      {props.item.children.length && isOpen ? (
        <ul>
          {props.item.children.map((child) => (
            <NavItem
              isChild
              activeNavItem={props.activeNavItem}
              item={child}
              setActiveNavItem={props.setActiveNavItem}
            />
          ))}
        </ul>
      ) : null}
    </div>
  );
}
