import { useTheme } from "@rneui/themed";
import { FC, PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";
import {
  SafeAreaView,
  // useSafeAreaInsets,
} from "react-native-safe-area-context";

export const ScreenWrapper: FC<PropsWithChildren & ViewProps> = ({
  children,
  ...otherProps
}) => {
  // const insets = useSafeAreaInsets();
  const {
    theme: { colors },
  } = useTheme();
  return (
    <SafeAreaView
      style={[
        { flex: 1 /* backgroundColor: colors.background */ },
        otherProps.style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
  // return (
  //   <View
  //     style={[
  //       {
  //         paddingTop: insets.top,
  //         paddingBottom: insets.bottom,
  //         flex: 1,
  //       },
  //       otherProps.style,
  //     ]}
  //   >
  //     {children}
  //   </View>
  // );
};

export const ContainerScreen: FC<PropsWithChildren & ViewProps> = ({
  children,
  ...otherProps
}) => {
  return (
    <View
      style={[
        {
          flex: 1,
          padding: 20,
        },
        otherProps.style,
      ]}
    >
      {children}
    </View>
  );
};
