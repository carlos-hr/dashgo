import { Box, HStack } from "@chakra-ui/react";
import PaginationItem from "./PaginationItem";

const Pagination = () => {
  return (
    <HStack spacing="6" mt="8" justify="space-between" align="center">
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <HStack spacing="2">
        <PaginationItem isCurrent page={1} />
        <PaginationItem page={2} />
        <PaginationItem page={3} />
        <PaginationItem page={4} />
      </HStack>
    </HStack>
  );
};

export default Pagination;
