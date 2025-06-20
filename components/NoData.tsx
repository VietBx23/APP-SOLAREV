import { useTranslation } from "react-i18next";
import { Text } from "@rneui/themed";
import { View, Image } from "react-native";

export const NoData = ({ title }: { title?: string }) => {
  const { t } = useTranslation();
  return (
    <View
      style={{
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.7,
      }}
    >
      <Image
        style={[{ width: 30, height: 30 }]}
        resizeMode="contain"
        source={require("@/assets/images/error-file.png")}
      />
      <Text>{title ?? t("Không tìm thấy")}</Text>
    </View>
  );
};
