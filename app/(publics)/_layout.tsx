import { Stack } from "expo-router";
import "react-native-reanimated";

export default () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auths)" />
    </Stack>
  );
};
