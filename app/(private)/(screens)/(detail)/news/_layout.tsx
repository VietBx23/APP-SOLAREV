import { HeaderScreen } from "@/components";
import { Stack } from "expo-router";

export default () => {
  return (
    <Stack>
      <Stack.Screen
        name="[slug]"
        options={{
          headerTitle: "Chi tiết",
          header: HeaderScreen,
        }}
      />
    </Stack>
  );
};
