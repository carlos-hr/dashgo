import { Icon, Link, LinkProps, Text } from "@chakra-ui/react";
import { ElementType } from "react";

interface NavLinkProps extends LinkProps {
  icon: ElementType;
  children: string;
}

const NavLink = ({ icon, children, ...rest }: NavLinkProps) => {
  return (
    <Link display="flex" alignItems="center" py="1" {...rest}>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </Link>
  );
};

export default NavLink;
