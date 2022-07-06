import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SidebarProvider } from "../contexts/SidebarContext";
import { makeServer } from "../services/mirage";
import { theme } from "../styles/theme";
import { queryClient } from "../services/react-query/queryClient";
import { AuthProvider } from "../contexts/AuthContext";

if (process.env.NODE_ENV === "development") makeServer();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <SidebarProvider>
            <Component {...pageProps} />
          </SidebarProvider>
        </ChakraProvider>

        <ReactQueryDevtools />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
