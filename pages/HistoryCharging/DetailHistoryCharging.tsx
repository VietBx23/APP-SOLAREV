import { ContainerScreen } from "@/components";
import { useLocalSearchParams } from "expo-router";
import { Divider, Text, useTheme } from "@rneui/themed";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useDetailHistoryCharging } from "@/hooks";
import { formatCurrency } from "@/utils";
import { size } from "@/constants";

export const DetailHistoryCharging = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const {
    theme: { colors },
  } = useTheme();

  const { data, isLoading } = useDetailHistoryCharging(id);

  return (
    <ContainerScreen style={{ backgroundColor: colors.background }}>
      {isLoading ? (
        <ActivityIndicator color={colors.primary} size="large" />
      ) : (
        <ScrollView
          contentContainerStyle={{
            gap: 20,
            paddingBottom: 50,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{ textAlign: "center", fontSize: size(25), fontWeight: 700 }}
          >
            {t("Hóa đơn")}
          </Text>
          <View
            style={{
              borderColor: colors.primary,
              borderWidth: 1,
              borderRadius: 20,
              padding: 20,
              gap: 15,
            }}
          >
            <Row title={t("Mã giao dịch:")} value={id} color={"#3C9574"} />
            <Row
              title={t("Loại giao dịch:")}
              value={data?.data?.[0].stopMethod!}
            />
          </View>
          <View style={{ gap: 15 }}>
            <Row
              title={t("Tên trạm:")}
              value={data?.data?.[0].chargeStationName}
            />
            <Row
              title={t("Địa chỉ trạm:")}
              value={data?.data?.[0].chargeStationAddress}
            />
            <Row
              title={t("Tên trụ:")}
              value={data?.data?.[0].chargePointName}
            />
            <Row title={t("Mã trụ:")} value={data?.data?.[0].chargePointId} />
            <Row
              title={t("Loại đơn sạc:")}
              value={data?.data?.[0].stopMethod!}
            />
            <Row
              title={t("Thời gian bắt đầu:")}
              value={data?.data?.[0].startTime}
            />
            <Row
              title={t("Thời gian kết thúc:")}
              value={data?.data?.[0].stopTime}
            />
          </View>
          <Divider />
          <View style={{ gap: 15 }}>
            <Row
              title={t("Tổng lượng điện tiêu thụ (kWh)")}
              value={`${data?.data?.[0].meterValue} kWh`}
            />
            <Row
              title={t("Đơn giá (VNĐ/kWh)")}
              value={`${formatCurrency(data?.data?.[0].exchangeRate)} đ/kWh`}
            />
            <Row
              title={t("Tổng (VNĐ)")}
              value={`${formatCurrency(data?.data?.[0].amount)} đ`}
              fontSize={25}
              color={"#3C9574"}
            />
          </View>
        </ScrollView>
      )}
    </ContainerScreen>
  );
};

const Row = (props: {
  title: string;
  value?: string | number;
  color?: string;
  fontSize?: number;
}) => {
  return (
    <View
      style={{ flexDirection: "row", justifyContent: "space-between", gap: 20 }}
    >
      <Text
        style={{
          fontSize: size(15),
          fontWeight: 500,
          opacity: 0.7,
          maxWidth: "60%",
        }}
        numberOfLines={1}
      >
        {props.title}
      </Text>
      <Text
        style={{
          textAlign: "right",
          flex: 1,
          fontSize: size(props.fontSize ?? 15),
          fontWeight: 600,
          color: props.color,
        }}
      >
        {props.value}
      </Text>
    </View>
  );
};
