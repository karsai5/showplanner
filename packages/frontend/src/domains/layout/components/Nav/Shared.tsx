import cc from "classnames";
import Link from "next/link";

import { NavItem } from "./items";

export const ItemLink = ({
  item,
  active,
}: {
  item: NavItem;
  active?: boolean;
}) => {
  if (!item.href) {
    return null;
  }

  return (
    <Link
      href={item.href}
      onClick={item.onClick}
      className={cc("gap-1", { active })}
    >
      {item.icon && item.icon}
      {item.title}
    </Link>
  );
};

export const ItemAnchor = ({ item }: { item: NavItem }) => {
  return (
    <a onClick={item.onClick}>
      {item.icon && item.icon}
      {item.title}
    </a>
  );
};
