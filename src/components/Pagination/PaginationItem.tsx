import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  isCurrent?: boolean;
  page: number;
  onPageChange: (page: number) => void;
}

const PaginationItem = (props: PaginationItemProps) => {
  const { isCurrent = false, page, onPageChange } = props;

  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        w="4"
        colorScheme="pink"
        disabled
        _disabled={{ bg: "pink.500", cursor: "default" }}
      >
        {page}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      w="4"
      bg="gray.700"
      _hover={{ bg: "gray.500" }}
      onClick={() => onPageChange(page)}
    >
      {page}
    </Button>
  );
};

export default PaginationItem;
