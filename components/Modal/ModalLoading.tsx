import { Dialog, Text, useTheme } from "@rneui/themed";
import { ActivityIndicator } from "react-native";

export const ModalLoading = (props: { isVisible: boolean }) => {
  const {
    theme: { colors },
  } = useTheme();

  return (
    <Dialog
      isVisible={props.isVisible}
      onBackdropPress={() => {}}
      overlayStyle={[
        {
          backgroundColor: colors.background,
          width: "50%",
          borderRadius: 20,
          padding: 40,
          gap: 5,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <ActivityIndicator color={colors.primary} size="large" />
      <Text style={{ fontWeight: "600" }}>Đang tải...</Text>
    </Dialog>
  );
};
