import { Flex } from "@chakra-ui/react";
import Logo from "./components/Logo";
import NotificationsNav from "./components/NotificationsNav";
import Profile from "./components/Profile";
import Searchbox from "./components/Searchbox";

const Header = () => {
  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Logo />
      <Searchbox />

      <Flex align="center" ml="auto">
        <NotificationsNav />
        <Profile />
      </Flex>
    </Flex>
  );
};

export default Header;
