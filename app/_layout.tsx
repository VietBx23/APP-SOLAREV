import { Stack } from "expo-router";
import "react-native-reanimated";
import "../i18n";
import Provider from "@/providers";

export default function RootLayout() {
  return (
    <Provider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(publics)" />
        <Stack.Screen name="(private)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </Provider>
  );
}
