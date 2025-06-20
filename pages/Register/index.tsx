import {
  Card,
  DismissKeyboard,
  FocusAwareStatusBar,
  ModalConfirm,
  ScreenWrapper,
} from "@/components";
import { size } from "@/constants";
import { IDtoRegister, useRegister } from "@/hooks";
import { Button, Input, makeStyles, Text } from "@rneui/themed";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Image, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export const Register = () => {
  const style = useStyle();
  const route = useRouter();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IDtoRegister>();
  const [message, setMessage] = useState<string>();
  const [messageSuccess, setMessageSuccess] = useState<string>();
  const { mutateAsync } = useRegister();

  const handleRegister = async (value: IDtoRegister) => {
    try {
      const result = await mutateAsync(value);
      if (result?.statusCode === 200) {
        setMessageSuccess(result?.message);
      } else {
        setMessage(result?.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <ScreenWrapper style={[{ flex: 1 }, style.background]}>
      <FocusAwareStatusBar style="dark" />
      <DismissKeyboard>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
          }}
        >
          <View
            style={[
              {
                flex: 1,
                gap: 10,
                paddingBottom: 20,
              },
            ]}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                style={[{ width: 180, height: 180, maxWidth: "50%" }]}
                resizeMode="contain"
                source={require("@/assets/images/icon.png")}
              />
            </View>
            <View
              style={[
                {
                  paddingHorizontal: 20,
                  flex: 1,
                  justifyContent: "space-around",
                  gap: 20,
                },
              ]}
            >
              <Text h3 style={{ fontWeight: 600, textAlign: "center" }}>
                {t("Đăng kí tài khoản")}
              </Text>
              <View
                style={[
                  {
                    flex: 1,
                    justifyContent: "space-between",
                  },
                ]}
              >
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
                      <Card
                        style={{ paddingHorizontal: 0, paddingVertical: 0 }}
                      >
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
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="phone"
                  rules={{
                    required: true,
                    pattern: {
                      value: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/g,
                      message: t("Số điện thoại không hợp lệ"),
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                      <Card
                        style={{ paddingHorizontal: 0, paddingVertical: 0 }}
                      >
                        <Input
                          placeholder={t("Số điện thoại *")}
                          errorStyle={{ display: "none" }}
                          inputContainerStyle={{
                            height: 50,
                          }}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      </Card>

                      <Text
                        style={{
                          fontSize: size(10),
                          color: "red",
                          marginTop: 1,
                          marginBottom: 5,
                        }}
                      >
                        {errors.phone &&
                          (errors.phone.message
                            ? errors.phone.message
                            : t("Vui lòng nhập số điện thoại"))}
                      </Text>
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="username"
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                      <Card
                        style={{ paddingHorizontal: 0, paddingVertical: 0 }}
                      >
                        <Input
                          placeholder={t("Tên đăng nhập *")}
                          errorStyle={{ display: "none" }}
                          inputContainerStyle={{
                            height: 50,
                          }}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      </Card>
                      <Text
                        style={{
                          fontSize: size(10),
                          color: "red",
                          marginTop: 1,
                          marginBottom: 5,
                        }}
                      >
                        {errors.username && "Vui lòng nhập tên đăng nhập"}
                      </Text>
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="fullname"
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                      <Card
                        style={{ paddingHorizontal: 0, paddingVertical: 0 }}
                      >
                        <Input
                          placeholder={t("Tên người dùng *")}
                          inputContainerStyle={{
                            height: 50,
                          }}
                          errorStyle={{ display: "none" }}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      </Card>
                      <Text
                        style={{
                          fontSize: size(10),
                          color: "red",
                          marginTop: 1,
                          marginBottom: 5,
                        }}
                      >
                        {errors.fullname && "Vui lòng nhập tên người dùng"}
                      </Text>
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                      <Card
                        style={{ paddingHorizontal: 0, paddingVertical: 0 }}
                      >
                        <Input
                          placeholder={t("Mật khẩu *")}
                          errorStyle={{ display: "none" }}
                          inputContainerStyle={{
                            height: 50,
                          }}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      </Card>
                      <Text
                        style={{
                          fontSize: size(10),
                          color: "red",
                          marginTop: 1,
                          marginBottom: 5,
                        }}
                      >
                        {errors.password && "Vui lòng nhập mật khẩu"}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </View>
            <View style={{ alignItems: "center", gap: 20, marginTop: 10 }}>
              <Button
                title={t("Register")}
                buttonStyle={[style.button]}
                onPress={handleSubmit(handleRegister)}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Text>{t("Đã có tài khoản Focus?")}</Text>
                <TouchableOpacity onPress={() => route.back()}>
                  <Text style={style.red}>{t("Login")}?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </DismissKeyboard>

      <ModalConfirm
        title={message}
        isVisible={Boolean(message)}
        onBackdropPress={() => setMessage(undefined)}
      />

      <ModalConfirm
        title={messageSuccess}
        isVisible={Boolean(messageSuccess)}
        onBackdropPress={() => {
          setMessageSuccess(undefined);
          route.back();
        }}
      />
    </ScreenWrapper>
  );
};

const useStyle = makeStyles(({ colors }) => ({
  background: { backgroundColor: colors.background },
  bg: { flex: 1, width: null, height: null },
  red: { color: colors.error },
  button: { /* width: 314 */ fontSize: 17, paddingHorizontal: size(100) },
}));
