import { TextProps } from "@rneui/base";
import { ComponentTheme } from "./theme";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { height } = Dimensions.get("screen");

export const TextCustom: ComponentTheme<TextProps> = (_, __) => {
  return {
    style: {
      fontSize: RFValue(15, height),
      margin: 0,
      // lineHeight: 20,
    },
  };
};
