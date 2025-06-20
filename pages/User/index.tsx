import { HeaderProfile, ModalConfirm } from "@/components";
import { Button, Divider, useTheme } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { View, Switch, SwitchProps } from "react-native";
import { ButtonCustom, Row, Title } from "./component";
import { IOPTIONS, IOPTIONS_SETTING } from "./type";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/stores";
import { useDeleteAccount, useStorageState } from "@/hooks";
import { TYPE_STORE } from "@/types";

export const UserPage = () => {
  const {
    theme: { colors },
  } = useTheme();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { setInfo, user } = useAuthStore();
  const [[], setSession] = useStorageState(TYPE_STORE.AUTHEN);

  const handleLogout = () => {
    setInfo(undefined);
    setSession(null);
  };

  const OPTIONS: Array<IOPTIONS> = useMemo(
    () => [
      {
        title: "Hồ sơ cá nhân",
        navigate: "/(private)/(screens)/ChangeProfile",
      },
      {
        title: "Bảo mật tài khoản",
        navigate: "/(private)/(screens)/ChangePassword",
      },
      // {
      //   title: "Tài khoản / Thẻ ngân hàng",
      //   navigate: "/(private)/(chargingStation)/chargingStation",
      // },
    ],
    [],
  );

  const OPTIONS2: Array<IOPTIONS> = useMemo(
    () => [
      {
        title: "Lịch sử giao dịch tiền",
        navigate: "/(private)/(screens)/HistoryPayment",
      },
      {
        title: "Lịch sử sạc xe",
        navigate: "/(private)/(screens)/HistoryCharging",
      },
      {
        title: "Trạm sạc đã lưu",
        navigate: "/(private)/(screens)/SaveCharging",
      },
    ],
    [],
  );

  const [value, setValue] = useState<{
    notification: boolean;
    locale: boolean;
    language: "en" | "vi";
  }>({ notification: true, locale: true, language: "en" });

  const OPTIONS3: Array<IOPTIONS_SETTING> = useMemo(
    () => [
      {
        title: "Thông báo",
        component: (
          <CustomSwitch
            value={value.notification}
            onValueChange={(e) => setValue({ ...value, notification: e })}
          />
        ),
      },
      {
        title: "Định vị",
        component: (
          <CustomSwitch
            value={value.locale}
            onValueChange={(e) => setValue({ ...value, locale: e })}
          />
        ),
      },
      {
        title: "Ngôn ngữ",
        component: "",
      },
    ],
    [value],
  );

  const { mutateAsync } = useDeleteAccount();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="light" />
      <HeaderProfile />
      {/* <ScrollView style={{ paddingTop: 20 }}> */}
      <View style={{ paddingTop: 20 }} />
      <Title title="Tài khoản" />
      {OPTIONS.map((item, index) => (
        <Row {...item} key={index} />
      ))}
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: colors.divider,
        }}
      >
        <ButtonCustom
          title={t("Đăng xuất")}
          onPress={() => {
            handleLogout();
          }}
        />
        <Divider orientation="vertical" />
        <ButtonCustom
          title={t("Xóa tài khoản")}
          onPress={() => {
            setOpen(true);
          }}
        />
      </View>
      <Title title={t("Tùy chọn")} />
      {OPTIONS2.map((item, index) => (
        <Row {...item} key={index} />
      ))}

      {/* <Title title="Cài đặt" /> */}
      {/* {OPTIONS3.map((item, index) => ( */}
      {/*   <RowSetting {...item} key={index} /> */}
      {/* ))} */}
      {/* </ScrollView> */}
      <ModalConfirm
        isVisible={open}
        title={t("Xóa tài khoản")}
        content={t("Bạn có chắc chắn muốn xóa tài khoản")}
        onBackdropPress={() => setOpen(false)}
        action={
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Button
              title={t("Hủy")}
              containerStyle={{ flex: 1 }}
              onPress={() => setOpen(false)}
            />
            <Button
              title={t("Đồng ý")}
              color={"error"}
              containerStyle={{ flex: 1 }}
              onPress={async () => {
                if (user)
                  try {
                    const result = await mutateAsync(user?.id);
                    if (result?.statusCode === 200) {
                      handleLogout();
                    }
                  } catch (error) {}
              }}
            />
          </View>
        }
      />
    </View>
  );
};

const CustomSwitch = (props: SwitchProps) => {
  const {
    theme: { colors },
  } = useTheme();
  return (
    <Switch
      trackColor={{ false: "#767577", true: "#638A94" }}
      thumbColor={props.value ? colors.primary : "#f4f3f4"}
      style={{ padding: 0 }}
      {...props}
    />
  );
};
