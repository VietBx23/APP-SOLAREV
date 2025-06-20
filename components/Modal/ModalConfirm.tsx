import { Button, Dialog, makeStyles, Text } from "@rneui/themed";
import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { height } = Dimensions.get("screen");

export type IPropModal = {
  isVisible: boolean;
  onBackdropPress: () => void;
  title?: ReactNode;
  content?: ReactNode;
  action?: ReactNode;
};

export const ModalConfirm: FC<IPropModal> = (props) => {
  const styled = useTheme();
  const { t } = useTranslation();
  return (
    <Dialog
      isVisible={props.isVisible}
      onBackdropPress={props.onBackdropPress}
      overlayStyle={[styled.container]}
    >
      <Text style={[styled.title]}>{props.title}</Text>
      {props.content && <Text style={[styled.content]}>{props.content}</Text>}
      <View style={[styled.groupButton]}>
        {props.action ? (
          props.action
        ) : (
          <Button
            containerStyle={{ width: "80%" }}
            title={t("Xác nhận")}
            color={"error"}
            onPress={props.onBackdropPress}
          />
        )}
      </View>
    </Dialog>
  );
};

const useTheme = makeStyles(({ colors }) => ({
  container: {
    backgroundColor: colors.background,
    width: "90%",
    borderRadius: 50,
    padding: 40,
    paddingBottom: 20,
    gap: 40,
  },
  title: {
    fontSize: RFValue(17, height),
    textAlign: "center",
  },
  content: {},
  groupButton: {
    alignItems: "center",
  },
}));
