import { FC, PropsWithChildren } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "../i18n";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ThemeProviderCustom from "./ThemeProvider";
import { ErrorBoundary, FocusAwareStatusBar } from "@/components";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/theme";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { useStorageState } from "@/hooks";
import { TYPE_STORE } from "@/types";
import { useAuthStore } from "@/stores";
import { ProviderQueries } from "./ProviderQueries";

SplashScreen.preventAutoHideAsync();

const Provider: FC<PropsWithChildren> = ({ children }) => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [[isLoading, session], _] = useStorageState(TYPE_STORE.AUTHEN);

  const { setInfo } = useAuthStore();

  useEffect(() => {
    if (loaded || isLoading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      if (session) {
        setInfo(JSON.parse(session));
      } else {
        setInfo(undefined);
      }
    }
  }, [isLoading, session]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FocusAwareStatusBar style="light" />
      <ThemeProviderCustom>
        <ErrorBoundary>
          <BottomSheetModalProvider>
            <ProviderQueries>
              <KeyboardProvider>{children}</KeyboardProvider>
              <Toast config={toastConfig} topOffset={0} />
            </ProviderQueries>
          </BottomSheetModalProvider>
        </ErrorBoundary>
      </ThemeProviderCustom>
    </GestureHandlerRootView>
  );
};

export default Provider;
