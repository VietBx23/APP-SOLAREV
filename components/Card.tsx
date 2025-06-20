import { makeStyles } from "@rneui/themed";
import { FC, PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";

export const Card: FC<PropsWithChildren & ViewProps> = ({
  children,
  ...props
}) => {
  const styled = useStyle();
  return <View style={[styled.container, props.style]}>{children}</View>;
};

const useStyle = makeStyles(({ colors }) => ({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderRadius: 10,
    elevation: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
}));
