import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { signOut } from "../../contexts/AuthContext";
import { useSidebarContext } from "../../contexts/SidebarContext";
import Logo from "./components/Logo";
import NotificationsNav from "./components/NotificationsNav";
import Profile from "./components/Profile";
import Searchbox from "./components/Searchbox";

const Header = () => {
  const { onOpen } = useSidebarContext();

  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  });

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
      {!isDesktop && (
        <IconButton
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          aria-label="open navigation"
          mr="2"
          icon={<Icon as={RiMenuLine} />}
        ></IconButton>
      )}
      <Logo />
      {isDesktop && <Searchbox />}

      <Flex align="center" ml="auto">
        <NotificationsNav />
        <Profile showProfileData={isDesktop} />
      </Flex>
      <button onClick={signOut}>logout</button>
    </Flex>
  );
};

export default Header;
