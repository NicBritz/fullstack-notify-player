import NextLink from "next/link";
import {
  Box,
  List,
  ListItem,
  ListIcon,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";

const SideMenu = ({ menuItems }) => {
  return (
    <Box marginBottom="20px">
      <List spacing={2}>
        {menuItems.map((menu) => (
          <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
            <LinkBox>
              <NextLink href={menu.route} passHref>
                <LinkOverlay sx={{ "&:hover": { color: "white" } }}>
                  <ListIcon as={menu.icon} color="white" marginRight="20px" />
                  {menu.name}
                </LinkOverlay>
              </NextLink>
            </LinkBox>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SideMenu;
