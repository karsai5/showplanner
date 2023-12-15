import {
  Collapse,
  Divider,
  Flex,
  Icon,
  Link as ChakraLink,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";

import { ProcessedChildType, ProcessedMenuItemType, TYPE } from "./types";

export const MobileNavBar: React.FC<{ items: Array<ProcessedChildType> }> = ({
  items,
}) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {items.map((navItem, index) => (
        <MobileNavItem key={index} item={navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem: React.FC<{ item: ProcessedChildType }> = ({ item }) => {
  const { isOpen, onToggle } = useDisclosure({
    isOpen: (item as ProcessedMenuItemType)?.isOpen,
  });
  const textColor = useColorModeValue("gray.600", "gray.200");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  if (item.type === TYPE.divider) {
    return <Divider />;
  }

  if (item.type === TYPE.item) {
    const { label, children, to, onClick } = item;
    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          as={Link}
          href={to}
          onClick={onClick}
          justify={"space-between"}
          align={"center"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <div>
            <Text fontWeight={600} color={textColor}>
              {label}
            </Text>
          </div>
        </Flex>

        <Collapse
          in={isOpen}
          animateOpacity
          style={{ marginTop: "0!important" }}
        >
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={"solid"}
            borderColor={borderColor}
            align={"start"}
          >
            {children?.map((child, i) => {
              if (child.type === TYPE.item) {
                if (child.to === "#") {
                  return (
                    <ChakraLink
                      key={child.label}
                      py={2}
                      onClick={child.onClick}
                    >
                      {child.label}
                    </ChakraLink>
                  );
                }
                return (
                  <ChakraLink
                    as={Link}
                    key={child.label}
                    py={2}
                    href={child.to}
                  >
                    {child.label}
                  </ChakraLink>
                );
              }
              if (child.type === TYPE.divider) {
                return <Divider key={i} />;
              }
              return null;
            })}
          </Stack>
        </Collapse>
      </Stack>
    );
  }
  return null;
};
