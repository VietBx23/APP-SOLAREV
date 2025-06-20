import { makeStyles, Text, useTheme } from "@rneui/themed";
import { Platform, SafeAreaView, TouchableOpacity, View } from "react-native";
import { TabBarIcon } from "../Icon";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useRouter } from "expo-router";

export const HeaderCamera = (props: NativeStackHeaderProps) => {
  const styled = useStyle();
  const {
    theme: { colors },
  } = useTheme();

  const route = useRouter();

  if (route.canGoBack()) {
    return (
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => {
            if (route.canGoBack()) {
              route.back();
            }
          }}
        >
          <View style={[styled.container]}>
            <TabBarIcon size={25} name="arrow-back" color={colors.background} />
            <Text style={styled.title}>
              {props.options.headerTitle as string}
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return null;
};

const useStyle = makeStyles(({ colors }) => ({
  container: {
    paddingTop: Platform.OS === "ios" ? 0 : 50,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 600,
  },
}));
