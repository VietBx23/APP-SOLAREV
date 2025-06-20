import { ButtonProps } from "@rneui/base";
import { ComponentTheme } from "./";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { height } = Dimensions.get("screen");

export const Button: ComponentTheme<ButtonProps> = (props, theme) => {
  switch (props.type) {
    case "outline": {
      return {
        // buttonStyle: {
        //   borderRadius: 10,
        //   borderWidth: 1,
        //   borderColor: theme.colors.primary,
        //   backgroundColor: "transparent",
        // },
        // titleStyle: {
        //   color: theme.colors.primary,
        // },
        // containerStyle: {
        //   borderRadius: 10,
        // },
      };
    }
    default:
      return {
        buttonStyle: {
          borderRadius: 30,
        },
        titleStyle: {
          fontSize: RFValue(15, height),
        },
      };
  }
};
