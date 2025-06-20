import { Redirect, Stack } from "expo-router";
import "react-native-reanimated";
import { useAuthStore } from "@/stores";
import { useGetBalance } from "@/hooks";

export default () => {
  const { user, isLoading } = useAuthStore();

  const {} = useGetBalance();

  if (!user && !isLoading) {
    return <Redirect href="/(publics)/(auths)/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(screens)" />
    </Stack>
  );
};
