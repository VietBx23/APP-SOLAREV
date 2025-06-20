import { FC, PropsWithChildren } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

export const DismissKeyboard: FC<PropsWithChildren> = ({ children }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      accessible={false}
      style={{ flex: 1 }}
    >
      {children}
    </TouchableWithoutFeedback>
  );
};
