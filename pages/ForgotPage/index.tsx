import {
  Card,
  DismissKeyboard,
  FocusAwareStatusBar,
  ModalConfirm,
  ScreenWrapper,
} from "@/components";
import { size } from "@/constants";
import { useForgotPassword } from "@/hooks";
import { Button, Input, makeStyles, Text } from "@rneui/themed";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Image, TouchableOpacity, View } from "react-native";

export const ForgotPage = () => {
  const style = useStyle();
  const { t } = useTranslation();
  const route = useRouter();
  const { mutateAsync } = useForgotPassword();
  const [message, setMessage] = useState<string>();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<{ email: string }>();

  const sendEmail = async ({ email }: { email: string }) => {
    try {
      const result = await mutateAsync({ userEmail: email });
      if (result?.statusCode === 200) {
        route.back();
      } else {
        setMessage(result?.message);
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <ScreenWrapper
      style={[{ flex: 1, paddingHorizontal: 20 }, style.background]}
    >
      <FocusAwareStatusBar style="dark" />
      <DismissKeyboard>
        <View style={[{ flex: 1, gap: 20 }]}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Image
              style={[{ width: 200, height: 200, maxWidth: "50%" }]}
              resizeMode="contain"
              source={require("@/assets/images/icon.png")}
            />
          </View>
          <Text
            h3
            style={{
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {t("Forgot password")}
          </Text>
          <View style={style.form}>
            <Controller
              control={control}
              name="email"
              rules={{
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("Email không hợp lệ"),
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Card style={{ paddingHorizontal: 0, paddingVertical: 0 }}>
                    <Input
                      inputContainerStyle={{
                        height: 50,
                      }}
                      placeholder={t("Email")}
                      errorStyle={{ display: "none" }}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </Card>
                  {errors.email && (
                    <Text
                      style={{
                        fontSize: size(10),
                        color: "red",
                        marginTop: 1,
                        marginBottom: 5,
                      }}
                    >
                      {errors.email &&
                        (errors.email.message
                          ? errors.email.message
                          : t("Vui lòng nhập email"))}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>
          <View style={{ alignItems: "center", gap: 20 }}>
            <Button
              title={t("Cấp lại mật khẩu")}
              buttonStyle={[style.button]}
              onPress={handleSubmit(sendEmail)}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
              }}
            >
              <TouchableOpacity onPress={() => route.back()}>
                <Text style={style.red}>{t("Back")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </DismissKeyboard>
      <ModalConfirm
        title={message}
        isVisible={Boolean(message)}
        onBackdropPress={() => setMessage(undefined)}
      />
    </ScreenWrapper>
  );
};

const useStyle = makeStyles(({ colors }) => ({
  bg: { flex: 1, width: null, height: null },
  background: { backgroundColor: colors.background },
  red: {
    color: colors.error,
  },
  form: {
    alignSelf: "stretch",
    textAlign: "center",
    gap: 30,
  },
  button: { /* width: 314 */ fontSize: 17, paddingHorizontal: size(100) },
}));
