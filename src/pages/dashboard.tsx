import { Flex } from "@chakra-ui/react";
import { Header, SideBar } from "../components";

const Dashboard = () => {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <SideBar />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
