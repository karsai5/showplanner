import {
  Box,
  Divider,
  Flex,
  Icon,
  Image,
  Link as ChakraLink,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

import styles from "./styles.module.scss";
import { ProcessedMenuItemType, TYPE } from "./types";

export const DesktopNavBar: React.FC<{
  leftItems: Array<ProcessedMenuItemType>;
  rightItems: Array<ProcessedMenuItemType>;
}> = ({ leftItems, rightItems }) => {
  return (
    <>
      <Stack direction={"row"} spacing={2}>
        {leftItems.map((navItem) => (
          <DesktopNavItem navItem={navItem} key={navItem.label} />
        ))}
      </Stack>
      <Stack direction={"row"} spacing={2}>
        {rightItems.map((navItem) => (
          <DesktopNavItem navItem={navItem} key={navItem.label} />
        ))}
      </Stack>
    </>
  );
};

const DesktopTopLevelItem: React.FC<{ navItem: ProcessedMenuItemType }> = ({
  navItem,
}) => {
  return (
    <Box>
      <div className={styles.desktopBaseLink}>
        {navItem.icon && (
          <Icon w={5} h={5} as={navItem.icon} className={styles.icon} />
        )}
        {navItem.imageUrl && (
          <Image
            src={navItem.imageUrl}
            borderRadius="full"
            boxSize="23px"
            alt=""
            className={styles.image}
          />
        )}
        <span>{navItem.label}</span>
      </div>
    </Box>
  );
};

const DesktopNavItem: React.FC<{
  navItem: ProcessedMenuItemType;
}> = ({ navItem }) => {
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Box>
      <Popover trigger={"hover"} placement={"bottom-start"}>
        {navItem.children ? (
          <>
            <PopoverTrigger>
              <Box>
                <DesktopTopLevelItem navItem={navItem} />
              </Box>
            </PopoverTrigger>
            <PopoverContent
              border={0}
              boxShadow={"xl"}
              bg={popoverContentBgColor}
              p={4}
              rounded={"xl"}
              minW={"sm"}
            >
              <Stack>
                {navItem.children.map((child, i) => {
                  if (child.type === TYPE.item) {
                    return <DesktopSubNav key={child.label} {...child} />;
                  }
                  if (child.type === TYPE.divider) {
                    return <Divider key={i} />;
                  }
                  return null;
                })}
              </Stack>
            </PopoverContent>
          </>
        ) : (
          <Link href={navItem.to}>
            <Box>
              <DesktopTopLevelItem navItem={navItem} />
            </Box>
          </Link>
        )}
      </Popover>
    </Box>
  );
};

const DesktopSubNav = ({ label, to, subLabel }: ProcessedMenuItemType) => {
  return (
    <Link href={to}>
      <ChakraLink
        role={"group"}
        display={"block"}
        p={2}
        rounded={"md"}
        _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
      >
        <Stack direction={"row"} align={"center"}>
          <Box>
            <Text
              transition={"all .3s ease"}
              _groupHover={{ color: "pink.400" }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize={"sm"}>{subLabel}</Text>
          </Box>
          <Flex
            transition={"all .3s ease"}
            transform={"translateX(-10px)"}
            opacity={0}
            _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
            justify={"flex-end"}
            align={"center"}
            flex={1}
          ></Flex>
        </Stack>
      </ChakraLink>
    </Link>
  );
};
