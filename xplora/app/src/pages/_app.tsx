import Dashboard from "@/components/Dashboard";
import AuthProvider from "@/components/providers/AuthProvider";
import UserDataProvider from "@/components/providers/UserDataProvider";
import { SiteHeader } from "@/components/SiteHeader";
import "@/styles/globals.css";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <UserDataProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <SiteHeader/>
              <Dashboard>
                <Component {...pageProps} />
              </Dashboard>
            </TooltipProvider>
          </ThemeProvider>
        </UserDataProvider>
      </AuthProvider>
    </>
  );
}
