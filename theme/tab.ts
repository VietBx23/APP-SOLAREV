import { TabProps } from "@rneui/base";
import { ComponentTheme } from "./";

export const Tab: ComponentTheme<TabProps> = (props, { colors }) => {
  return {
    style: {
      borderRadius: 10,
      backgroundColor: colors.bgDefault,
    },
  };
};
