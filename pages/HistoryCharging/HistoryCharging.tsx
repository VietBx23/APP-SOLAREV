import { Card, ContainerScreen, NoData } from "@/components";
import { useHistoryCharging } from "@/hooks";
import { useAuthStore } from "@/stores";
import { IHistoryCharging } from "@/types";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Text, useTheme } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { useFocusEffect, useRouter } from "expo-router";
import { formatCurrency } from "@/utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCallback } from "react";
import { size } from "@/constants";

export const HistoryCharging = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { data, refetch, isFetching, isLoading } = useHistoryCharging(user?.id);
  const { bottom } = useSafeAreaInsets();
  const {
    theme: { colors },
  } = useTheme();

  useFocusEffect(
    useCallback(() => {
      refetch();
      return () => {};
    }, []),
  );

  return (
    <ContainerScreen style={{ backgroundColor: colors.background }}>
      {isLoading ? (
        <ActivityIndicator color={colors.primary} size="large" />
      ) : (
        <FlatList
          onRefresh={refetch}
          refreshing={isFetching}
          style={{
            margin: -15,
            padding: 15,
          }}
          contentContainerStyle={{
            paddingBottom: bottom,
          }}
          showsVerticalScrollIndicator={false}
          data={data?.data || []}
          renderItem={({ item }) => <Item {...item} />}
          keyExtractor={(item) => item.transactionId.toString()}
          ListEmptyComponent={
            <Card>
              <NoData title={t("Bạn không có lịch sử nào")} />
            </Card>
          }
        />
      )}
    </ContainerScreen>
  );
};

const Item = (props: IHistoryCharging) => {
  const { t } = useTranslation();
  const {
    theme: { colors },
  } = useTheme();

  const route = useRouter();

  return (
    <TouchableOpacity
      style={{
        paddingVertical: 14,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
        gap: 10,
        alignItems: "center",
      }}
      onPress={() => {
        if (props.stopReason) {
          route.navigate({
            pathname: "/(private)/(screens)/HistoryCharging/[id]",
            params: {
              id: props.transactionId,
            },
          });
        } else {
          route.navigate({
            pathname: "/(private)/(screens)/(detail)/charging",
            params: {
              ChargePointId: props.chargePointId + props.connectorId,
            },
          });
        }
      }}
    >
      <View style={{ alignItems: "center", gap: 4 }}>
        <Fontisto name="flash" size={26} color="black" />
        <View
          style={{
            backgroundColor: props.stopReason ? "#02F199" : "#E0EF0A",
            borderRadius: 10,
            paddingHorizontal: 4,
            paddingVertical: 1,
          }}
        >
          <Text style={{ fontSize: size(10), fontWeight: 400 }}>
            {props.stopReason ? t("Hoàn thành") : t("Đang sạc")}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: size(12),
              fontWeight: 300,
            }}
          >
            #{props.transactionId}
          </Text>
          <Text
            style={{
              fontSize: size(12),
              fontWeight: 300,
            }}
          >
            {props.startTime}
          </Text>
        </View>
        <Text
          style={{
            fontSize: size(15),
            fontWeight: 600,
          }}
          numberOfLines={1}
        >
          {props.chargeStationName}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: size(12),
              fontWeight: 600,
              opacity: 0.7,
            }}
          >
            {props.chargePointId}
          </Text>
          <Text
            style={{
              fontSize: size(12),
              fontWeight: 600,
              opacity: 0.7,
            }}
          >
            {formatCurrency(props.amount)}đ
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
