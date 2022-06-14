import { useAuthContext } from "../../contexts/AuthContext";
import { validateUserAccess } from "../../utils/validateUserAccess";

type useAuthorizationParams = {
  permissions?: string[];
  roles?: string[];
};

export const useAuthorization = ({
  permissions,
  roles,
}: useAuthorizationParams) => {
  const { user, isAuthenticated } = useAuthContext();

  if (!isAuthenticated) return false;

  const hasAccess = validateUserAccess({ user, permissions, roles });

  return hasAccess;
};
