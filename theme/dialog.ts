import { ComponentTheme } from "./theme";
import { DialogProps } from "@rneui/base";

export const Dialog: ComponentTheme<DialogProps> = (props, theme) => {
  return {
    overlayStyle: {
      backgroundColor: theme.colors.background,
    },
  };
};
