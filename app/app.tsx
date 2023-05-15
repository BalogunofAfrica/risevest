import "@/components/sheet/config";

import { GestureRoot, SafeAreaBoxProvider, StatusBar } from "@/components/base";
import { ErrorBoundary } from "@/components/error-boundary";
import { SheetProvider } from "@/components/sheet";
import { ToastRoot } from "@/components/toast";
import { ApiProvider, onAppStateChange } from "@/services/api";
import { ThemeProvider } from "@/theme";

import { useOnlineManager, useOnlineStatus } from "./hooks/network";
import { useAppStart, useAppState } from "./hooks/system";
import { RootNavigation } from "./navigation";
import { StoreProvider } from "./services/storage";

export function App() {
  useOnlineStatus();
  useOnlineManager();
  useAppState(onAppStateChange);

  const hasAppLoaded = useAppStart();

  if (!hasAppLoaded) return null;

  return (
    <ErrorBoundary>
      <GestureRoot>
        <StoreProvider>
          <ApiProvider>
            <ThemeProvider>
              <SafeAreaBoxProvider>
                <SheetProvider>
                  <RootNavigation />
                  <ToastRoot />
                  <StatusBar />
                </SheetProvider>
              </SafeAreaBoxProvider>
            </ThemeProvider>
          </ApiProvider>
        </StoreProvider>
      </GestureRoot>
    </ErrorBoundary>
  );
}
