import { InputProps } from "@rneui/themed";
import { ComponentTheme } from "./theme";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { height } = Dimensions.get("screen");

export const Input: ComponentTheme<InputProps> = (props, theme) => {
  return {
    containerStyle: {
      paddingHorizontal: 0,
    },
    style: {
      fontSize: RFValue(15, height),
    },
    inputContainerStyle: {
      borderWidth: 1,
      borderRadius: 10,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 0,
      paddingBottom: 0,
      // height: 50,
    },
  };
};
