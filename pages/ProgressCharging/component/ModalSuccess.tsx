import { Button, Dialog, Text, useTheme } from "@rneui/themed";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export const ModalConfirm: FC<{
  isVisible: boolean;
  onBackdropPress: () => void;
}> = (props) => {
  const {
    theme: { colors },
  } = useTheme();
  const { t } = useTranslation();
  return (
    <Dialog
      isVisible={props.isVisible}
      onBackdropPress={props.onBackdropPress}
      overlayStyle={[
        {
          backgroundColor: colors.background,
          width: "90%",
          borderRadius: 50,
          padding: 40,
          paddingBottom: 20,
          gap: 38,
        },
      ]}
    >
      <Text style={[{ fontSize: 15, fontWeight: 500, textAlign: "center" }]}>
        {t("Xe của bạn đã được sạc đầy!")}
      </Text>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Button
          containerStyle={{ width: "80%" }}
          title={t("Xác nhận")}
          color={"error"}
          onPress={props.onBackdropPress}
        />
      </View>
    </Dialog>
  );
};
