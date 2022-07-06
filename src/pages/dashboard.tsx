import { Flex, SimpleGrid } from "@chakra-ui/react";
import { Chart, Header, Sidebar } from "../components";
import Authorization from "../components/Authorization";
import { SSRAuth } from "../utils/SSRAuth";

const Dashboard = () => {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Authorization permissions={["metrics.list"]}>
        <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
          <Sidebar />

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
      </Authorization>
    </Flex>
  );
};

export default Dashboard;

export const getServerSideProps = SSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
