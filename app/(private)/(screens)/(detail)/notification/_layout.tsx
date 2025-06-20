import { HeaderScreen } from "@/components";
import { Stack } from "expo-router";

export default () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: "Chi tiết thông báo",
          header: HeaderScreen,
        }}
      />
    </Stack>
  );
};
