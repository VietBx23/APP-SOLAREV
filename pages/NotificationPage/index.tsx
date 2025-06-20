import { FocusAwareStatusBar } from "@/components";
import { Tab, TabView, useTheme } from "@rneui/themed";
import { useState } from "react";
import { Platform, View } from "react-native";
import { HistoryPayment } from "../HistoryPayment";
import { HistoryCharging } from "../HistoryCharging";
import { useTranslation } from "react-i18next";
import { RFValue } from "react-native-responsive-fontsize";
import { height } from "@/constants";

export const NotificationPage = () => {
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();
  const {
    theme: { colors },
  } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <FocusAwareStatusBar style="light" />
      <View
        style={{
          flex: 1,
          paddingBottom: Platform.OS === "ios" ? 50 : 0,
        }}
      >
        <Tab
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{
            backgroundColor: colors.primary,
            height: 2,
          }}
          style={{ backgroundColor: colors.background }}
        >
          <Tab.Item
            title={t("Lịch sử nạp tiền")}
            titleStyle={() => ({
              color: colors.primary,
              fontWeight: 600,
              fontSize: RFValue(15, height),
            })}
          />
          <Tab.Item
            title={t("Lịch sử sạc xe")}
            titleStyle={() => ({
              color: colors.primary,
              fontWeight: 600,
              fontSize: RFValue(15, height),
            })}
          />
        </Tab>
        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item
            style={{
              width: "100%",
            }}
          >
            <HistoryPayment />
          </TabView.Item>
          <TabView.Item
            style={{
              width: "100%",
            }}
          >
            <HistoryCharging />
          </TabView.Item>
        </TabView>
      </View>
    </View>
  );
};
