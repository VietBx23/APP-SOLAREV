import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";

export default () => {
  const { t } = useTranslation();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: t("Lịch sử"),
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
