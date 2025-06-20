import {
  Card,
  ContainerScreen,
  DismissKeyboard,
  FocusAwareStatusBar,
  ModalConfirm,
} from "@/components";
import { height } from "@/constants";
import { useAddDeposit } from "@/hooks";
import { useAuthStore } from "@/stores";
import { formatCurrency } from "@/utils";
import { Button, Divider, Input, makeStyles, Text } from "@rneui/themed";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View, Image } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { RFValue } from "react-native-responsive-fontsize";

export const PaymentScreen = () => {
  const styled = useStyle();
  const { user } = useAuthStore();

  const { t } = useTranslation();

  const [value, setValue] = useState<number | null>(null);
  const [message, setMessage] = useState<string>();

  const { mutateAsync } = useAddDeposit();

  const OPTION = useMemo(() => [100000, 200000, 500000], []);

  const isCheck = useMemo(
    () => (user?.id && value && value >= 10000 ? true : false),
    [value, user?.id],
  );

  const route = useRouter();

  useFocusEffect(
    useCallback(() => {
      setValue(null);
      return () => {};
    }, []),
  );

  const handleAddDeposit = async () => {
    if (user?.id && value && value >= 10000) {
      try {
        const result = await mutateAsync({
          UserAppId: user?.id,
          Amount: value,
          PaymentGateway: 1,
          AppIpAddr: "192.168.1.1",
        });
        if (result.statusCode === 200) {
          if (result.data.payment_url) {
            route.navigate({
              pathname: "/(private)/(screens)/Payment",
              params: {
                url: result.data.payment_url,
              },
            });
          }
        } else {
          setMessage(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={[styled.container]}>
      <FocusAwareStatusBar style="light" />
      <ContainerScreen>
        <DismissKeyboard>
          <View style={{ gap: 17 }}>
            <Card style={{ gap: 13 }}>
              <Text style={{ fontSize: RFValue(12, height), opacity: 0.8 }}>
                {t("Số dư tài khoản")}
              </Text>
              <Text style={{ fontSize: RFValue(20, height), fontWeight: 600 }}>
                {formatCurrency(user?.balance)} đ
              </Text>
            </Card>

            <Card style={{ gap: 13 }}>
              <Text style={{ fontSize: RFValue(15, height), fontWeight: 500 }}>
                {t("Nhập số tiền (đ)")}
              </Text>
              <CurrencyInput
                value={value}
                onChangeValue={(e) => setValue(e)}
                delimiter=","
                separator="."
                precision={0}
                minValue={0}
                renderTextInput={(props) => (
                  <Input
                    errorStyle={[
                      styled.error,
                      // { display: (value || 0) <= 10000 ? "flex" : "none" },
                      { display: !isCheck ? "flex" : "none" },
                    ]}
                    inputContainerStyle={[
                      styled.input,
                      !isCheck && {
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 0,
                      },
                      // (value || 0) < 10000 && {
                      //   borderBottomRightRadius: 0,
                      //   borderBottomLeftRadius: 0,
                      // },
                    ]}
                    placeholder="0"
                    // keyboardType="numeric"
                    style={{ fontSize: RFValue(30, height) }}
                    errorMessage={t("Số tiền nạp tối thiểu là đ10.000")}
                    {...props}
                  />
                )}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                {OPTION.map((item, index) => (
                  <TouchableOpacity
                    style={[
                      styled.option,
                      value === item ? { borderColor: "red" } : undefined,
                    ]}
                    key={index}
                    onPress={() => setValue(item)}
                  >
                    <Text
                      style={{
                        fontSize: RFValue(15, height),
                        fontWeight: 600,
                        color: value === item ? "red" : undefined,
                      }}
                    >
                      {formatCurrency(item)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Divider />
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Image
                  style={[{ width: 30, height: 30 }]}
                  resizeMode="contain"
                  source={require("@/assets/images/vnpay.png")}
                />
                <Text
                  style={{ fontSize: RFValue(15, height), fontWeight: 500 }}
                >
                  {t("Cổng thanh toán {{name}}", { name: "Vnpay" })}
                </Text>
              </View>
            </Card>

            <Card style={{ gap: 12 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(13, height),
                    fontWeight: 500,
                    opacity: 0.7,
                    flex: 1,
                  }}
                >
                  {t("Nạp tiền")}
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(13, height),
                    fontWeight: 500,
                    opacity: 0.7,
                    flex: 1,
                    textAlign: "right",
                  }}
                  numberOfLines={1}
                >
                  {formatCurrency(value || 0)} đ
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(15, height),
                    fontWeight: 500,
                    flex: 1,
                  }}
                >
                  {t("Tổng thanh toán")}
                </Text>
                <Text
                  style={[
                    {
                      fontSize: RFValue(15, height),
                      fontWeight: 500,
                      flex: 1,
                      textAlign: "right",
                    },
                    styled.red,
                  ]}
                  numberOfLines={1}
                >
                  {formatCurrency(value || 0)} đ
                </Text>
              </View>
            </Card>
            <Button
              title={t("Nạp ngay")}
              style={{ marginTop: 50 }}
              onPress={handleAddDeposit}
              disabled={!isCheck}
            />
          </View>
        </DismissKeyboard>
      </ContainerScreen>
      <ModalConfirm
        title={message}
        isVisible={Boolean(message)}
        onBackdropPress={() => setMessage(undefined)}
      />
    </View>
  );
};

const useStyle = makeStyles(({ colors }) => ({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  red: {
    color: colors.error,
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: "#D9D9D933",
  },
  error: {
    margin: 0,
    backgroundColor: "#FF02051A",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  option: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.divider,
  },
}));
