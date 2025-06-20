import { Card, ModalConfirm as ConfirmStop, ModalLoading } from "@/components";
import { Button, Text, useTheme } from "@rneui/themed";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, ScrollView, View } from "react-native";
import AnimatedNumbers from "react-native-animated-numbers";
import Fontisto from "@expo/vector-icons/Fontisto";
import { ModalConfirm } from "./component/ModalSuccess";
import { ModalConfirm as ModalShowMessage } from "@/components";
import LoadingDots from "react-native-loading-dots";
import { AnimatedCircularProgress as AnimatedCircularProgressBase } from "react-native-circular-progress";

import { useGetMeterValue, useStopCharging } from "@/hooks";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { queryClient } from "@/providers/ProviderQueries";
import { size } from "@/constants";

const AnimatedCircularProgress: any = AnimatedCircularProgressBase;

export const ProgressCharging = () => {
  const {
    theme: { colors },
  } = useTheme();

  const [enable, setEnable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>();

  const route = useRouter();
  const { ChargePointId } = useLocalSearchParams<{ ChargePointId: string }>();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const { mutateAsync } = useStopCharging();

  const { data, isLoading } = useGetMeterValue(
    ChargePointId || undefined,
    enable,
  );

  useEffect(() => {
    if (data) {
      if (data.statusCode === 400) {
        setMessage(data.message);
      } else if (Number(data?.data?.current) === -1) {
        route.back();
      } else if (Number(data.data?.soC) === 100) {
        setOpen(true);
      }
    }
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      setEnable(true);

      return () => {
        queryClient.removeQueries({
          queryKey: ["GetMeterValue"],
        });
        setEnable(false);
      };
    }, []),
  );

  const handleStop = async () => {
    setOpenConfirm(false);
    if (ChargePointId) {
      try {
        setLoading(true);
        const result = await mutateAsync({ ChargePointId });

        if (result) {
          if (result.statusCode === 400) {
            setMessage(result.message);
            setLoading(false);
            return;
          }

          const idProgress = `${result}`
            .split('"transactionId":')[1]
            .split(",")[0];

          const statusCode = `${result}`
            .split('"statusCode":')[1]
            .split(",")[0];
          const messageProgress = `${result}`
            .split('"message":')[1]
            .split(",")[0];

          if (Number(parseInt(statusCode)) === 200) {
            setTimeout(() => {
              setLoading(false);
              route.replace({
                pathname: "/(private)/(screens)/HistoryCharging/[id]",
                params: {
                  id: parseInt(idProgress),
                },
              });
              return;
            }, 10000);
          } else {
            setMessage(messageProgress);
            setLoading(false);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: colors.background,
        flex: 1,
        padding: 20,
      }}
      contentContainerStyle={{
        paddingBottom: 50,
      }}
      showsVerticalScrollIndicator={false}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.primary} size="large" />
      ) : (
        <View
          style={{
            flex: 1,
            gap: 50,
          }}
        >
          <Card style={{ marginTop: 20, gap: 10 }}>
            <Text
              style={{
                fontSize: size(25),
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {ChargePointId}
            </Text>
            <Text
              style={{
                fontSize: size(16),
                fontWeight: 600,
                textAlign: "center",
                opacity: 0.7,
              }}
            >
              Mã trụ: {ChargePointId?.slice(0, -1)} / Vị trí súng:{" "}
              {ChargePointId}
            </Text>
          </Card>
          <View style={{ alignItems: "center" }}>
            <AnimatedCircularProgress
              size={size(225)}
              width={12}
              fill={
                Number(data?.data?.soC || 0) < 0
                  ? 100
                  : Number(data?.data?.soC || 0)
              }
              tintColor={"#BB4E5B"}
              tintColorSecondary="#34B6DF"
              backgroundWidth={8}
              rotation={360}
              lineCap="round"
              backgroundColor={colors.disabled}
            >
              {() => (
                <View style={{ alignItems: "center", marginTop: 20 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "baseline",
                    }}
                  >
                    <AnimatedNumbers
                      includeComma
                      animateToNumber={
                        Number(data?.data?.soC || 0) < 0
                          ? 100
                          : Number(data?.data?.soC || 0)
                      }
                      fontStyle={[
                        {
                          fontWeight: 600,
                          fontSize: size(60),
                        },
                      ]}
                    />
                    <Text style={{ fontSize: size(20), fontWeight: 600 }}>
                      .00
                    </Text>
                    <Text style={{ fontSize: size(20), fontWeight: 600 }}>
                      %
                    </Text>
                  </View>
                  {Number(data?.data?.soC) === 100 ? (
                    <View
                      style={{
                        gap: 5,
                        flexDirection: "row",
                        alignItems: "baseline",
                      }}
                    >
                      <Text style={{ fontSize: size(15), fontWeight: 500 }}>
                        Đã sạc đầy
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        gap: 5,
                        flexDirection: "row",
                        alignItems: "baseline",
                      }}
                    >
                      <Text style={{ fontSize: size(15), fontWeight: 500 }}>
                        Đang sạc
                      </Text>
                      <LoadingDots size={5} bounceHeight={5} />
                    </View>
                  )}
                  <Fontisto
                    name="flash"
                    size={26}
                    color="black"
                    style={{ marginTop: 10 }}
                  />
                </View>
              )}
            </AnimatedCircularProgress>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Info title={t("Điện áp")} value={data?.data?.voltage || ""} />
            <Info title={t("Nhiệt độ")} value={data?.data?.temperature || ""} />
            <Info title={t("Lượng điện")} value={data?.data?.energy || ""} />
            <Info title={t("Công suất")} value={data?.data?.power || ""} />
          </View>

          <Button
            title={data?.data?.soC === "100" ? "Xe đã sạc đầy" : "Dừng sạc xe"}
            color={"error"}
            onPress={() => setOpenConfirm(true)}
          />
        </View>
      )}

      <ModalConfirm
        isVisible={open}
        onBackdropPress={() => {
          route.replace("/(private)/(screens)/HistoryCharging");
          setOpen(false);
        }}
      />
      {loading && <ModalLoading isVisible />}

      <ConfirmStop
        title={t("Bạn có chắc chắn muốn dừng sạc")}
        isVisible={openConfirm}
        onBackdropPress={() => setOpenConfirm(false)}
        action={
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Button
              title={t("Hủy")}
              containerStyle={{ flex: 1 }}
              onPress={() => setOpenConfirm(false)}
            />
            <Button
              title={t("Đồng ý")}
              color={"error"}
              containerStyle={{ flex: 1 }}
              onPress={handleStop}
            />
          </View>
        }
      />

      <ModalShowMessage
        title={message}
        isVisible={Boolean(message)}
        onBackdropPress={() => {
          setMessage(undefined);
          route.dismissTo("/(private)/(tabs)");
        }}
      />
    </ScrollView>
  );
};

const Info = (props: { title: string; value: string }) => {
  return (
    <View style={{ flex: 1, gap: 8 }}>
      <Text style={{ fontWeight: 600, textAlign: "center" }}>
        {props.title}
      </Text>
      <Text style={{ textAlign: "center", opacity: 0.7 }}>{props.value}</Text>
    </View>
  );
};
