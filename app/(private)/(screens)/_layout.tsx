import { HeaderCamera, HeaderScreen } from "@/components";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";

export default () => {
  const { t } = useTranslation();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(detail)" />
      <Stack.Screen name="SearchLocation" />
      <Stack.Screen name="chargingStation" />
      <Stack.Screen
        name="QrCode"
        options={{
          headerTitle: t("Quét mã QR"),
          headerShown: true,
          headerTransparent: true,
          header: HeaderCamera,
        }}
      />
      <Stack.Screen
        name="Payment"
        options={{
          headerShown: true,
          headerTitle: "Nạp tiền thanh toán",
          headerTitleStyle: {
            color: "white",
          },
          headerBackground: () => (
            <Image
              source={require("@/assets/images/bgheader.png")}
              resizeMode="stretch"
            />
          ),
        }}
      />
      <Stack.Screen
        name="HistoryPayment"
        options={{
          headerTitle: t("Lịch sử giao dịch"),
          headerShown: true,
          header: HeaderScreen,
        }}
      />
      <Stack.Screen name="HistoryCharging" />

      <Stack.Screen
        name="SaveCharging"
        options={{
          headerTitle: t("Trạm sạc đã lưu"),
          headerShown: true,
          header: HeaderScreen,
        }}
      />

      <Stack.Screen
        name="ChangePassword"
        options={{
          headerTitle: t("Bảo mật tài khoản"),
          headerShown: true,
          header: HeaderScreen,
        }}
      />
      <Stack.Screen name="ChangeProfile" />
    </Stack>
  );
};
