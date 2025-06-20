import {
  Card,
  ContainerScreen,
  FocusAwareStatusBar,
  ModalConfirm,
} from "@/components";
import { useAuthStore } from "@/stores";
import { formatCurrency } from "@/utils";
import { Text, useTheme, Input, Button } from "@rneui/themed";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import { ImageBackground, View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useChangeProfile } from "@/hooks";
import { Controller, useForm } from "react-hook-form";
import { size } from "@/constants";

type IProps = {
  fullname: string;
  email: string;
  phone: string;
};

export default () => {
  const {
    theme: { colors },
  } = useTheme();
  const { top } = useSafeAreaInsets();
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const route = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IProps>({
    defaultValues: {
      fullname: user?.fullname,
      phone: user?.phone,
      email: user?.email,
    },
  });

  const [message, setMessage] = useState<string>();

  const { mutateAsync } = useChangeProfile();

  const handleUpdate = async (val: IProps) => {
    try {
      const result = await mutateAsync({
        id: user?.id!,
        fullname: val.fullname,
        phone: val.phone,
        email: val.email,
      });
      setMessage(result?.message);
      return;
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FocusAwareStatusBar style="light" />
      <ImageBackground
        source={require("@/assets/images/bgheader.png")}
        resizeMode="stretch"
        style={[
          {
            paddingTop: top + 10,
            flexDirection: "row",
            paddingHorizontal: 20,
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              borderRadius: 150,
              width: "90%",
              aspectRatio: 1,
              padding: 5,
              backgroundColor: colors.background,
              marginBottom: -55,
            }}
          >
            <Image
              source={require("@/assets/images/avatardefault.png")}
              style={[{ flex: 1, borderRadius: 150, width: "100%" }]}
            />
          </View>
        </View>
        <View style={{ flex: 1, alignItems: "flex-start", gap: 14 }}>
          <Text
            style={{ fontSize: size(20), color: colors.white, fontWeight: 500 }}
            numberOfLines={1}
          >
            {user?.fullname}
          </Text>
          <Card
            style={{
              marginBottom: -10,
              flex: 1,
              width: "100%",
              justifyContent: "space-between",
              paddingBottom: 10,
            }}
          >
            <Text
              style={{ fontSize: size(12), fontWeight: 400 }}
              numberOfLines={1}
            >
              {t("Số dư tài khoản")}
            </Text>
            <Text
              style={{ fontSize: size(20), fontWeight: 600 }}
              numberOfLines={1}
            >
              đ {formatCurrency(user?.balance || 0)}
            </Text>
          </Card>
        </View>
      </ImageBackground>
      <ContainerScreen style={{ marginTop: 60, gap: 1 }}>
        <View style={{ gap: 3 }}>
          <Text style={{ fontSize: size(12), fontWeight: 400, opacity: 0.7 }}>
            {t("Tên đầy đủ")}
          </Text>
          <Controller
            control={control}
            name="fullname"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                // errorStyle={{ display: "none" }}
                errorMessage={errors.fullname && "Vui lòng nhập đầy đủ họ tên"}
                placeholder={t("Tên đầy đủ")}
                inputContainerStyle={[{ borderWidth: 0 }]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        <View style={{ gap: 3 }}>
          <Text style={{ fontSize: size(12), fontWeight: 400, opacity: 0.7 }}>
            {t("Email")}
          </Text>
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
              <Input
                errorMessage={
                  errors.email &&
                  (errors.email.message
                    ? errors.email.message
                    : t("Vui lòng nhập email"))
                }
                placeholder={t("Email")}
                inputContainerStyle={[{ borderWidth: 0 }]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        <View style={{ gap: 3 }}>
          <Text style={{ fontSize: size(12), fontWeight: 400, opacity: 0.7 }}>
            {t("Số điện thoại")}
          </Text>
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
              <Input
                errorMessage={
                  errors.phone &&
                  (errors.phone.message
                    ? errors.phone.message
                    : t("Vui lòng nhập số điện thoại"))
                }
                placeholder={t("Số điện thoại")}
                inputContainerStyle={[{ borderWidth: 0 }]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        <Button
          containerStyle={{ marginTop: 30 }}
          onPress={handleSubmit(handleUpdate)}
          title={t("Cập nhật")}
        />
        <TouchableOpacity
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 30,
          }}
          onPress={() => route.back()}
        >
          <Ionicons name="return-down-back" size={24} color={colors.primary} />
          <Text style={{ fontSize: 12, fontWeight: 400 }}>{t("Trở lại")}</Text>
        </TouchableOpacity>
      </ContainerScreen>
      <ModalConfirm
        isVisible={Boolean(message)}
        onBackdropPress={() => setMessage(undefined)}
        title={message}
      />
    </View>
  );
};
