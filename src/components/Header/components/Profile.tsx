import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

const Profile = () => {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Carlos Henrique</Text>
        <Text color="gray.300" fontSize="small">
          email@email.com
        </Text>
      </Box>

      <Avatar size="md" name="ch" />
    </Flex>
  );
};

export default Profile;
