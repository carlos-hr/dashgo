import { Flex, SimpleGrid } from "@chakra-ui/react";
import { Chart, Header, SideBar } from "../components";

const Dashboard = () => {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <SideBar />

        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth={320}
          alignItems="flex-start"
        >
          <Chart text="Inscritos da semana" />
          <Chart text="Taxa de abertura" />
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
