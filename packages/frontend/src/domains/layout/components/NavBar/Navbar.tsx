import {
  Box,
  Collapse,
  Flex,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useCopyToClipboard } from "core/hooks/useCopyToClipboard";
import { hasPermission } from "core/permissions";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { FaTheaterMasks } from "react-icons/fa";
import { toast } from "react-toastify";
import styled from "styled-components";

import { DesktopNavBar } from "./DesktopNavBar";
import logo from "./images/logo.png";
import { NAV_ITEMS_RIGHT, showItems } from "./items";
import { MobileNavBar } from "./MobileNavBar";
import {
  ChildType,
  MenuItemType,
  NavProps,
  ProcessedChildType,
  ProcessedMenuItemType,
  TYPE,
} from "./types";

const LogoWrapper = styled(Text)`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DesktopFlex = styled(Flex)`
  .chakra-popover__popper {
    z-index: 5000;
  }
`;

const NavBar: React.FC<NavProps> = ({ show, shows = [] }) => {
  const [_value, copy] = useCopyToClipboard();
  const { isOpen, onToggle } = useDisclosure();
  const processedLeftNavItems: Array<ProcessedMenuItemType> = [];
  const user = undefined;
  const { data: session, status } = useSession();

  const handleCopy = async () => {
    const url = window.location.href;
    if (await copy(url)) {
      toast.success("Copied URL to clipboard for sharing");
    } else {
      toast.error(
        <>
          <p>Could not copy URL. Try copying an pasting this manually</p>
          <p>
            <a href={url}>url</a>
          </p>
        </>
      );
    }
  };

  if (show) {
    const processedShowItems = filterItems(showItems, show, user);
    const currentItem = processedShowItems.find((item) => {
      // TODO: Handle pathname
      // if (location.pathname === (item as ProcessedMenuItemType)?.to) {
      //   return true;
      // }
      return false;
    }) as ProcessedMenuItemType | undefined;
    const label = currentItem
      ? `${show.name} - ${currentItem.label}`
      : show.name;
    processedLeftNavItems.unshift({
      type: TYPE.item,
      label,
      to: "#",
      children: processedShowItems,
      isOpen: true,
    });
  }

  const processedRightNavItems = filterItems(
    NAV_ITEMS_RIGHT,
    show,
    user
  ) as Array<ProcessedMenuItemType>;

  if (user) {
    const allShowsChildren = [
      {
        type: TYPE.item,
        label: "All shows",
        to: "/shows",
      },
    ];

    if (shows) {
      shows.forEach((show) => {
        allShowsChildren.push({
          type: TYPE.item,
          label: show.name,
          to: `/shows/${show.slug}`,
        });
      });
    }

    processedRightNavItems.push({
      type: TYPE.item,
      label: "Shows",
      icon: FaTheaterMasks,
      to: "#",
      children: allShowsChildren,
    });
  }

  if (status === "authenticated") {
    processedRightNavItems.push({
      type: TYPE.item,
      label: session.person.attributes?.firstname,
      to: "#",
      children: [
        {
          type: TYPE.item,
          label: "Profile",
          to: `/crew/${session.id}`,
        },
        {
          type: TYPE.item,
          label: "Logout",
          to: "/logout",
        },
      ],
    });
  }
  if (status === "unauthenticated") {
    processedRightNavItems.push({
      type: TYPE.item,
      label: "Login",
      to: `/login`,
    });
  }

  return (
    <Box key={show?.slug}>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        ></Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <LogoWrapper
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            <Image
              src={logo}
              width="30px"
              height="30px"
              alt="Showplanner logo"
            />
            <span>ShowPlanner</span>
          </LogoWrapper>

          <DesktopFlex
            display={{ base: "none", md: "flex" }}
            ml={5}
            justifyContent="space-between"
            flex={"1"}
          >
            <DesktopNavBar
              leftItems={processedLeftNavItems}
              rightItems={processedRightNavItems}
            />
          </DesktopFlex>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }}></Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNavBar
          items={[
            ...processedLeftNavItems,
            ...processedRightNavItems,
            { type: TYPE.divider },
            {
              type: TYPE.item,
              label: "Share page",
              to: "#",
              onClick: handleCopy,
              isOpen: true,
            },
          ]}
        />
      </Collapse>
    </Box>
  );
};

const filterItems = (
  navItems: Array<ChildType>,
  show: NavProps["show"],
  user: NavProps["user"]
): Array<ProcessedChildType> => {
  const newNavItems = navItems
    .filter((item) => {
      if (item.type !== TYPE.item) {
        return true;
      }
      if (item.toShow && !show) {
        return false;
      }

      if (item.permission) {
        if (!hasPermission(user?.permissions, item.permission, show?.slug)) {
          return false;
        }
      }
      if (item.mustBeLoggedIn) {
        if (!user) {
          return false;
        }
      }

      if (item.hide && item.hide(show, user)) {
        return false;
      }

      if (item.children) {
        const newChildren = filterItems(item.children, show, user);
        if (newChildren.length === 0) {
          return false;
        }
      }
      return true;
    })
    .map((item) => {
      if (item.type === TYPE.item) {
        const { children } = item;
        return {
          ...item,
          children: children ? filterItems(children, show, user) : undefined,
          to: getUrl(item, show?.slug),
        } as ProcessedMenuItemType;
      }
      return item;
    });
  return newNavItems;
};

const getUrl = (navItem: MenuItemType, showSlug?: string): string => {
  if (navItem.toShow && showSlug) {
    return `/shows/${showSlug}${navItem.toShow}`;
  }
  return navItem.to || "#";
};

export default NavBar;
