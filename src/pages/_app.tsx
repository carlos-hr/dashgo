import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SidebarProvider } from "../contexts/SideBarContext";
import { makeServer } from "../services/mirage";
import { theme } from "../styles/theme";

if (process.env.NODE_ENV === "development") makeServer();

function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <SidebarProvider>
          <Component {...pageProps} />
        </SidebarProvider>
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
