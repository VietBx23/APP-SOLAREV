import {
  Card,
  DismissKeyboard,
  FocusAwareStatusBar,
  ModalConfirm,
  ScreenWrapper,
  TabBarIcon,
} from "@/components";
import { size } from "@/constants";
import { IDtoLogin, useLogin, useStorageState } from "@/hooks";
import { useAuthStore } from "@/stores";
import { TYPE_STORE } from "@/types";
import { Button, CheckBox, Input, makeStyles, Text } from "@rneui/themed";
import { useRouter } from "expo-router";
import { Fragment, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Image, TouchableOpacity, View } from "react-native";

export const LoginPage = () => {
  const style = useStyle();
  const { t } = useTranslation();
  const [savePw, setSavePw] = useState<boolean>(false);
  const [[_, pw], setLocalPw] = useStorageState(TYPE_STORE.PASSWORD);

  const [showPass, setShow] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IDtoLogin>();

  const { setInfo } = useAuthStore();

  const [message, setMessage] = useState<string>();

  const { mutateAsync, isPending } = useLogin();

  const route = useRouter();

  const handleLogin = async (params: IDtoLogin) => {
    try {
      const res = await mutateAsync(params);
      if (res?.statusCode === 200) {
        route.replace("/(private)/(tabs)");
        setInfo(res?.data);
        if (savePw) {
          setLocalPw(
            JSON.stringify({
              username: params.username,
              password: params.password,
            }),
          );
        }
      } else {
        setMessage(res?.message);
        console.log(res?.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (pw) {
      const init = JSON.parse(pw);
      reset({ username: init.username, password: init.password });
      setSavePw(true);
    }
  }, [pw]);

  return (
    <ScreenWrapper
      style={[{ flex: 1, paddingHorizontal: 20 }, style.background]}
    >
      <FocusAwareStatusBar style="dark" />
      <DismissKeyboard>
        <View style={[{ flex: 1, gap: 20 }]}>
          <View style={{ gap: 20 }}>
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
            <Text h3 style={{ fontWeight: 600, textAlign: "center" }}>
              {t("Login")}
            </Text>
            <View>
              <Controller
                control={control}
                name="username"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Fragment>
                    <Card style={{ paddingHorizontal: 0, paddingVertical: 0 }}>
                      <Input
                        inputContainerStyle={{
                          height: 50,
                        }}
                        errorStyle={{ display: "none" }}
                        placeholder={t("Tên tài khoản")}
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
                      {errors.username && "Nhập tên tài khoản"}
                    </Text>
                  </Fragment>
                )}
              />
              <View>
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Fragment>
                      <Card
                        style={{ paddingHorizontal: 0, paddingVertical: 0 }}
                      >
                        <Input
                          inputContainerStyle={{
                            height: 50,
                          }}
                          errorStyle={{
                            display: "none",
                          }}
                          placeholder={t("Mật khẩu")}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          secureTextEntry={!showPass}
                          rightIcon={
                            <TouchableOpacity
                              onPress={() => setShow(!showPass)}
                            >
                              <TabBarIcon
                                name={showPass ? "eye-off" : "eye"}
                                size={20}
                                color={"grey"}
                              />
                            </TouchableOpacity>
                          }
                        />
                      </Card>
                      {errors.password && (
                        <Text
                          style={{
                            fontSize: size(10),
                            color: "red",
                            marginTop: 1,
                            marginBottom: 5,
                          }}
                        >
                          Nhập mật khẩu
                        </Text>
                      )}
                    </Fragment>
                  )}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CheckBox
                    containerStyle={{
                      backgroundColor: "transparent",
                      padding: 0,
                    }}
                    checked={savePw}
                    onPress={() => setSavePw(!savePw)}
                    title={<Text>{t("Save password")}</Text>}
                  />
                  <TouchableOpacity
                    onPress={() => route.navigate("/(publics)/(auths)/forgot")}
                  >
                    <Text style={style.red}>{t("Forgot password")}?</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center", gap: 20 }}>
            <Button
              title={t("Login")}
              buttonStyle={[style.button]}
              onPress={handleSubmit(handleLogin)}
              loading={isPending}
            />
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Text>{t("No account")}</Text>
              <TouchableOpacity
                onPress={() => route.navigate("/(publics)/(auths)/register")}
              >
                <Text style={[style.red]}>{t("Register")}?</Text>
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
  background: { backgroundColor: colors.background },
  bg: { flex: 1, width: null, height: null },
  button: { /* width: 314 */ fontSize: 17, paddingHorizontal: size(100) },
  red: {
    color: colors.error,
  },
}));
