import { ContainerScreen, ModalConfirm } from "@/components";
import { size } from "@/constants";
import { useChangePassword } from "@/hooks";
import { useAuthStore } from "@/stores";
import { useTheme, Text, Input, Button } from "@rneui/themed";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

type IProsp = {
  newpassword: string;
  confirm: string;
  OldPassword: string;
  UserAppId: string;
  username: string;
};

export default () => {
  const {
    theme: { colors },
  } = useTheme();
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IProsp>({
    defaultValues: {
      UserAppId: user?.id,
      username: user?.userName,
    },
  });

  const [message, setMessage] = useState<string>();

  const { mutateAsync } = useChangePassword();

  const handleUpdate = async (value: IProsp) => {
    try {
      const result = await mutateAsync({
        newpassword: value.newpassword,
        OldPassword: value.OldPassword,
        UserAppId: value.UserAppId,
        username: value.username,
      });
      setMessage(result?.message);
      return;
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <ContainerScreen style={{ backgroundColor: colors.background, gap: 1 }}>
      <View style={{ gap: 3 }}>
        <Text style={{ fontSize: size(12), fontWeight: 400 }}>
          {t("Mật khẩu cũ")}
        </Text>
        <Controller
          control={control}
          name="OldPassword"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              errorMessage={errors.OldPassword && "Vui lòng nhập mật khẩu cũ"}
              placeholder={t("Mật khẩu cũ")}
              inputContainerStyle={[{ borderWidth: 0 }]}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry
              value={value}
            />
          )}
        />
      </View>
      <View style={{ gap: 3 }}>
        <Text style={{ fontSize: size(12), fontWeight: 400 }}>
          {t("Mật khẩu mới")}
        </Text>
        <Controller
          control={control}
          name="newpassword"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              errorMessage={errors.newpassword && "Vui lòng nhập mật khẩu mới"}
              placeholder={t("Mật khẩu mới")}
              inputContainerStyle={[{ borderWidth: 0 }]}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry={true}
              value={value}
            />
          )}
        />
      </View>
      <View style={{ gap: 3 }}>
        <Text style={{ fontSize: size(12), fontWeight: 400 }}>
          {t("Xác nhận mật khẩu mới")}
        </Text>
        <Controller
          control={control}
          name="confirm"
          rules={{
            required: true,
            validate: (val: string) => {
              if (watch("newpassword") !== val) {
                return "Mật khẩu không khớp";
              }
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              errorMessage={
                errors.confirm &&
                (errors.confirm.message
                  ? errors.confirm.message
                  : t("Vui lòng xác nhận mật khẩu mới"))
              }
              placeholder={t("Vui lòng xác nhận mật khẩu mới")}
              inputContainerStyle={[{ borderWidth: 0 }]}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry={true}
              value={value}
            />
          )}
        />
      </View>
      <Button
        containerStyle={{ marginTop: 30 }}
        title={t("Cập nhật mật khẩu")}
        onPress={handleSubmit(handleUpdate)}
      />
      <ModalConfirm
        isVisible={Boolean(message)}
        onBackdropPress={() => setMessage(undefined)}
        title={message}
      />
    </ContainerScreen>
  );
};
