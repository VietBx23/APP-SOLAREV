import { TabBarIcon } from "@/components";
import { height } from "@/constants";
import { useTheme } from "@rneui/themed";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const size = RFValue(25, height);

export default function TabLayout() {
  // const colorScheme = useColorScheme();
  const {
    theme: { colors },
  } = useTheme();

  const route = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <TabBarIcon size={size} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="payment"
        options={{
          title: "Thanh toán",
          tabBarIcon: ({ color }) => (
            <TabBarIcon size={size} name="wallet" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="scanQr"
        options={{
          title: "",
          tabBarIcon: () => (
            <View
              style={{
                backgroundColor: colors.primary,
                alignItems: "center",
                justifyContent: "center",
                height: 70,
                width: 70,
                borderRadius: 35,
                marginBottom: 20,
              }}
            >
              <TabBarIcon size={30} name="qr-code" color={"white"} />
            </View>
          ),
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            route.navigate("/(private)/(screens)/QrCode");
          },
        })}
      />

      <Tabs.Screen
        name="notification"
        options={{
          title: "Lịch sử",
          tabBarIcon: ({ color }) => (
            <TabBarIcon size={size} name="notifications" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="user"
        options={{
          title: "Cá nhân",
          tabBarIcon: ({ color }) => (
            <TabBarIcon size={size} name="people-sharp" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
