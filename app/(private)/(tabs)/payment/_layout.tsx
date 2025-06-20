import { Stack } from "expo-router";
import { Image } from "react-native";

export default () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Nạp tiền thanh toán",
          headerTitleStyle: {
            color: "white",
          },
          headerBackground: () => (
            <Image
              source={require("@/assets/images/bgheader.png")}
              resizeMode="stretch"
            />
          ),
          // headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};
