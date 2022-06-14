import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { setCookie, parseCookies } from "nookies";
import { signOut } from "../utils/signOut";
import { authApi } from "../services/api/apiClient";

interface AuthContextProps {
  children: ReactNode;
}

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User;
};

const AuthContext = createContext({} as AuthContextData);
// let authChannel: BroadcastChannel;

export const AuthProvider = ({ children }: AuthContextProps) => {
  // useEffect(() => {
  //   authChannel = new BroadcastChannel("auth");

  //   authChannel.onmessage = (message) => {
  //     switch (message.data) {
  //       case "signOut":
  //         signOut();
  //         break;
  //       default:
  //         break;
  //     }
  //   };
  // }, []);

  const router = useRouter();

  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const response = await authApi.post("sessions", {
        email,
        password,
      });

      const { token, refreshToken, permissions, roles } = response.data;

      setCookie(undefined, "dashgo.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
      setCookie(undefined, "dashgo.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser({
        email,
        permissions,
        roles,
      });

      authApi.defaults.headers["Authorization"] = `Bearer ${token}`;

      router.push("/dashboard");
    } catch (err) {}
  };

  useEffect(() => {
    const { "dashgo.token": token } = parseCookies();

    if (token) {
      authApi
        .get("/me")
        .then((response) => {
          const { email, permissions, roles } = response.data;
          setUser({
            email,
            permissions,
            roles,
          });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
