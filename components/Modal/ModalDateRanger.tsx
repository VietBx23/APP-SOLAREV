import { Button, Dialog, makeStyles } from "@rneui/themed";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import DateTimePicker, {
  CalendarMode,
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";
import {
  MultiChange,
  RangeChange,
  SingleChange,
} from "react-native-ui-datepicker/lib/typescript/types";

type ActionType<T extends CalendarMode> = T extends "single"
  ? SingleChange
  : T extends "range"
    ? RangeChange
    : T extends "multiple"
      ? MultiChange
      : never;

type CustomType<T extends CalendarMode> = {
  mode: T;
  onConfirm: ActionType<T>;
};

type IPropModal = {
  isVisible: boolean;
};

export const ModalDateRanger: FC<IPropModal & CustomType<CalendarMode>> = (
  props,
) => {
  const styled = useTheme();
  const { t } = useTranslation();

  const defaultStyles = useDefaultStyles();

  const [selected, setSelected] = useState<any>();

  return (
    <Dialog
      isVisible={props.isVisible}
      onBackdropPress={() => {}}
      overlayStyle={[styled.container]}
    >
      <DateTimePicker
        mode={props.mode}
        // date={selected}
        // onChange={(value) => setSelected(value)}
        styles={defaultStyles}
      />
      <View style={[styled.groupButton]}>
        <Button
          containerStyle={{ width: "80%" }}
          title={t("Xác nhận")}
          onPress={() => props.onConfirm(selected)}
        />
      </View>
    </Dialog>
  );
};

const useTheme = makeStyles(({ colors }) => ({
  container: {
    backgroundColor: colors.background,
    width: "90%",
    borderRadius: 10,
    padding: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 17,
    textAlign: "center",
  },
  content: {},
  groupButton: {
    alignItems: "center",
  },
}));
