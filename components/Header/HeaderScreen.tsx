import { makeStyles, Text, useTheme } from "@rneui/themed";
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { TabBarIcon } from "../Icon";
import { useRouter } from "expo-router";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { FocusAwareStatusBar } from "../FocusAwareStatusBar";
import { RFValue } from "react-native-responsive-fontsize";
import { height } from "@/constants";

export const HeaderScreen = (props: NativeStackHeaderProps) => {
  const styled = useStyle();
  const {
    theme: { colors },
  } = useTheme();
  const route = useRouter();

  return (
    <ImageBackground
      source={require("@/assets/images/bgheader.png")}
      resizeMode="stretch"
      style={[styled.main]}
    >
      <FocusAwareStatusBar style="light" />
      <SafeAreaView>
        <View style={[styled.container]}>
          {route.canGoBack() && (
            <TouchableOpacity onPress={() => route.back()}>
              <TabBarIcon
                size={25}
                name="arrow-back"
                color={colors.background}
              />
            </TouchableOpacity>
          )}
          <Text style={styled.title}>
            {props.options.headerTitle as string}
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const useStyle = makeStyles(({ colors }) => ({
  container: {
    paddingTop: Platform.OS === "ios" ? 0 : 50,
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  main: {
    paddingHorizontal: 20,
  },
  title: {
    color: colors.white,
    fontSize: RFValue(16, height),
    fontWeight: 600,
  },
}));
