import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
}
const Profile = ({ showProfileData = true }: ProfileProps) => {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Carlos Henrique</Text>
          <Text color="gray.300" fontSize="small">
            email@email.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="ch" />
    </Flex>
  );
};

export default Profile;
