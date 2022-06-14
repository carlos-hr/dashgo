import { ReactNode } from "react";
import { useAuthorization } from "../../services/hooks/useAuthorization";

interface AuthorizationProps {
  children: ReactNode;
  permissions?: string[];
  roles?: string[];
}

const Authorization = (props: AuthorizationProps) => {
  const { children, permissions, roles } = props;
  const isAuthorized = useAuthorization({ permissions, roles });

  if (!isAuthorized) {
    return null;
  }
  return <>{children}</>;
};

export default Authorization;
