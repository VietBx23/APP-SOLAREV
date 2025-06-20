import { HeaderScreen } from "@/components";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: t("Chi tiết"),
          header: HeaderScreen,
        }}
      />
    </Stack>
  );
};
