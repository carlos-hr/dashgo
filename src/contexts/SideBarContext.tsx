import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect } from "react";

interface SidebarContextProps {
  children: ReactNode;
}

export const SidebarContext = createContext({} as UseDisclosureReturn);

export const SidebarProvider = ({ children }: SidebarContextProps) => {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose;
  }, [disclosure.onClose, router.asPath]);

  return (
    <SidebarContext.Provider value={disclosure}>
      {children}
    </SidebarContext.Provider>
  );
};
