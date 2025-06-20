import { Dimensions, View, Image } from "react-native";
import Toast, { BaseToast, ToastConfig } from "react-native-toast-message";
import { Text, useTheme } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get("screen");

export enum IToast {
  INFO_CHARGE_SESSION = "INFO_CHARGE_SESSION",
  ALERT = "ALERT",
}

export const toastConfig: ToastConfig = {
  [IToast.INFO_CHARGE_SESSION]: ({ text1, onPress }) => {
    const { top } = useSafeAreaInsets();
    const {
      theme: { colors },
    } = useTheme();
    // const { t } = useTranslation();
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: "#505050E5",
          paddingTop: top,
          paddingHorizontal: 20,
          paddingVertical: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={[{ width: 50, height: 50 }]}
          resizeMode="contain"
          source={require("@/assets/images/enegy.png")}
        />
        <TouchableOpacity
          onPress={onPress}
          style={{
            gap: 4,
          }}
        >
          <Text style={{ color: colors.white, fontSize: 15, fontWeight: 600 }}>
            Xe của bạn đã được sạc: {text1}%
          </Text>
          <Text style={{ color: colors.white, fontSize: 13, fontWeight: 400 }}>
            Xem chi tiết
          </Text>
        </TouchableOpacity>
      </View>
    );
  },

  [IToast.ALERT]: (props) => {
    const { top } = useSafeAreaInsets();
    const {
      theme: { colors },
    } = useTheme();
    return (
      <View
        style={{
          width,
          height,
        }}
      >
        <View
          style={{
            backgroundColor: colors.background,
            width: "90%",
            borderRadius: 50,
            padding: 40,
            paddingBottom: 20,
            gap: 40,
          }}
        >
          <Text>{props.text1}</Text>
          <View>
            {/* <Button */}
            {/*   containerStyle={{ width: "80%" }} */}
            {/*   title={t("Xác nhận")} */}
            {/*   color={"error"} */}
            {/* /> */}
          </View>
        </View>
      </View>
    );
  },
};
