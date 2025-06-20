import { Stack } from "expo-router";

export default () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="news" />
      <Stack.Screen name="notification" />
      <Stack.Screen name="charging" />
    </Stack>
  );
};
